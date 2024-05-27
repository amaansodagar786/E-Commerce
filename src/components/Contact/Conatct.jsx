import React, {useContext, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Button, InputAdornment, Snackbar, TextField} from '@mui/material';
import './Contact.scss';
import MyContext from '../../Uttis/MyContext';
import SendIcon from '@mui/icons-material/Send';
import {  EmailOutlined, MessageOutlined, Person2Outlined, PhoneCallbackOutlined } from '@mui/icons-material';


const Contact = ({setLoader}) => {



const {message,setMessage} = useContext(MyContext)
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false)
  };



 


  







  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '' ,
      email: '',
      message: '',
      
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+){0,2}$/, '*Only alphabets are allowed in the name, and maximum 2 spaces are allowed').required('*Name is required'),
      mobile: Yup.string().matches(/^[0-9]{10}$/, '*Invalid mobile number').required('*Mobile number is required'),
      email: Yup.string().email('*Invalid email address').required('*Email is required'),
      message: Yup.string().matches(/^(\S+\s*){10,100}$/, '*Minimum 10 AND Maximum 50 words are allowed').required('*Message is required'),
      
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoader(true)
    try {
      
   
      const response = await fetch('https://updated-backend-brown.vercel.app/contact', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();

      if(data.success) {
        
        
        setModalOpen(true);
       setMessage(data.message)
        resetForm();
       
      
      }
      else{
        setModalOpen(true);
        setMessage(data.error)
      }
    } catch (error) {
      alert(error.message)
    }finally{
      setLoader(false)
    }

      
      

      
     
      
    },
  });




  return (

    <>
   
  
    <div className='contact'>
      <div className="contact-page">

    

       
          <h2>Write Your Issue</h2>
          <form onSubmit={formik.handleSubmit}>
          

            <TextField
            type="text"
            id="name"
            name="name"
            placeholder='Name'
            size="small"
            value={formik.values.name}
            onChange={formik.handleChange}
error={formik.touched.name && Boolean(formik.errors.name)}
helperText={formik.touched.name && formik.errors.name} 
label="Name" 
InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <Person2Outlined fontSize="small"/>
    </InputAdornment>
  ),
}}
variant="outlined" />


<TextField
type="text"
id="mobile"
name="mobile"
placeholder='mobile'
size="small"
value={formik.values.mobile}
onChange={formik.handleChange}
error={formik.touched.mobile && Boolean(formik.errors.mobile)}
helperText={formik.touched.mobile && formik.errors.mobile} 
label="mobile" 
InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <PhoneCallbackOutlined fontSize="small"/>
    </InputAdornment>
  ),
}}
variant="outlined" />

<TextField
type="text"
id="email"
name="email"
placeholder='email'
size="small"
value={formik.values.email}
onChange={formik.handleChange}
error={formik.touched.email && Boolean(formik.errors.email)}
helperText={formik.touched.email && formik.errors.email} 
label="email" 
InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <EmailOutlined fontSize="small"/>
    </InputAdornment>
  ),
}}
variant="outlined" />

           

<TextField
type="text"
id="message"
InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      <MessageOutlined fontSize="small"/>
    </InputAdornment>
  ),
}}
name="message"
placeholder='message'
multiline
size="small"
rows={4}
value={formik.values.message}
onChange={formik.handleChange}
error={formik.touched.message && Boolean(formik.errors.message)}
helperText={formik.touched.message && formik.errors.message} 
label="message" 
variant="outlined" />

            <Button color="success" endIcon={<SendIcon fontSize="small"/>} variant="contained"  type="submit" >
            
            send message</Button>
          
          </form>
       
      </div>
     
    </div>


   
    <Snackbar open={modalOpen} autoHideDuration={3000} onClose={handleCloseModal} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
  <Alert
    onClose={handleCloseModal}  
    severity={message==='Your message has been sent!' ? 'success' :'error'}
    variant="filled"
    sx={{ width: '100%' }}
  >
    {message}
  </Alert>
</Snackbar>




    

</>
  );
};

export default Contact;