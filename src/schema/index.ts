import * as yup from 'yup';

export const loginSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required(),
  })
  .required();

export const signupSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    username: yup.string().min(4).required(),
    password: yup
      .string()
      .min(8)
      .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required();
