import { fakerZH_CN as faker } from '@faker-js/faker';

export interface UserInfo {
  id: number;
  password: string;
  realName: string;
  roles: string[];
  username: string;
  homePath?: string;
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    password: '123456',
    realName: 'Vben',
    roles: ['super', 'System', 'SysBackendMenu', 'SysUser', 'SysRole'],
    username: 'vben',
  },
  {
    id: 1,
    password: '123456',
    realName: 'Admin',
    roles: ['admin', 'System', 'SysUser', 'SysRole'],
    username: 'admin',
    homePath: '/workspace',
  },
  {
    id: 2,
    password: '123456',
    realName: 'Jack',
    roles: ['user'],
    username: 'jack',
    homePath: '/analytics',
  },
];

export const MOCK_CODES = [
  // super
  {
    codes: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010'],
    username: 'vben',
  },
  {
    // admin
    codes: ['AC_100010', 'AC_100020', 'AC_100030'],
    username: 'admin',
  },
  {
    // user
    codes: ['AC_1000001', 'AC_1000002'],
    username: 'jack',
  },
];

const dashboardMenus = [
  {
    meta: {
      order: -1,
      title: 'page.dashboard.title',
    },
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/analytics',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: '/dashboard/analytics/index',
        meta: {
          affixTab: true,
          title: 'page.dashboard.analytics',
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: '/dashboard/workspace/index',
        meta: {
          title: 'page.dashboard.workspace',
        },
      },
    ],
  },
];

const createDemosMenus = (role: 'admin' | 'super' | 'user') => {
  const roleWithMenus = {
    admin: {
      component: '/demos/access/admin-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.adminVisible',
      },
      name: 'AccessAdminVisibleDemo',
      path: '/demos/access/admin-visible',
    },
    super: {
      component: '/demos/access/super-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.superVisible',
      },
      name: 'AccessSuperVisibleDemo',
      path: '/demos/access/super-visible',
    },
    user: {
      component: '/demos/access/user-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.userVisible',
      },
      name: 'AccessUserVisibleDemo',
      path: '/demos/access/user-visible',
    },
  };

  return [
    {
      meta: {
        icon: 'ic:baseline-view-in-ar',
        keepAlive: true,
        order: 1000,
        title: 'demos.title',
      },
      name: 'Demos',
      path: '/demos',
      redirect: '/demos/access',
      children: [
        {
          name: 'AccessDemos',
          path: '/demosaccess',
          meta: {
            icon: 'mdi:cloud-key-outline',
            title: 'demos.access.backendPermissions',
          },
          redirect: '/demos/access/page-control',
          children: [
            {
              name: 'AccessPageControlDemo',
              path: '/demos/access/page-control',
              component: '/demos/access/index',
              meta: {
                icon: 'mdi:page-previous-outline',
                title: 'demos.access.pageAccess',
              },
            },
            {
              name: 'AccessButtonControlDemo',
              path: '/demos/access/button-control',
              component: '/demos/access/button-control',
              meta: {
                icon: 'mdi:button-cursor',
                title: 'demos.access.buttonControl',
              },
            },
            {
              name: 'AccessMenuVisible403Demo',
              path: '/demos/access/menu-visible-403',
              component: '/demos/access/menu-visible-403',
              meta: {
                authority: ['no-body'],
                icon: 'mdi:button-cursor',
                menuVisibleWithForbidden: true,
                title: 'demos.access.menuVisible403',
              },
            },
            roleWithMenus[role],
          ],
        },
      ],
    },
  ];
};

export const MOCK_MENUS = [
  {
    menus: [...dashboardMenus, ...createDemosMenus('super')],
    username: 'vben',
  },
  {
    menus: [...dashboardMenus, ...createDemosMenus('admin')],
    username: 'admin',
  },
  {
    menus: [...dashboardMenus, ...createDemosMenus('user')],
    username: 'jack',
  },
];

export const MOCK_MENU_LIST = [
  {
    id: 1,
    name: 'Workspace',
    status: 1,
    type: 'menu',
    icon: 'mdi:dashboard',
    path: '/workspace',
    component: '/dashboard/workspace/index',
    meta: {
      icon: 'carbon:workspace',
      title: 'page.dashboard.workspace',
      affixTab: true,
      order: 0,
    },
  },
  {
    id: 2,
    meta: {
      icon: 'carbon:settings',
      order: 9997,
      title: 'system.title',
      badge: 'new',
      badgeType: 'normal',
      badgeVariants: 'primary',
    },
    status: 1,
    type: 'catalog',
    name: 'System',
    path: '/system',
    children: [
      {
        id: 201,
        pid: 2,
        path: '/system/menu',
        name: 'SystemMenu',
        authCode: 'System:Menu:List',
        status: 1,
        type: 'menu',
        meta: {
          icon: 'carbon:menu',
          title: 'system.menu.title',
        },
        component: '/system/menu/list',
        children: [
          {
            id: 20_101,
            pid: 201,
            name: 'SystemMenuCreate',
            status: 1,
            type: 'button',
            authCode: 'System:Menu:Create',
            meta: { title: 'common.create' },
          },
          {
            id: 20_102,
            pid: 201,
            name: 'SystemMenuEdit',
            status: 1,
            type: 'button',
            authCode: 'System:Menu:Edit',
            meta: { title: 'common.edit' },
          },
          {
            id: 20_103,
            pid: 201,
            name: 'SystemMenuDelete',
            status: 1,
            type: 'button',
            authCode: 'System:Menu:Delete',
            meta: { title: 'common.delete' },
          },
        ],
      },
      {
        id: 202,
        pid: 2,
        path: '/system/dept',
        name: 'SystemDept',
        status: 1,
        type: 'menu',
        authCode: 'System:Dept:List',
        meta: {
          icon: 'carbon:container-services',
          title: 'system.dept.title',
        },
        component: '/system/dept/list',
        children: [
          {
            id: 20_401,
            pid: 201,
            name: 'SystemDeptCreate',
            status: 1,
            type: 'button',
            authCode: 'System:Dept:Create',
            meta: { title: 'common.create' },
          },
          {
            id: 20_402,
            pid: 201,
            name: 'SystemDeptEdit',
            status: 1,
            type: 'button',
            authCode: 'System:Dept:Edit',
            meta: { title: 'common.edit' },
          },
          {
            id: 20_403,
            pid: 201,
            name: 'SystemDeptDelete',
            status: 1,
            type: 'button',
            authCode: 'System:Dept:Delete',
            meta: { title: 'common.delete' },
          },
        ],
      },
    ],
  },
  {
    id: 9,
    meta: {
      badgeType: 'dot',
      order: 9998,
      title: 'demos.vben.title',
      icon: 'carbon:data-center',
    },
    name: 'Project',
    path: '/vben-admin',
    type: 'catalog',
    status: 1,
    children: [
      {
        id: 901,
        pid: 9,
        name: 'VbenDocument',
        path: '/vben-admin/document',
        component: 'IFrameView',
        type: 'embedded',
        status: 1,
        meta: {
          icon: 'carbon:book',
          iframeSrc: 'https://doc.vben.pro',
          title: 'demos.vben.document',
        },
      },
      {
        id: 902,
        pid: 9,
        name: 'VbenGithub',
        path: '/vben-admin/github',
        component: 'IFrameView',
        type: 'link',
        status: 1,
        meta: {
          icon: 'carbon:logo-github',
          link: 'https://github.com/vbenjs/vue-vben-admin',
          title: 'Github',
        },
      },
      {
        id: 903,
        pid: 9,
        name: 'VbenAntdv',
        path: '/vben-admin/antdv',
        component: 'IFrameView',
        type: 'link',
        status: 0,
        meta: {
          icon: 'carbon:hexagon-vertical-solid',
          badgeType: 'dot',
          link: 'https://ant.vben.pro',
          title: 'demos.vben.antdv',
        },
      },
    ],
  },
  {
    id: 10,
    component: '_core/about/index',
    type: 'menu',
    status: 1,
    meta: {
      icon: 'lucide:copyright',
      order: 9999,
      title: 'demos.vben.about',
    },
    name: 'About',
    path: '/about',
  },
];

export function getMenuIds(menus: any[]) {
  const ids: number[] = [];
  menus.forEach((item) => {
    ids.push(item.id);
    if (item.children && item.children.length > 0) {
      ids.push(...getMenuIds(item.children));
    }
  });
  return ids;
}

export const MOCK_MENUS_TREE_DETAIL = [
  {
    id: '1',
    item: {
      code: 'System',
      name: '系统管理',
      permission: '',
      pid: '0',
      sort: 0,
      type: 1,
      visible: 'Y',
    },
    name: '系统管理',
    pid: '0',
    children: [
      {
        id: '1778685030944481280',
        pid: '1',
        name: '权限菜单配置',
        item: {
          code: 'SysBackendMenu',
          name: '权限菜单配置',
          permission: '',
          pid: '0',
          sort: -1,
          type: 1,
          visible: 'N',
        },
        children: [],
      },
      {
        id: '9',
        pid: '1',
        name: '管理员管理',
        item: {
          code: 'SystemUser',
          name: '管理员管理',
          pid: '1',
          sort: 0,
          type: 1,
          visible: 'Y',
        },
        children: [
          {
            id: '142',
            pid: '9',
            name: '管理员新增',
            item: {
              code: 'UserAccountSave',
              name: '管理员新增',
              permission: 'user-account:save',
              pid: '9',
              sort: 0,
              type: 2,
              visible: 'N',
            },
            children: [],
          },
          {
            id: '143',
            pid: '9',
            name: '管理员编辑',
            item: {
              code: 'UserAccountUpdate',
              name: '管理员编辑',
              permission: 'user-account:update',
              pid: '9',
              sort: 0,
              type: 2,
              visible: 'N',
            },
            children: [],
          },
        ],
      },
      {
        id: '8',
        pid: '1',
        name: '角色管理',
        item: {
          code: 'SystemRole',
          name: '角色管理',
          pid: '1',
          sort: 1,
          type: 1,
          visible: 'Y',
        },
        children: [
          {
            id: '137',
            pid: '8',
            name: '角色新增',
            item: {
              code: 'SysRoleAdd',
              name: '角色新增',
              permission: 'sysRole:add',
              pid: '8',
              sort: 0,
              type: 2,
              visible: 'N',
            },
            children: [],
          },
          {
            id: '138',
            pid: '8',
            name: '角色删除',
            item: {
              code: 'SysRoleDelete',
              name: '角色删除',
              permission: 'sysRole:delete',
              pid: '8',
              sort: 0,
              type: 2,
              visible: 'N',
            },
            children: [],
          },
        ],
      },
    ],
  },
];

export const MOCK_MENUS_PARTENTTREE = [
  {
    id: '1',
    name: '系统管理',
    pid: '0',
    children: [
      {
        id: '1778685030944481280',
        pid: '0',
        name: '权限菜单配置',
        children: [],
      },
      {
        id: '9',
        pid: '1',
        name: '管理员管理',
        children: [],
      },
      {
        id: '8',
        pid: '1',
        name: '角色管理',
        children: [],
      },
    ],
  },
];

export const MOCK_ROLES_OWN_MENU = ['1', '9', '8'];

export const MOCK_ROLE_LIST = Array.from({ length: 10 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.commerce.product(),
  remark: faker.lorem.sentence(),
  status: faker.helpers.arrayElement([0, 1]),
  userCnt: faker.number.int({ min: 0, max: 6 }),
}));

export const MOCK_USER_ACCOUNT_LIST = Array.from({ length: 30 }).map(() => {
  return {
    userId: faker.string.uuid(),
    accountState: faker.helpers.arrayElement([0, 1]),
    bindPhone: `139${faker.number.int({ min: 10_000_000, max: 99_999_999 })}`,
    nickName: faker.internet.username(),
    roles: faker.helpers.arrayElements(MOCK_ROLE_LIST, { min: 1, max: 4 }),
  };
});
