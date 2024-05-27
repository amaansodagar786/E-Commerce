import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button} from '@mui/material';
import './UpdatedForm.scss';
import MyContext from '../../../../Uttis/MyContext';


const UpdatedForm = ({ editMode }) => {

  const {openModal4,shippingInfo } = useContext(MyContext)
  


  const formik = useFormik({
    initialValues: {
        name: editMode ? shippingInfo.name : '',
        mobile: editMode ? shippingInfo.mobile : '',
        email: editMode ? shippingInfo.email : '',
        address: editMode ? shippingInfo.address : '',
        state: editMode ? shippingInfo.state : '',
        pincode: editMode ? shippingInfo.pincode : '',
        landmark: editMode ? shippingInfo.landmark : '',
        city: editMode ? shippingInfo.city : '',
        alternate: editMode ? shippingInfo.alternate : '',

    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      mobile: Yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Mobile is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      address: Yup.string().required('Address is required'),
      state: Yup.string().required('State is required'),
      pincode: Yup.string()
      .matches(/^[0-9]+$/, 'Pincode must only contain numbers')
      .required('Pincode is required'),
      city: Yup.string().required('City is required'),
    
    
    }),
    onSubmit: async(values) => {
     

       
      try {
          const token = sessionStorage.getItem('token');
          if (!token) {
            // Handle case when user is not logged in
          openModal4()
            return;
          }
    
          const response = await fetch('https://e-commerce-vert-iota.vercel.app/save-shipping-info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ shippingInfo: values }),
          });
          const data = await response.json();

          if (data.success) {
            alert(data.message)
            window.location.reload();
          } else {
            console.error('Error saving shipping info:', data.error);
          }
        } catch (error) {
          console.error('Error saving shipping info:', error);
        }
      },
    })
     


  return (

      <form onSubmit={formik.handleSubmit}>

      <div className='row1'>
        <TextField
          
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          
          id="mobile"
          name="mobile"
          label="Mobile Number"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        </div>

        <div className='row1'>
        <TextField
          
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        
        <TextField
          
        id="state"
        name="state"
        label="State"
        value={formik.values.state}
        onChange={formik.handleChange}
        error={formik.touched.state && Boolean(formik.errors.state)}
        helperText={formik.touched.state && formik.errors.state}
      />

      </div>
        <TextField
          
          id="address"
          name="address"
          multiline
          rows={3}
          label="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <div className='row1'>
        <TextField
        id="landmark"
        name="landmark"
        label="landmark (optional)"
        value={formik.values.landmark}
        onChange={formik.handleChange}
       
      />

     

      

        <TextField
       
          id="pincode"
          name="pincode"
          label="Pincode"
          value={formik.values.pincode}
          onChange={formik.handleChange}
          error={formik.touched.pincode && Boolean(formik.errors.pincode)}
          helperText={formik.touched.pincode && formik.errors.pincode}
        />

        </div>


        <div className='row1'>
        <TextField
          
          id="city"
          name="city"
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />

        <TextField
          
          id="alternate"
          name="alternate"
          label="Alternate Phone (Optional)"
          value={formik.values.alternate}
          onChange={formik.handleChange}
  
        />
        </div>

     

        <Button type="submit" variant="contained" color="primary" className='btn'>
        {editMode ? 'Update' : 'Submit'}
        </Button>
      </form>
   
  );
};

export default UpdatedForm;