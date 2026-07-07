"use client";

import { useRef, useState } from "react";
import Image from "next/image";
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

      const { error: uploadError } = await supabase.storage
        .from(PROPERTY_PHOTOS_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(uploadError.message);
        continue;
      }

      const { data } = supabase.storage
        .from(PROPERTY_PHOTOS_BUCKET)
        .getPublicUrl(path);

      uploaded.push({
        id: crypto.randomUUID(),
        url: data.publicUrl,
        storagePath: path,
      });
    }

    onPhotosChange([...photos, ...uploaded]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleRemove(photo: InquiryPhoto) {
    onPhotosChange(photos.filter((p) => p.id !== photo.id));
    await supabase.storage.from(PROPERTY_PHOTOS_BUCKET).remove([photo.storagePath]);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
          >
            <Image
              src={photo.url}
              alt="Property photo"
              fill
              sizes="120px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(photo)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
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
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 text-slate-400 transition hover:border-brand-400 hover:text-brand-500 disabled:opacity-50"
          >
            <CameraIcon className="h-5 w-5" />
            <span className="text-[10px] font-medium">
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
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <p className="mt-2 text-[11px] text-slate-400">
        Optional — up to {MAX_PHOTOS} photos, {MAX_FILE_MB}MB each. Listings
        with photos get more broker attention.
      </p>
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}
