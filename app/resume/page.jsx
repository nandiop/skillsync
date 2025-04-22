"use client";
import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile?.name);
    setFile(selectedFile);
    setResult(null); // Clear previous results
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null); // Clear previous results

    try {
      const formData = new FormData();
      formData.append("file", file);
    
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setResult(data);
      
      // Reset the file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      setFile(null);
      
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.message || "Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-35">
      <Card>
        <CardHeader>
          <CardTitle>Resume Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Input 
                id="resume"
                type="file" 
                accept="application/pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {file && (
                <p className="text-sm text-gray-600">
                  Selected: {file.name}
                </p>
              )}
            </div>
            
            <Button 
              onClick={handleUpload} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Analyzing Resume..." : "Upload & Analyze"}
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-green-600">ATS Score</h3>
                <span className="text-2xl font-bold text-green-600">{result.atsScore}/100</span>
              </div>
              <div className="pt-2 border-t border-green-200">
                <h4 className="font-medium mb-1">Feedback:</h4>
                <p className="text-gray-700">{result.explanation}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
