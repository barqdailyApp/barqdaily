import React, { useState, ReactNode } from "react";

import axiosInstance from "@/utils/axios";

interface FileDownloadProps {
  children: (props: {
    handleDownload: () => void;
    progress: number;
    error: string | undefined;
  }) => ReactNode;
  onDownload: (response: any) => void;
  onError?: (error: string) => void;
  url: string;
  filename?: string;
  baseUrl?: string; // Base URL from env or user
  headers?: Record<string, string>; // Optional headers
}

export const FileDownload: React.FC<FileDownloadProps> = ({
  children,
  onDownload,
  onError,
  url = "",
  filename = "downloaded_file",
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "", // Default from environment
  headers = {},
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | undefined>(undefined);
  const [abortController] = useState(new AbortController()); // For aborting requests

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}${url}`, {
        responseType: "blob",
        headers,
        signal: abortController.signal,
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total!)
            );
          }
        },
      });

      const blob = response.data;
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      onDownload(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Download failed";
      setError(errorMessage);
      if (onError) onError(errorMessage);
    }
  };

  return <>{children({ handleDownload, progress, error })}</>;
};
