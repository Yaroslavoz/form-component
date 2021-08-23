import Typography from "@material-ui/core/Typography";
import React from "react";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { useForm } from 'react-hook-form';
import { PrimaryButton } from "./components/PrimaryButton";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useData } from "./DataContext";


const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.number().required(),

});

// const outerWatch = ({ control }) => {
//   const hasPhone = useWatch({
//     control,
//     name: 'hasPhone',
//     defaultValue: 'default' // default value before the render
//   })
// }

export const Step2 = () => {
  const history = useHistory()
  const { data, setValues } = useData()
  const {register,  watch, handleSubmit, formState: { errors }} = useForm({
    defaultValues: { email: data.email, hasPhone: data.hasPhone, phoneNumber: data.phoneNumber},
    mode: "onBlur",
    resolver: yupResolver(schema),
  })
//  const hasPhone = () => {
//   useWatch({
//     name: "hasPhone",
//     control
//   })
//  } ;
 const hasPhone = watch("hasPhone");


  const onSubmit = (data) => {
    setValues(data)
    console.log(data);
    history.push("/step3");
    
  }

  // const handleChange = (e) => {
  //   setPhone(!hasPhone);
  //   localStorage.setItem('hasPhone', !hasPhone)
  // }
  // const handlePhone = (e) => {
  //   let str = e.target.value;
  //   // str.length===10 ? str.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4') : str
    
  // }
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
          <input type="checkbox" 
            defaultValue={data.hasPhone} 
            defaultChecked={data.hasPhone} 
            name="hasPhone" 
            {...register("hasPhone")} 
            color="primary" 
            // onChange={handleChange}
            />
        }
        label="Do you have a phone"
      />
      
      {
        hasPhone && (<Input {...register("phoneNumber")}
        id="phoneNumber"
        type="tel"
        label="Phone Number"
        name="phoneNumber"
        error={!!errors.phoneNumber}
        helperText={errors?.phoneNumber?.message}
        // onChange={handlePhone}
        />) 
      }
      <PrimaryButton>Next</PrimaryButton>
    </Form>

  </MainContainer>
}
