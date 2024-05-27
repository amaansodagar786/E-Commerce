import { useLocation } from "react-router-dom";
import "./Newsletter.scss";
import MyContext from "../../../Uttis/MyContext"
import { Alert, InputAdornment, Snackbar, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {

  FaFacebook,
  FaInstagram,
  FaTwitter,

} from "react-icons/fa";
import { useContext, useState } from "react";
import { EmailOutlined } from "@mui/icons-material";

const Newsletter = ({ setLoader }) => {





  const handleInsta = () => {

    window.open('https://www.instagram.com/vhx_view')
  }
  const { message, setMessage } = useContext(MyContext)
  const [modalOpen, setModalOpen] = useState(false);


  const handleClose = () => {
    setModalOpen(false);
  };





  const formik = useFormik({
    initialValues: {
      email: '',


    },
    validationSchema: yup.object({
      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),

    }),
    onSubmit: async (values, { resetForm }) => {
      setLoader(true)
      try {


        const response = await fetch("https://updated-backend-brown.vercel.app/newlater", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (data.success) {
          setMessage(data.message)
          setModalOpen(true);
          resetForm()

        } else {
          setMessage(data.error)
          setModalOpen(true);
        }
      } catch (error) {
        alert(error.message)
      } finally {
        setLoader(false)
      }
    },

  });

  const location = useLocation();
  if (location.pathname === '/checkout') {
    return null
  }
  return <>
    <div className="newsletter-section">
      <div className="newsletter-content">
        <span className="small-text">Newsletter</span>
        <span className="big-text">Sign up for latest updates and offers</span>

        <form className="form" onSubmit={formik.handleSubmit}>


          <TextField
            id="email"
            name="email"

            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
            placeholder="enter your maill id"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined fontSize="small" />
                </InputAdornment>
              ),
            }} />

          <button variant="contained" type='submit'>Subscribe</button>
        </form>
        <div className="text">
          Will be used in accordance with our Privacy Policy</div>
        <div className="social-icons">





          <button variant="contained" type='submit' onClick={handleInsta}>   <FaInstagram /></button>
          <button variant="contained" type='submit' onClick={handleInsta}>   <FaFacebook /></button>
          <button variant="contained" type='submit' onClick={handleInsta}>   <FaTwitter /></button>




        </div>

      </div>
    </div>

    <Snackbar
      open={modalOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose}
        severity={message === 'thanks for subscribe' ? 'success' : 'error'}
        variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  </>

}


export default Newsletter;



