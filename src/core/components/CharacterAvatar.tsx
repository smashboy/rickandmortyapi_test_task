import { useCallback, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import type { AvatarProps } from "@mui/material";
import { cache } from "utils/client";

interface CharacterAvatarProps extends Omit<AvatarProps, "src" | "alt" | "id"> {
  url: string;
  name: string;
  id: number;
  isProfile?: boolean;
}

interface ImageState {
  data: string;
  isObjectURL: boolean;
}

export function CharacterAvatar(props: CharacterAvatarProps) {
  const { url, name, id, isProfile = false, ...otherProps } = props;

  const [image, setImage] = useState<ImageState>({ data: url, isObjectURL: false });

  const handleLoadCachedImage = useCallback(async () => {
    const blob = await cache.fetch(
      "character-avatars",
      // hack
      isProfile ? id.toString() : `/character/${id}`
    );

    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      setImage({ data: objectUrl, isObjectURL: true });
    }
  }, []);

  useEffect(() => {
    handleLoadCachedImage();
  }, []);

  useEffect(() => {
    handleLoadCachedImage();
  }, [url]);

  return <Avatar src={image.data} alt={name} {...otherProps} />;
}
