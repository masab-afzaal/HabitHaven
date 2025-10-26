// API Endpoints Constants
export const API_ENDPOINTS = {
  // User/Auth endpoints
  AUTH: {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    LOGOUT: '/user/logout',
    MY_ACCOUNT: '/user/my-account',
    UPDATE_ACCOUNT: '/user/update-Account',
    CHANGE_PASSWORD: '/user/change-Password',
  },
  
  // Task endpoints
  TASK: {
    CREATE: '/task/createTask',
    GET_ALL: '/task/allTask',
    GET_BY_ID: (id) => `/task/${id}`,
    UPDATE: (id) => `/task/update/${id}`,
    DELETE: (id) => `/task/delete/${id}`,
    MARK_COMPLETE: (id) => `/task/complete/${id}`,
  },
  
  // Group endpoints
  GROUP: {
    CREATE: '/group/createGroup',
    JOIN: (id) => `/group/${id}/join`,
    GET_ALL: '/group/allGroups',
    GET_MY_GROUPS: '/group/myGroups',
    GET_BY_ID: (id) => `/group/${id}`,
  },
  
  // Prayer endpoints
  PRAYER: {
    GET_TIMES: '/prayer/prayer-times',
    GET_BY_LOCATION: '/prayer/by-location',
  },
};

export default API_ENDPOINTS;
