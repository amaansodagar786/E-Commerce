// ShippingForm.js

import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button,  Snackbar, Alert} from '@mui/material';
import './Login.scss';
import MyContext from '../../Uttis/MyContext';
import IconButton from "@mui/material/IconButton";
import { AccountCircle, Email, Phone } from "@mui/icons-material";
import KeyIcon from '@mui/icons-material/Key';

import InputAdornment from "@mui/material/InputAdornment";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";















const Login = () => {

  


  const{message,setMessage,setUserData,closeModal4,BothHide,LoginHide,ForgotHide,RegisterHide,setCartItems,setshippingInfo,loader,setLoader,handleLogin,setWishItems} = useContext(MyContext)

  

const [modalOpen,setModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }; 

  const handleClose = () =>{
    setModalOpen(false)
  }
 


    

   
  


  const formik = useFormik({
    initialValues: {
      email: '',
      password:''

    },
    validationSchema: Yup.object({
      email: Yup
      .string('Enter your email')
      .matches(/^\S*$/, 'email cannot contain whitespace')
      .email('Enter a valid email')
      .required('Email is required'),
   
  password: Yup
      .string('Enter the password')
      .matches(/^\S*$/, 'email cannot contain whitespace')
      .min(8,'password atleast 8 charcter')
      .required('password is required'),
      
    
    
    }),
    onSubmit: async  (values,{resetForm}) => {
      setLoader(true)

      try {
        
     
 const response = await fetch('https://updated-backend-brown.vercel.app/login',{

 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
 },
 body: JSON.stringify(values),
})

const data = await response.json()

if(data.success){
  
  resetForm()
  
  
  handleLogin(data.data);
  setCartItems(data.cartdata)
  setWishItems(data.wishdata)
  setshippingInfo(data.shipping)
  setUserData(data.accountInfo)

  
  




}
else{
  setModalOpen(true)
  setMessage(data.error)
}

} catch (error) {
  alert(error.message)
}finally{

setLoader(false)
}


    
      
      
     
   
      
      
     
    

      },
  });

 



  const formikRegister = useFormik({
    initialValues: {
      name:'',
      email: '',
      mobile:'',
      password:''

    },
    validationSchema: Yup.object({
    name: Yup
    .string("Enter your Name")
    .required("Name is required")
    .matches(/^([^0-9]*)$/, "Don't allow Numeric Value"),
    email: Yup
    .string('Enter your email')
    .matches(/^\S*$/, 'email cannot contain whitespace')
    .email('Enter a valid email')
    .required('Email is required'),
   
    mobile: Yup
    .string("Enter your Mobile.No")
    .required('Mobile number is required')
    .matches(/^\S*$/, 'mobile cannot contain whitespace')
    .matches(/^[0-9]{10}$/, "Mobile number is not valid"),
    password: Yup
    .string('Enter the password')
      .min(8,'password atleast 8 charcter')
      .matches(/^\S*$/, 'email cannot contain whitespace')
      .min(8, "Password must be at least 8 characters")
      .max(12, "Password must be at most 12 characters")
      .required('password is required'),
      
    
    
    }),

   

    
 onSubmit: async(values, {resetForm}) => {

setLoader(true)
try {
  

 const response =  await fetch("https://updated-backend-brown.vercel.app/register",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      // console.log(response)

      const data = await response.json()


 if(data.success){

 

  setModalOpen(true)
  setMessage(data.message)
 
 resetForm()
 RegisterHide()


 }else{
  setModalOpen(true)
  setMessage(data.error)
  
 }

} catch (error) {
  alert(error.message)
}finally{

 setLoader(false)
}
 

    }, 
  
  
  })


  const formikForgot = useFormik({
    initialValues: {
      name:'',
      email: ''
      

    },
    validationSchema: Yup.object({
    name: Yup
    .string("Enter your Name")
    .required("Name is required")
    .matches(/^([^0-9]*)$/, "Don't allow Numeric Value"),
    email: Yup
    .string('Enter your email')
    .matches(/^\S*$/, 'email cannot contain whitespace')
    .email('Enter a valid email')
    .required('Email is required'),
   
    
    }),

   

    
 onSubmit: async(values, {resetForm}) => {

setLoader(true)
try {
  

 const response =  await fetch("https://updated-backend-brown.vercel.app/forgotpass",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      console.log(response)

      const data = await response.json()


 if(data.success){

 

  setModalOpen(true)
  setMessage(data.message)
 
 resetForm()


 }else{
  setModalOpen(true)
  setMessage(data.error)
  
 }

} catch (error) {
  alert(error.message)
}finally{

 setLoader(false)
}
 

    }, 
  
  
  })

  return (

    <>

    <div className="login-main">
    <div className="opac-layer"> </div>
      <div className="login-content" id='login'>

        <div className="model-upper">

      <div className="model-heading">Sign In</div>
      { !loader && <div className="model-close" onClick={closeModal4}>&#x2715;</div>}
      </div>


     

      <form onSubmit={formik.handleSubmit} className='form-modal'>

     

      <TextField
      //  focused 
      
      name="email"
      label="Email"
      placeholder="Email-Id"
      id="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
      variant="outlined"/>
      
      <TextField  label="Password" placeholder="Password"
    
      name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password} 
      id="outlined-adornment-password"
      type={showPassword ? 'text' : 'password'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            <KeyIcon/>
            </InputAdornment>
            ),
        endAdornment:(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }} />

     

   

      <Button type="submit" variant="contained" color="primary" className='btn'>
      {loader?'wait...':'login'} &nbsp; {loader && <span className='login-loader'></span>}
      </Button>

     {!loader && <div className='register-link'>New User? &nbsp;<span onClick={LoginHide}>register</span></div>}
     {!loader && <div className='forgot-link'>Forgot Password? &nbsp;<span onClick={BothHide }>click</span></div>}
    </form>
      

    </div>

    <div className="register-content" id='register'>

    <div className="model-upper">

  <div className="model-heading">Sign Up</div>
  { !loader && <div className="model-close" onClick={closeModal4}>&#x2715;</div>}
  </div>


 

  <form onSubmit={formikRegister.handleSubmit} className='form-modal'>

 

 
  <TextField
  
  label="name"
  placeholder="name"
  id="name"
  name="name"
  value={formikRegister.values.name}
  onChange={formikRegister.handleChange}
  error={formikRegister.touched.name && Boolean(formikRegister.errors.name)}
  helperText={formikRegister.touched.name && formikRegister.errors.name}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircle />
      </InputAdornment>
    ),
  }}
 
/>

 <TextField
      //  focused 
      
      name="email"
      label="Email"
      placeholder="emailid"
      id="email"
      value={formikRegister.values.email}
      onChange={formikRegister.handleChange}
      error={formikRegister.touched.email && Boolean(formikRegister.errors.email)}
      helperText={formikRegister.touched.email && formikRegister.errors.email}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
      variant="outlined"/>


            <TextField
             
              label="Mobile.No"
              placeholder="mobile number"
              id="mobile"
              name="mobile"
              value={formikRegister.values.mobile}
              onChange={formikRegister.handleChange}
              error={formikRegister.touched.mobile && Boolean(formikRegister.errors.mobile)}
              helperText={formikRegister.touched.mobile && formikRegister.errors.mobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              
            />

  <TextField  label="Password" placeholder="Password"
    
      name="password"
      value={formikRegister.values.password}
      onChange={formikRegister.handleChange}
      error={formikRegister.touched.password && Boolean(formikRegister.errors.password)}
      helperText={formikRegister.touched.password && formikRegister.errors.password} 
      id="outlined-adornment-password"
      type={showPassword ? 'text' : 'password'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            <KeyIcon/>
            </InputAdornment>
            ),
        endAdornment:(
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }} />

  
 


 




 
 

 



  <Button type="submit" variant="contained" color="primary" className='btn'>
   {loader?'wait...':'register'} &nbsp; {loader && <span className='login-loader'></span>}
  </Button>

{!loader &&  <div className='register-link'>Already Account? &nbsp;<span onClick={RegisterHide}>login</span></div>}
</form>
  

</div>
<Snackbar open={modalOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert
      onClose={handleClose}
      severity={message==='Registration successful' ? 'success' : 'error'}
      variant="filled"
      sx={{ width: '100%' }}
    >
     {message}
    </Alert>
  </Snackbar>





   {/* // FORGOT PASS */}
    <div className="register-content" id='forgot'>

    <div className="model-upper">

  <div className="model-heading">Forgot Pass</div>
  { !loader && <div className="model-close" onClick={closeModal4}>&#x2715;</div>}
  </div>


 

  <form onSubmit={formikForgot.handleSubmit} className='form-modal'>

 

 
  <TextField
  
  label="name"
  placeholder="name"
  id="name"
  name="name"
  value={formikForgot.values.name}
  onChange={formikForgot.handleChange}
  error={formikForgot.touched.name && Boolean(formikForgot.errors.name)}
  helperText={formikForgot.touched.name && formikForgot.errors.name}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircle />
      </InputAdornment>
    ),
  }}
 
/>

 <TextField
      
      name="email"
      label="Email"
      placeholder="emailid"
      id="email"
      value={formikForgot.values.email}
      onChange={formikForgot.handleChange}
      error={formikForgot.touched.email && Boolean(formikForgot.errors.email)}
      helperText={formikForgot.touched.email && formikForgot.errors.email}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
      variant="outlined"/>



  <Button type="submit" variant="contained" color="primary" className='btn'>
   {loader?'wait...':'Submit'} &nbsp; {loader && <span className='login-loader'></span>}
  </Button>

{!loader &&  <div className='register-link'>Goto Login &nbsp;<span onClick={ForgotHide}>login</span></div>}
</form>
  

</div>




    </div>
    <Snackbar open={modalOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert
      onClose={handleClose}
      severity={message==='Registration successful' ? 'success' : 'error'}
      variant="filled"
      sx={{ width: '100%' }}
    >
     {message}
    </Alert>
  </Snackbar>
    </>

  );
};

export default Login;






  
    
    



