export const ERROR_MESSAGES: Record<string, Record<string, string>> = {
  firstName: {
    required: 'Please enter your first name.',
    minlength: 'First name must be at least 3 characters long.'
  },
  lastName: {
    required: 'Please enter your last name.',
    minlength: 'Last name must be at least 3 characters long.'
  },
  username: {
    required: 'Please enter a username.',
    minlength: 'Username must be at least 4 characters long.',
    usernameExists: "A user with that username already exists."
  },
  email: {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.'
  },
  password: {
    required: 'Please enter a password.',
    minlength: 'Password must be at least 6 characters long.'
  },
  confirmPassword: {
    required: 'Please confirm your password.',
    minlength: 'Password confirmation must be at least 6 characters long.',
    confirmPassword: 'Passwords do not match.'
  }
};
