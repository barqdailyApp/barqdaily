import { AxiosProgressEvent } from "axios";
import { useState, ReactNode } from "react";

import axiosInstance from "@/utils/axios";

interface FileUploadProps {
  children: (props: {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpload: () => void;
    progress: number;
    error: string | undefined;
  }) => ReactNode;
  onUpload: (response: any) => void;
  onError?: (error: string) => void;
  url?: string; // URL passed by the user
  baseUrl?: string; // Base URL from env or user
  headers?: Record<string, string>; // Optional headers
}

export const FileUpload: React.FC<FileUploadProps> = ({
  children,
  onUpload,
  onError,
  url,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "", // Default from environment
  headers = {},
}: Record<string, any>) => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post(
        url || `${baseUrl}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...headers,
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.lengthComputable) {
              setProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total!)
              );
            }
          },
        }
      );

      onUpload(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Upload failed";
      setError(errorMessage);
      if (onError) onError(errorMessage);
    }
  };

  return <>{children({ handleFileChange, handleUpload, progress, error })}</>;
};
