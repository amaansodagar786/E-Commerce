import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Forgotpass.scss'; // Import the SCSS file

const Forgotpass = () => {
  const [loader, setLoader] = useState(false);
 

  const initialValues = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);
    try {
        const response = await fetch('https://updated-backend-brown.vercel.app/changepassword', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json',
            },
        });
        const data = await response.json();

        if (data.success) {
            resetForm();
            // Reset succeeded, you might want to inform the user
            console.log("Password reset email sent successfully");
        } else {
            // Reset failed, handle the error
            console.error(data.error);
        }
    } catch (error) {
        // Handle fetch errors
        alert(error.message);
    } finally {
        setLoader(false);
    }
};

  return (
    <div className="forgot-pass-container">
      <h1>Forgot Password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <Field type="password" id="newPassword" name="newPassword" />
            <ErrorMessage name="newPassword" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>

          <button type="submit" disabled={loader}>
            {loader ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      </Formik>

      
    </div>
  );
};

export default Forgotpass;
