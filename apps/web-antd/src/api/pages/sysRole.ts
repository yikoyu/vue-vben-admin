import type { HttpResponsePageData } from '#/api/request';

import { requestClient } from '#/api/request';

export namespace SysRoleType {
  export interface PageResult {
    id: string;
    name: string;
    remark: string;
    status: number;
    userCnt: number;
  }

  export type ListResult = Omit<PageResult, 'id' | 'name'>;

  export interface AddOrEditData {
    id?: string;
    /** 授权菜单 */
    grantMenuIdList: string[];
    /** 名称 */
    name: string;
    /** 备注 */
    remark: string;
  }
}

export const SysRoleApi = {
  /** 获取角色管理列表 */
  page(params?: object) {
    return requestClient.get<HttpResponsePageData<SysRoleType.PageResult>>(
      '/sysRole/page',
      {
        params,
      },
    );
  },

  /** 查询所有角色 */
  list() {
    return requestClient.get<SysRoleType.ListResult[]>('/sysRole/list');
  },

  /** 获取系统角色_拥有菜单 */
  ownMenu(id: string) {
    return requestClient.post<string[]>('/sysRole/ownMenu', {
      id,
    });
  },

  /** 添加自定义系统角色 */
  add(data: SysRoleType.AddOrEditData) {
    return requestClient.post('/sysRole/add', data);
  },

  /** 编辑系统角色 */
  edit(data: SysRoleType.AddOrEditData) {
    return requestClient.post('/sysRole/edit', data);
  },

  /** 删除自定义系统角色 */
  delete(id: string) {
    return requestClient.post('/sysRole/delete', { id });
  },
};
