import { AccessControl } from 'accesscontrol';

const roles = {
  admin: {
    todos: {
      'read:any': ['*'],
    },
    users: {
      'read:any': ['*'],
    },
  },
  user: {
    todos: {
      'read:own': ['*'],
      'create:own': ['*'],
      'update:own': ['*'],
      'delete:own': ['*'],
    },
  },
};

export const RBAC = new AccessControl(roles);
