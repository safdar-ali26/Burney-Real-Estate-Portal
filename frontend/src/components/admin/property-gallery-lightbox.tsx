"use client";

import { useState } from "react";

interface GalleryImage {
  id: string;
  url: string;
  alt?: string | null;
}

export default function PropertyGalleryLightbox({
  images,
}: {
  images: GalleryImage[];
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveImage(image.url)}
            className="group overflow-hidden rounded-2xl border border-border bg-muted"
          >
            <img
              src={image.url}
              alt={image.alt || ""}
              className="h-40 w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6"
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-bold text-black"
          >
            Close
          </button>

          <img
            src={activeImage}
            alt=""
            className="max-h-[90vh] max-w-[95vw] rounded-2xl object-contain"
          />
        </div>
      ) : null}
    </>
  );
}