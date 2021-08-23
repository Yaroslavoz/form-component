import React, { useState } from 'react';
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import { useData } from './DataContext';
import { MainContainer } from './components/MainContainer';
import { Link } from 'react-router-dom';
import { Table, TableCell, TableContainer, TableHead, Paper, TableBody, List, ListItemIcon, ListItem } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { InsertDriveFile } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { PrimaryButton } from "./components/PrimaryButton";


const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
  link: {
    marginTop: "30px"
  }
});

export const Result = () => {
  const [success, setSuccess] = useState(false);
  const styles = useStyles();
  const { data } = useData();
  const entries = Object.entries(data).filter((entry) => entry[0] !=='files');
  const { files } = data;
  

  const onSubmit = async () => {
    console.log('sending...')
    const formData = new FormData();
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      Swal.fire("Great job!", "You've passed the challenge!", "success");
      setSuccess(true);
    }
  };

  if (success) {
    return <Confetti />;
  }

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
      🗄️ Form Values
      </Typography>
      <TableContainer component={Paper} className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry[0]}>
                <TableCell>{entry[0]}</TableCell>
                <TableCell align="right">{entry[1].toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {files && (
        <> 
          <Typography component="h2" variant="h5">
          📦 Files
          </Typography>
          <List>
          {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InsertDriveFile />
                </ListItemIcon>
                {`${file.name} - ${file.size} bytes`} 
              </ListItem>
          ))}
            </List>
          </>
      )}
      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>        
      <Link to="/" className={styles.link}>Start over</Link>
    </MainContainer>
  )
}