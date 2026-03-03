export type LoginValidData = {
  username: string;
  password: string;
};

export type LoginInvalidData = {
  username: string;
  password: string;
  errorType: string;
  targetLabel?: string;
  expectedMessage: string;
};
