import { useCallback, useState } from "react";
import AddCharacterPhotoIcon from "@mui/icons-material/AddPhotoAlternate";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { ArrowTooltip } from "core/components/ArrowTooltip";
import { Button } from "core/components/Button";
import { AllowedFileType, FileInput } from "core/components/FileInput";
import { useIsSmallDevice } from "core/hooks/useIsSmallDevice";
import { LoadingButton } from "core/components/LoadingButton";
import { cache } from "utils/client";
import { useCharacterProfile } from "./Context";

export const allowedImageTypes: Array<AllowedFileType> = ["image/jpeg", "image/png", "image/webp"];

export function AvatarUploader() {
  const { character, changeAvatar } = useCharacterProfile();

  const isSM = useIsSmallDevice();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleOpenUploader = useCallback(() => setOpen(true), []);
  const handleCloseUploader = useCallback(() => setOpen(false), []);

  const handleImage = useCallback((files: File[]) => {
    const image = files[0] ?? null;
    setImage(image);
  }, []);

  const handleSaveImage = useCallback(async () => {
    setIsSaving(true);
    await cache.save("character-avatars", character.id.toString(), image!);
    changeAvatar(image!);
    handleCloseUploader();
    setIsSaving(false);
  }, [image]);

  return (
    <>
      <ArrowTooltip title="Change profile photo">
        <IconButton onClick={handleOpenUploader}>
          <AddCharacterPhotoIcon />
        </IconButton>
      </ArrowTooltip>
      <Dialog open={open} onClose={handleCloseUploader} maxWidth="md" fullScreen={isSM} fullWidth>
        <DialogTitle>Upload new avatar</DialogTitle>
        <DialogContent>
          <FileInput
            label="Drag and drop image or click to upload"
            allowedFileTypes={allowedImageTypes}
            onChange={handleImage}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleCloseUploader}>
            Cancel
          </Button>
          <LoadingButton
            color="primary"
            onClick={handleSaveImage}
            disabled={!Boolean(image)}
            loading={isSaving}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
