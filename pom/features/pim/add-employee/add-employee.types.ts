export type AddEmployeeEPData = {
  username: string;
  errorType: string;
  targetLabel?: string;
  expectedMessage: string;
};

export type AddEmployeeValidData = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
};
