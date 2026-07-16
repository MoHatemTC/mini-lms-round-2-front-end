import * as React from "react";
import { UploadCloud, File, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileUpload({ accept, maxSize = 10, onUpload, className }) {
  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (f) => {
    if (f.size > maxSize * 1024 * 1024) {
      alert(`File size exceeds ${maxSize}MB limit.`);
      return;
    }
    setFile(f);
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
    if (onUpload) onUpload(f);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!file ? (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-[24px] transition-colors",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border bg-muted/20 hover:bg-muted/40",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="h-16 w-16 bg-card rounded-full shadow-sm border border-border flex items-center justify-center mb-4">
            <UploadCloud className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-1">
            Click or drag file to this area to upload
          </h3>
          <p className="text-sm text-text-secondary text-center max-w-sm">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files.
          </p>
          <p className="text-xs text-text-secondary mt-4">
            Maximum file size: {maxSize}MB
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-[20px] p-4 bg-card flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-muted flex items-center justify-center border border-border">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <File className="h-8 w-8 text-text-secondary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{file.name}</p>
            <p className="text-xs text-text-secondary">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <div className="h-1 w-full bg-muted rounded-full mt-2 overflow-hidden">
              {/* Mocking immediate upload success */}
              <div className="h-full bg-success w-full rounded-full animate-pulse" />
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-full transition-colors shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
