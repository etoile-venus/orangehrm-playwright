import { Tags, TestCase } from '@common/test-case.model';

type LoginData = {
  username: string;
  password: string;
  usernameErrorMessage?: string;
  passwordErrorMessage?: string;
  invalidCredentialsMessage?: string;
};

export const AUTH_TC01: TestCase<LoginData> = {
  id: 'AUTH_TC01',
  title: 'Verify that the user is successfully logged in when valid credentials are provided',
  description:
    'Verify that the system authenticates the account and grants access to the application when a valid username and password are submitted via the login form.',
  tags: [Tags.FUNCTIONAL, Tags.SMOKE],
  data: {
    username: 'Admin',
    password: 'admin123',
  },
};

export const AUTH_TC02: TestCase<LoginData> = {
  id: 'AUTH_TC02',
  title: 'Verify that the user cannot login when the password field is left empty.',
  description:
    "Verify that the system doesn't allow authentication when a valid username is entered but the password field is left empty.",
  tags: [Tags.FUNCTIONAL, Tags.NEGATIVE, Tags.REGRESSION],
  data: {
    username: 'Admin',
    password: '',
    passwordErrorMessage: 'Required',
  },
};

export const AUTH_TC03: TestCase<LoginData> = {
  id: 'AUTH_TC03',
  title: 'Verify that the user cannot login when an invalid password is provided',
  description:
    "Verify that the system doesn't allow authentication when a valid username is entered but the password provided is incorrect.",
  tags: [Tags.FUNCTIONAL, Tags.NEGATIVE, Tags.REGRESSION],
  data: {
    username: 'Admin',
    password: 'admin', // Incorrect password
    invalidCredentialsMessage: 'Invalid credentials',
  },
};

export const AUTH_TC04: TestCase<LoginData> = {
  id: 'AUTH_TC04',
  title: 'Verify that the user cannot login when the username field is left empty.',
  description:
    "Verify that the system doesn't allow authentication when a password is entered but the username field is left empty.",
  tags: [Tags.FUNCTIONAL, Tags.NEGATIVE, Tags.REGRESSION],
  data: {
    username: '',
    password: 'admin123',
    usernameErrorMessage: 'Required',
  },
};
