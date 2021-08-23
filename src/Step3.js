import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useData } from "./DataContext";
import { MainContainer } from "./components/MainContainer";
import { FileInput } from "./Fileinput";
import { Form } from "./components/Form";
import { Typography } from "@material-ui/core";
import { PrimaryButton } from "./components/PrimaryButton";

export const Step3 = () => {
  const history = useHistory();
  // const { data, setValues } = useData();
  const { control, handleSubmit } = useForm()
  
  const onSubmit = (data) => {
    history.push("./result");
  };

  

  return (<MainContainer>
    <Typography component="h2" variant="h5">
    ✨ Step 3
    </Typography>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FileInput name="files" control={control} />
      <PrimaryButton>Next</PrimaryButton>
    </Form>
  </MainContainer>)
}