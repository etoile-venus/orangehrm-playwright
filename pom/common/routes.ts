const BASE_PHP = '/web/index.php';
const AUTH_BASE = BASE_PHP + '/auth';
const PIM_BASE = BASE_PHP + '/pim';
const ADMIN_BASE = BASE_PHP + '/admin';

export const ROUTES = {
  AUTH: {
    LOGIN: AUTH_BASE + '/login',
    FORGOT_PASSWORD_REQUEST: AUTH_BASE + '/requestPasswordResetCode',
    FORGOT_PASSWORD_SEND: AUTH_BASE + '/sendPasswordReset',
  },

  DASHBOARD: BASE_PHP + '/dashboard/index',

  PIM: {
    VIEW_EMPLOYEE_LIST: PIM_BASE + '/viewEmployeeList',
    ADD_EMPLOYEE: PIM_BASE + '/addEmployee',
    VIEW_PERSONAL_DETAILS: PIM_BASE + '/viewPersonalDetails/empNumber',
  },

  ADMIN: {
    VIEW_SYSTEM_USERS: ADMIN_BASE + '/viewSystemUsers',
  },
};
