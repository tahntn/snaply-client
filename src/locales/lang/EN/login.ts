export const Login = {
  title: 'Log in',
  form: {
    email: 'Email',
    password: 'Password',
    placeholderEmail: 'Type your email',
    placeholderPassword: 'Type your password',
  },
  button: {
    title: 'Login',
  },
  validate: {
    email: {
      email: 'Please enter a valid email address.',
      required: 'Please enter your email.',
    },
    password: {
      min: 'Please use a password with a minimum of 8 characters.',
      max: 'Please use a password with a maximum of 20 characters.',
      character: 'Your password should have at least one alphabetical character.',
      number: 'Your password should have at least one numerical character.',
      required: 'Please enter your password.',
    },
  },
  prompt: {
    noAccount: "Don't have an account?",
    signup: 'Sign up now',
  },
};
