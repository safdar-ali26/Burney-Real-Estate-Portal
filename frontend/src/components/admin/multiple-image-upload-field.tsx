"use client";

import Image from "next/image";
import { useState } from "react";
import { uploadImageAction } from "@/actions/upload-image";

interface MultipleImageUploadFieldProps {
  label: string;
  name: string;
  defaultValue?: string[];
}

export default function MultipleImageUploadField({
  label,
  name,
  defaultValue = [],
}: MultipleImageUploadFieldProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(defaultValue);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    setIsUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImageAction(formData);
      uploadedUrls.push(result.url);
    }

    setImageUrls((current) => [...current, ...uploadedUrls]);
    setIsUploading(false);
  }

  function removeImage(url: string) {
    setImageUrls((current) => current.filter((imageUrl) => imageUrl !== url));
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none file:mr-4 file:rounded-xl file:border-0 file:bg-[#EBCB4C] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
      />

      <input type="hidden" name={name} value={imageUrls.join("\n")} />

      {isUploading ? (
        <p className="mt-2 text-sm text-muted-foreground">
          Uploading gallery images...
        </p>
      ) : null}

      {imageUrls.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {imageUrls.map((url) => (
            <div
              key={url}
              className="overflow-hidden rounded-2xl border border-border bg-muted"
            >
              <div className="relative h-36">
                <Image src={url} alt="Gallery image" fill className="object-cover" />
              </div>

              <button
                type="button"
                onClick={() => removeImage(url)}
                className="w-full border-t border-border px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}