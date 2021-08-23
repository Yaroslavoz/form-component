import { ListItemIcon } from "@material-ui/core";
import { InsertDriveFile, CloudUpload } from "@material-ui/icons";
import { useData } from "./DataContext";
import { List } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    textAlign: "center",
    cursor: "pointer",
    color: "#333",
    padding: "10px",
    marginTop: "20px",
  },
  icon: {
    marginTop: "16px",
    color: "#888888",
    fontSize: "42px",
  },
}));

export const FileInput = ({ control, name }) => {
  const styles = useStyles();
  const { data, setValues } = useData();
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
   onDrop: acceptedFiles => { 
    // const droppedValues =  acceptedFiles.map(it => ({name: it.name, size: it.size}))
    setValues({files: acceptedFiles})}
  });
  

 
  return (
    <Controller 
      control={control}
      name={name}
      defaultValue={[]}
      render={( {onChange, onBlur, value }) => (
        <>
          <Paper 
            className={styles.root}
            variant='outlined'
            {...getRootProps()}
          >
            <CloudUpload className={styles.icon} />
            <input {...getInputProps()} name={name} onBlur={onBlur} />
            <p>Drag 'n' drop files here, or click to select files</p>
          </Paper>
          <List>
            {acceptedFiles.map((file) => 
              <li key={file.path}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                {`${file.name} - ${file.size} bytes`} 
              </li>)}
          </List>
        </>)}   
    />
  );
};