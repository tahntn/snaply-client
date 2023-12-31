export const Signup = {
  title: 'Sign up',
  form: {
    email: 'Email',
    password: 'Password',
    username: 'Username',
    confirmPassword: 'Confirm password',
    placeholderEmail: 'Type your email',
    placeholderPassword: 'Type your password',
    placeholderUsername: 'Type your username',
    placeholderConfirmPassword: 'Type your confirm password',
  },
  button: {
    title: 'Sign up',
  },
  validate: {
    email: {
      email: 'Please enter a valid email address.',
      required: 'Please enter your email.',
    },
    username: {
      min: 'Please choose a username with a minimum of 4 characters.',
      required: 'Please enter your username.',
    },
    password: {
      min: 'Please use a password with a minimum of 8 characters.',
      max: 'Please use a password with a maximum of 20 characters.',
      character: 'Your password should have at least one alphabetical character.',
      number: 'Your password should have at least one numerical character.',
      required: 'Please enter your password.',
    },
    confirmPassword: {
      match: 'Confirm password must match the entered password.',
      required: 'Please enter your confirm password.',
    },
  },
  prompt: {
    haveAccount: 'Already have an account?',
    login: 'Log in now',
  },
};
