import type { HttpResponsePageData } from '#/api/request';

import { requestClient } from '#/api/request';

export namespace UserAccountType {
  export interface QueryByPageResult {
    userId?: string;
    /** 启用状态错误 0-启用 1-禁用 */
    accountState: number;
    /** 账号绑定手机号 */
    bindPhone: string;
    /** 用户名称 */
    nickName: string;
    /** 角色 */
    roles: { id: string; name: string }[];
  }

  export interface SaveOrUpdateData {
    userId?: string;
    accPwd?: string;
    bindPhone: string;
    nickName: string;
    roleIds: string[];
  }

  export type UpdatePwdData = Pick<SaveOrUpdateData, 'accPwd' | 'userId'>;
}

export const UserAccountApi = {
  /** 管理员管理 查询分页 */
  queryByPage(params?: object) {
    return requestClient.post<
      HttpResponsePageData<UserAccountType.QueryByPageResult>
    >('/user-account/queryByPage', {}, { params });
  },

  /** 管理员管理 新增 */
  save(data: UserAccountType.SaveOrUpdateData) {
    return requestClient.post('/user-account/save', data);
  },

  /** 管理员管理 编辑 */
  update(data: UserAccountType.SaveOrUpdateData) {
    return requestClient.post('/user-account/update', data);
  },

  /** 管理员管理 编辑密码 */
  updatePwd(data: UserAccountType.UpdatePwdData) {
    return requestClient.post('/user-account/updatePwd', data);
  },

  /** 管理员管理 状态 */
  status(userId: string, accountState: number) {
    return requestClient.post('/user-account/status', {
      userId,
      accountState,
    });
  },

  /** 管理员管理 删除 */
  delete(userId: string) {
    return requestClient.post('/user-account/delete', {
      userId,
    });
  },
};
