import { useEffect, useState } from "react";
import axios from "axios";

interface File {
  id: number;
  name: string;
  extension: string;
  size: string;
  path: string;
  uploadedAt: string;
}

export default function FileList() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the list of uploaded files
    const fetchFiles = async () => {
      try {
        const response = await axios.get<File[]>("/api/file");
        setFiles(response.data);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Error fetching files");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return <p>Loading files...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Uploaded Files</h1>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <a
                href={`/uploads/${file.name}${file.extension}`}
                download={`${file.name}${file.extension}`} // This makes it a download link
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.name}
                {file.extension}
              </a>
              ({file.size}) - Uploaded on:
              {new Date(file.uploadedAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
