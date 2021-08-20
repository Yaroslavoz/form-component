import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { useForm } from 'react-hook-form';
import { PrimaryButton } from "./components/PrimaryButton";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import   Checkbox   from "@material-ui/core/Checkbox";





const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.number().required(),

});

// const normalizePhoneNumber = (value) => {
//   const phoneNumber = parsePhoneNumberFromString(value)
//   if(!phoneNumber){
//     return value
//   }
//   return phoneNumber.formatInternational()
// }

export const Step2 = () => {
  // const { value, onChange} = props;
  const [value, setValue] = useState()
  const history = useHistory()
  const {register, handleSubmit, formState: { errors }, watch, control } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  })
  const [hasPhone, setPhone] = useState(false) 
  // watch("hasPhone", false)


  const onSubmit = (data) => {
    history.push("/step3")
    console.log(data);
  }

  const handleChange = (e) => {
    setPhone(!hasPhone)
  }
  const handlePhone = (e) => {
    let str = e.target.value;
    let splitted = str.split('')
    setValue(Number(str))
    // setValue(str.length===10 ? `(${splitted[0]}${splitted[1]}${splitted[2]})-${splitted[3]}${splitted[4]}${splitted[5]}-${splitted[6]}${splitted[7]}-${splitted[8]}${splitted[9]}` : str)
  }
  return <MainContainer>
    <Typography component="h2" variant="h5">
    ✨ Step 2
    </Typography>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input 
        {...register("email")}
        id="email"
        type="email"
        label="email"
        name="email"
        error={!!errors.email}
        helperText={errors?.email?.message}
      />
      <FormControlLabel 
        control={
          <Checkbox name="hasPhone" {...register("hasPhone")} color="primary" onChange={handleChange}/>
        }
        label="Do you have a phone"
      />
      
      {
        hasPhone && (<Input {...register("phoneNumber")}
        id="phoneNumber"
        type="tel"
        label="Phone Number"
        name="phoneNumber"
        // value={value}
        error={!!errors.phoneNumber}
        helperText={errors?.phoneNumber?.message}
        // onChange={handlePhone}
        />) 
      }
      <PrimaryButton>Next</PrimaryButton>
    </Form>

  </MainContainer>
}
