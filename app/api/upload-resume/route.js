import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    console.log("Received upload request");
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      console.log("No file found in request");
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    console.log("File received:", file.name);
    // Read the file content
    const fileContent = await file.text();
    console.log("File content length:", fileContent.length);

    // For testing, return a mock response
    const response = {
      atsScore: 85,
      explanation: "This is a well-formatted resume with clear sections and relevant keywords. Consider adding more quantifiable achievements and technical skills."
    };
    
    console.log("Sending response:", response);
    return NextResponse.json(response);

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process file" },
      { status: 500 }
    );
  }
}
