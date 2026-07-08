"use client";

import { useRef, useState } from "react";
import { PROPERTY_PHOTOS_BUCKET, supabase } from "@/lib/supabase";
import type { InquiryPhoto } from "@/lib/types";
import { CameraIcon, TrashIcon } from "./icons";

const MAX_PHOTOS = 8;
const MAX_FILE_MB = 8;

export default function PhotoUploader({
  draftId,
  photos,
  onPhotosChange,
}: {
  draftId: string;
  photos: InquiryPhoto[];
  onPhotosChange: (photos: InquiryPhoto[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(null);

    const files = Array.from(fileList);
    const remainingSlots = MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) {
      setError(`You can add up to ${MAX_PHOTOS} photos.`);
      return;
    }

    const toUpload = files.slice(0, remainingSlots);
    setUploading(true);

    const uploaded: InquiryPhoto[] = [];
    for (const file of toUpload) {
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setError(`"${file.name}" is larger than ${MAX_FILE_MB}MB and was skipped.`);
        continue;
      }
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${draftId}/${crypto.randomUUID()}.${ext}`;

      // Uploads go into a PRIVATE bucket. The public site can write but never
      // read others' photos — only the authenticated admin can (via signed URLs).
      const { error: uploadError } = await supabase.storage
        .from(PROPERTY_PHOTOS_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(uploadError.message);
        continue;
      }

      uploaded.push({
        id: crypto.randomUUID(),
        // Local-only preview; never persisted or exposed publicly.
        url: URL.createObjectURL(file),
        storagePath: path,
      });
    }

    onPhotosChange([...photos, ...uploaded]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleRemove(photo: InquiryPhoto) {
    onPhotosChange(photos.filter((p) => p.id !== photo.id));
    if (photo.url.startsWith("blob:")) URL.revokeObjectURL(photo.url);
    await supabase.storage.from(PROPERTY_PHOTOS_BUCKET).remove([photo.storagePath]);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-soft"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt="Property photo"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
            <button
              type="button"
              onClick={() => handleRemove(photo)}
              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-red-500"
              aria-label="Remove photo"
            >
              <TrashIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50"
          >
            <CameraIcon className="h-6 w-6" />
            <span className="text-[10px] font-semibold">
              {uploading ? "Uploading…" : "Add photo"}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <p className="mt-3 text-xs text-slate-400">
        Optional — up to {MAX_PHOTOS} photos, {MAX_FILE_MB}MB each. Your photos
        are stored privately and shown only to our verified brokers.
      </p>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
