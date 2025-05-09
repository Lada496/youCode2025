"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/client";
import Image from "next/image";
import { Button, Center } from "@chakra-ui/react";
import { downloadImage } from "@/app/utils/download-image";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) {
      const fetchImage = async () => {
        const data = await downloadImage(url);
        setAvatarUrl(data);
      };
      fetchImage();
    }
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Center>
      <div>
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt="Avatar"
            className="avatar image"
            style={{ height: size, width: size }}
          />
        ) : (
          <div
            className="avatar no-image"
            style={{ height: size, width: size }}
          />
        )}
        <Button size="xs" variant={"outline"}>
          <div style={{ width: size }}>
            <label className="button primary block" htmlFor="single">
              {uploading ? "Uploading ..." : "Upload Image"}
            </label>
            <input
              style={{
                visibility: "hidden",
                position: "absolute",
              }}
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </div>
        </Button>
      </div>
    </Center>
  );
}
