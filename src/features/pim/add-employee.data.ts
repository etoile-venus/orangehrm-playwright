import { Tags, TestCase } from '@common/test-case.model';

type AddEmployeeData = {
  firstname?: string;
  firstNameErrorMessage?: string;
  username?: string;
  usernameErrorMessage?: string;
};

export const PIM_ADD_EMPLOYEE_EP: TestCase<AddEmployeeData>[] = [
  {
    id: 'PIM_TC02',
    title: '"Verify username validation with fewer than 5 characters on the Add Employee page"',
    description:
      'Verify that the system rejects a username with fewer than 5 characters and triggers a validation error.',
    tags: [Tags.FUNCTIONAL, Tags.REGRESSION, Tags.EP, Tags.NEGATIVE],
    data: {
      username: 'doe',
      usernameErrorMessage: 'Should be at least 5 characters',
    },
  },
  {
    id: 'PIM_TC03',
    title:
      'Verify username validation with a valid length of 5 to 40 characters on the Add Employee page',
    description:
      'Verify that the system successfully accepts a valid username between 5 and 40 characters.',
    tags: [Tags.FUNCTIONAL, Tags.REGRESSION, Tags.EP],
    data: {
      username: 'qa_john',
    },
  },
  {
    id: 'PIM_TC04',
    title: 'Verify username validation with more than 40 characters on the Add Employee page',
    description:
      'Verify that the system rejects a username withmore than 40 characters and triggers a validation error.',
    tags: [Tags.FUNCTIONAL, Tags.REGRESSION, Tags.EP, Tags.NEGATIVE],
    data: {
      username: '45characteaddemployeeusernamejohndoedoedoedoe',
      usernameErrorMessage: 'Should not exceed 40 characters',
    },
  },
];

export const PIM_TC01: TestCase<AddEmployeeData> = {
  id: 'PIM_TC01',
  title: 'Verify that the Add Employee page is accessible and displays correctly',
  description:
    'Verify that the Add Employee page is accessible and displays all expected elements.',
  tags: [Tags.FUNCTIONAL, Tags.REGRESSION, Tags.EP],
  data: {},
};
