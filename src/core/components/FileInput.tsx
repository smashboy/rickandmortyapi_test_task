import { useState } from "react";
import { Paper, Grid, Typography, Fade, IconButton, Avatar } from "@mui/material";
import randomcolor from "randomcolor";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/system";

export type AllowedFileType = "image/jpeg" | "image/png" | "image/webp";

interface CustomFile {
  file: File;
  color: string;
}

type FileInputProps = {
  allowedFileTypes: AllowedFileType[];
  onChange?: (files: File[]) => void;
  initialFiles?: File[];
  multiple?: boolean;
  label?: string;
};

const UploadActionContainer = styled("label")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  cursor: "pointer",
});

const UploadInput = styled("input")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  cursor: "pointer",
  left: 0,
  opacity: 0,
});

export function FileInput(props: FileInputProps) {
  const { multiple = false, allowedFileTypes, label, onChange, initialFiles = [] } = props;

  const [selectedFiles, setSelectedFiles] = useState<CustomFile[]>(
    initialFiles.map((file) => ({ file, color: randomcolor() }))
  );

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) return;

    let filesArray = Array.from(files).map((file) => ({ file, color: randomcolor() }));

    const filesAreNotAllowed =
      filesArray
        .map(({ file }) => file.type)
        .filter((type) => !allowedFileTypes.includes(type as AllowedFileType)).length > 0;

    if (filesAreNotAllowed) return;

    setSelectedFiles(filesArray);
    handleExternalOnChange(filesArray);
  };

  const handleRemoveFile = (filename: string) => {
    const filteredFiles = selectedFiles.filter(({ file: { name } }) => name !== filename);
    setSelectedFiles(filteredFiles);
    handleExternalOnChange(filteredFiles);
  };

  const handleExternalOnChange = (files: CustomFile[]) => onChange?.(files.map(({ file }) => file));

  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12}>
        <Paper variant="outlined" sx={{ height: 200, position: "relative" }}>
          <Grid
            container
            spacing={1}
            sx={{ position: "absolute", top: "50%", width: "100%", transform: "translateY(-50%)" }}
          >
            <Grid container item xs={12} justifyContent="center">
              <Typography component="div" variant="overline">
                {label || "Drag and drop files or click to upload"}
              </Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <Typography component="div" variant="subtitle2" color="text.secondary">
                Allowed files:{" "}
                {allowedFileTypes.map((fileType) => fileType.split("/")[1]).join(", ")}
              </Typography>
            </Grid>
          </Grid>
          <UploadActionContainer htmlFor="upload" />
          <UploadInput
            type="file"
            id="upload"
            multiple={multiple}
            onChange={handleFiles}
            accept={allowedFileTypes.join(",")}
          />
        </Paper>
      </Grid>
      <Fade in={selectedFiles.length > 0} timeout={350}>
        <Grid item container xs={12} spacing={1}>
          {selectedFiles.map(({ file: { name }, color }) => (
            <Grid key={name} item xs="auto">
              <Paper sx={{ padding: 1, display: "flex", alignItems: "center" }}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: color }}>
                  <ImageIcon fontSize="small" />
                </Avatar>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ marginLeft: 1 }}
                >
                  {name}
                </Typography>
                <IconButton
                  onClick={() => handleRemoveFile(name)}
                  size="small"
                  sx={{ marginLeft: 1 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Grid>
  );
}
