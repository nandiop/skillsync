'use client';

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { useState } from 'react';

const AICoverLetterPage = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    keyPoints: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Generate cover letter using AI
  };

  return (
    <div className="flex justify-center">
      <Card className="border-gray-800 w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-2">
            AI Cover Letter <span className="orange-text">Generator</span>
          </CardTitle>
          <p className="text-gray-400 text-center">
            Create a personalized cover letter tailored to your target role
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Company Name</label>
              <Input
                placeholder="e.g. Google"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="bg-black/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Position</label>
              <Input
                placeholder="e.g. Senior Frontend Developer"
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="bg-black/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Key Points to Highlight</label>
              <Textarea
                placeholder="List your relevant skills, experiences, or achievements you'd like to highlight"
                value={formData.keyPoints}
                onChange={(e) => setFormData({...formData, keyPoints: e.target.value})}
                className="bg-black/20 min-h-[150px]"
              />
            </div>

            <Button type="submit" className="w-full gradient-orange">
              Generate Cover Letter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICoverLetterPage;
