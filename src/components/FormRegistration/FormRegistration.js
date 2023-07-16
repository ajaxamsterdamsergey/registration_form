import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '../Button/Button';
import svg_1 from '../../images/section_2-svg_1.svg';
import svg_2 from '../../images/section_2-svg_2.svg';
import svg_3 from '../../images/section_2-svg_3.svg';
import user_img from '../../images/u_user.svg';
import u_users_alt from '../../images/u_users-alt.svg';
import u_map_marker from '../../images/u_map-marker-alt.svg';
import u_phone from '../../images/u_phone-alt.svg';
import u_padlock from '../../images/u_padlock.svg';
import u_padlock2 from '../../images/u_padlock2.svg';
import u_envelope from '../../images/u_envelope.svg';
import header_logo from '../../images/header-fixed.svg';
import './FormRegistration.scss';

export const FormRegistration = () => {
  const [countries, setCountries] = useState({});

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const sortedCountries = response.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        ); // Сортировка по алфавиту
        const countries = sortedCountries.reduce((acc, country) => {
          acc[country.cca3] = country;
          return acc;
        }, {});
        setCountries(countries);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const initialValues = {
    firstName: '',
    lastName: '',
    country: '',
    phone: '',
    password: '',
    confirmPassword: '',
    email: '',
    agreeToTerms: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    country: Yup.string().required('Country is required'),
    phone: Yup.string().required('Phone is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the Terms & Conditions'),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleChangeCountry = (event, formik) => {
    const { value } = event.target;
    const selectedCountry = countries[value];
    if (selectedCountry) {
      const countryCode = selectedCountry.idd.root + selectedCountry.idd.suffixes[0];
      formik.setFieldValue('phone', countryCode || '');
      formik.setFieldValue('country', value);
    }
  };

  return (
    <div className="container">
      <img src={svg_1} alt="Overlay" className="overlay-image_1" />
      <img src={svg_2} alt="Overlay" className="overlay-image_2" />
      <img src={svg_3} alt="Overlay" className="overlay-image_3" />
      <article className="wrapper">
        <img src={header_logo} alt="Overlay" className="header_logo" />
        <p className="info">
          <a href="#form">Sign Up</a> and find the best place to rest while traveling
        </p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {(formik) => (
            <Form id="form" className="form">
              <div className="form-field">
                <div className="icon-container">
                  <img src={user_img} alt="Overlay" className="icon" />
                </div>
                <Field type="text" name="firstName" className="field" placeholder="First Name" autoComplete="off" />
                <label htmlFor="firstName" className="field-label">
                  First Name
                </label>
                <ErrorMessage name="firstName" component="div" className="error-message" />
              </div>
              <div className="form-field">
                <div className="icon-container">
                  <img src={u_users_alt} alt="Overlay" className="icon" />
                </div>
                <Field type="text" name="lastName" className="field" placeholder="Last Name" autoComplete="off" />
                <label htmlFor="firstName" className="field-label">
                  Last Name
                </label>
                <ErrorMessage name="lastName" component="div" className="error-message" />
              </div>
              <div className="form-field">
                <div className="icon-container">
                  <img src={u_map_marker} alt="Overlay" className="icon" />
                </div>
                <Field
                  as="select"
                  name="country"
                  className="field select"
                  onChange={(e) => handleChangeCountry(e, formik)}
                  value={formik.values.country}
                >
                  <option value="" disabled>
                    Country
                  </option>
                  {Object.values(countries).map((country) => (
                    <option key={country.cca3} value={country.cca3}>
                      {country.name.common}
                    </option>
                  ))}
                </Field>
                <label htmlFor="firstName" className={`field-label ${formik.values.country ? '' : 'hidden'}`}>
                  Country
                </label>
                <ErrorMessage name="country" component="div" className="error-message" />
              </div>
              <div className="form-field">
                <div className="icon-container">
                  <img src={u_phone} alt="Overlay" className="icon" />
                </div>
                <Field type="text" name="phone" className="field" placeholder="Phone" autoComplete="off" />
                <label htmlFor="firstName" className="field-label">
                  Phone
                </label>
                <ErrorMessage name="phone" component="div" className="error-message" />
              </div>
              <div className="form-field">
                <div className="icon-container">
                  <img src={u_padlock} alt="Overlay" className="icon" />
                </div>
                <Field
                  type="password"
                  name="password"
                  className="field"
                  placeholder="Password"
                  autoComplete="new-password"
                />
                <label htmlFor="firstName" className="field-label">
                  Password
                </label>
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div className="form-field">
                <div className="icon-container">
                  <img src={u_padlock2} alt="Overlay" className="icon" />
                </div>
                <Field type="password" name="confirmPassword" className="field" placeholder="Confirm Password" autoComplete="off" />
                <label htmlFor="firstName" className="field-label">
                  Confirm Password
                </label>
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>
              <div className="form-field">
                <div className="icon-container">
                  <img src={u_envelope} alt="Overlay" className="icon" />
                </div>
                <Field type="email" name="email" className="field" placeholder="Email" autoComplete="off" />
                <label htmlFor="firstName" className="field-label">
                  Email
                </label>
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="checkbox-field">
                <label>
                  <Field type="checkbox" name="agreeToTerms" />
                  I agree to the <a href="https://www.google.com/">Terms & Conditions</a>
                </label>
              </div>
              <div className="checkbox-error">
                <ErrorMessage name="agreeToTerms" component="div" className="error-message" />
              </div>
              <div className="wrapper_btn">
                <Button type="submit">Sign Up</Button>
              </div>
              <p className="info login">
                If you have an account, <a href="https://example.com">Log In</a>
              </p>
            </Form>
          )}
        </Formik>
      </article>
    </div>
  );
};

export default FormRegistration;
