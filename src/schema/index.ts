import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
export const loginSchema = () => {
  const { t } = useTranslation();
  return yup
    .object()
    .shape({
      email: yup
        .string()
        .required(t('login.validate.email.required'))
        .email(t('login.validate.email.email')),
      password: yup
        .string()
        .required(t('login.validate.password.required'))
        .matches(/[a-zA-Z]/, t('login.validate.password.character'))
        .matches(/[0-9]/, t('login.validate.password.number'))
        .min(8, t('login.validate.password.min')),
    })
    .required();
};

export const signupSchema = () => {
  const { t } = useTranslation();
  return yup
    .object()
    .shape({
      email: yup
        .string()
        .required(t('signup.validate.email.required'))
        .email(t('signup.validate.email.email')),
      username: yup
        .string()
        .required(t('signup.validate.password.required'))
        .min(4, t('signup.validate.username.min')),
      password: yup
        .string()
        .required(t('signup.validate.password.required'))
        .matches(/[a-zA-Z]/, t('signup.validate.password.character'))
        .matches(/[0-9]/, t('signup.validate.password.number'))
        .min(8, t('signup.validate.password.min'))
        .max(20, t('signup.validate.password.max')),
      confirmPassword: yup
        .string()
        .required(t('signup.validate.confirmPassword.required'))
        .oneOf([yup.ref('password')], t('signup.validate.confirmPassword.match')),
    })
    .required();
};
