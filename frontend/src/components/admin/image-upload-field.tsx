"use client";

import Image from "next/image";
import { useState } from "react";
import { uploadImageAction } from "@/actions/upload-image";

interface ImageUploadFieldProps {
  label: string;
  name: string;
  defaultValue?: string;
}

export default function ImageUploadField({
  label,
  name,
  defaultValue = "",
}: ImageUploadFieldProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Image size must be less than 5MB.");
    event.target.value = "";
    return;
  }

  try {
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadImageAction(formData);

    if (!result?.url) {
      throw new Error("Upload failed");
    }

    setImageUrl(result.url);
  } catch (error) {
    console.error("Image upload error:", error);
    alert("Image upload failed. Please try again with a smaller image.");
  } finally {
    setIsUploading(false);
  }
}

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none file:mr-4 file:rounded-xl file:border-0 file:bg-[#EBCB4C] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
      />

      <input type="hidden" name={name} value={imageUrl} />

      {isUploading ? (
        <p className="mt-2 text-sm text-muted-foreground">Uploading...</p>
      ) : null}

      {imageUrl ? (
        <div className="relative mt-4 h-52 overflow-hidden rounded-2xl border border-border bg-muted">
          <Image src={imageUrl} alt={label} fill className="object-cover" />
        </div>
      ) : null}
    </div>
  );
}