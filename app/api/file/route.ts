import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Helper function to save the uploaded file
async function saveFile(req: NextRequest): Promise<{
  fileName: string;
  filePath: string;
  fileBuffer: Buffer;
  fileExtension: string;
}> {
  const formData = await req.formData(); // Using formData() to get the file details
  const file = formData.get("file") as File; // Get the uploaded file
  if (!file) {
    throw new Error("No file uploaded");
  }

  const uploadDir = path.join(process.cwd(), "/public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Read file buffer
  const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert the ArrayBuffer to a Buffer
  const fileName = file.name; // Get the original file name
  const fileExtension = path.extname(fileName); // Extract the file extension

  // Generate a unique file name
  const uniqueFileName = `upload-${Date.now()}${fileExtension}`;
  const filePath = path.join(uploadDir, uniqueFileName);

  // Write the file to the disk
  fs.writeFileSync(filePath, fileBuffer);

  return { fileName: uniqueFileName, filePath, fileBuffer, fileExtension };
}

// API route handler
export async function POST(req: NextRequest) {
  try {
    const { fileName, filePath, fileBuffer, fileExtension } = await saveFile(
      req
    );

    // File metadata
    const fileSize = (fileBuffer.length / (1024 * 1024)).toFixed(2) + " MB"; // Size in MB

    // Save file metadata and binary content to the database
    const savedFile = await prisma.file.create({
      data: {
        name: fileName.replace(fileExtension, ""), // Store name without extension
        extension: fileExtension,
        size: fileSize,
        path: filePath,
        file: fileBuffer, // Store binary content
      },
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      filePath,
    });
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    // Fetch the list of files from the database
    const files = await prisma.file.findMany({
      select: {
        id: true,
        name: true,
        extension: true,
        size: true,
        path: true,
        uploadedAt: true,
      },
    });

    return NextResponse.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { message: "Error fetching files" },
      { status: 500 }
    );
  }
}
