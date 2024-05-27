import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { IconButton, InputAdornment } from '@mui/material';
import { ArrowRightAlt, Edit } from '@mui/icons-material';
import './AccountForm.scss';
import MyContext from '../../../../Uttis/MyContext';

const AccountForm = () => {
  const { userdata, token } = useContext(MyContext);
  const [loader, setLoader] = useState(false);
  const [isEdit, setIsEdit] = useState({
    name: false,
    mobile: false,
    password: false, // Added password edit state
  });

  const handleEditClick = (field) => {
    setIsEdit({ ...isEdit, [field]: !isEdit[field] });
  };

  const formik = useFormik({
    initialValues: {
      name: userdata ? userdata.name : '',
      email: userdata ? userdata.email : '',
      mobile: userdata ? userdata.mobile : '',
      password: userdata ? userdata.password : '',
      oldpassword: '',
      newpassword: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Enter a valid email').required('Email is required'),
      mobile: yup.string().required('Mobile is required').min(10),
      password: yup.string().min(8).required('Password is required'),
      newpassword: yup.string().min(8).required('New Password is required'),
    }),
    onSubmit: () => {}, // Placeholder to prevent default form submission
  });

  const handleClick = async () => {
    const values = formik.values; // Get values from formik
    // alert(JSON.stringify(values, null, 2)); // Display values as JSON
    console.log(values);

    setLoader(true);

    try {
      const response = await fetch('http://localhost:3034/update-account-data', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error occurred during fetch:', error);
      alert('An error occurred while updating account data.');
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {token ? (
        <div className="accountForm-main">
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              name="name"
              value={formik.values.name || ''}
              disabled={!isEdit.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="edit name" onClick={() => handleEditClick('name')}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="email"
              name="email"
              disabled={!isEdit.email}
              value={formik.values.email || ''}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              variant="outlined"
            />

            <TextField
              id="mobile"
              name="mobile"
              disabled={!isEdit.mobile}
              value={formik.values.mobile || ''}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              label="Mobile"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="edit mobile" onClick={() => handleEditClick('mobile')}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="password"
              type="password"
              name="password"
              disabled={!isEdit.password}
              value={formik.values.password || ''}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="edit password" onClick={() => handleEditClick('password')}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {isEdit.password && (
              <>
                <TextField
                  id="oldpassword"
                  type="password"
                  name="oldpassword"
                  value={formik.values.oldpassword || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.oldpassword && Boolean(formik.errors.oldpassword)}
                  helperText={formik.touched.oldpassword && formik.errors.oldpassword}
                  label="Old Password"
                  variant="outlined"
                />
                <TextField
                  id="newpassword"
                  type="password"
                  name="newpassword"
                  value={formik.values.newpassword || ''}
                  onChange={formik.handleChange}
                  error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                  helperText={formik.touched.newpassword && formik.errors.newpassword}
                  label="New Password"
                  variant="outlined"
                />
              </>
            )}

            <Button
              variant="contained"
              className="SM"
              onClick={handleClick}
              startIcon={<ArrowRightAlt />}
            >
              {loader ? 'Updating' : 'Update'}
            </Button>
          </form>
        </div>
      ) : (
        <h3>Please login</h3>
      )}
    </>
  );
};

export default AccountForm;
