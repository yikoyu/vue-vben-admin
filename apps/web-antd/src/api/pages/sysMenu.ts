import { requestClient } from '#/api/request';

export namespace SysMenuType {
  export interface ParentTreeResult {
    children: ParentTreeResult[];
    id: string;
    item: {
      code: string;
      type: number; // 菜单类型（字典 0目录 1菜单 2按钮）
    };
    name: string;
    pid: string;
  }

  export interface TreeDetailResult {
    id: string;
    pid: string;
    name: string;
    item: {
      /** 编码 */
      code: string;
      /** 名称 */
      name: string;
      /** 权限标识 */
      permission: string;
      /** 父id */
      pid: string;
      /** 备注 */
      remark: string;
      /** 排序 */
      sort: number;
      /** 菜单类型（字典 0目录 1菜单 2按钮） */
      type: number;
      /** 是否可见（Y-是，N-否） */
      visible: string;
    };
    children: TreeDetailResult[];
  }

  export type TreeResult = Omit<TreeDetailResult, 'item'>;

  export interface SaveParams {
    pid: string;
    /** 名称 */
    name: string;
    /** 编码 */
    code: string;
    /** 菜单类型（字典 0目录 1菜单 2按钮） */
    type: number;
    /** 权限标识		false	 */
    permission: string;
    /** 是否可见（Y-是，N-否） */
    visible: string;
    /** 排序 */
    sort: number;
    /** 备注 */
    remark: string;
  }

  export interface UpdateParams extends SaveParams {
    id: string;
  }
}

export const SysMenuApi = {
  /** 获取系统菜单树（无详情信息） */
  tree() {
    return requestClient.get<SysMenuType.TreeResult[]>('/sysMenu/tree');
  },

  /** 获取系统菜单树（详情） */
  treeDetail() {
    return requestClient.get<SysMenuType.TreeDetailResult[]>(
      '/sysMenu/treeDetail',
    );
  },

  /** 选择父节点菜单树 */
  parentTree() {
    return requestClient.get<SysMenuType.ParentTreeResult[]>(
      '/sysMenu/parentTree',
    );
  },

  /** 新增 */
  save(data: Record<string, any> | SysMenuType.SaveParams) {
    return requestClient.post('/sysMenu/save', data);
  },

  /** 新增 */
  update(data: Record<string, any> | SysMenuType.UpdateParams) {
    return requestClient.post('/sysMenu/update', data);
  },

  /** 更新状态 */
  visible(id: string, visible: string) {
    return requestClient.post('/sysMenu/visible', { id, visible });
  },

  /** 排序 */
  sort(id: string, sort: number) {
    return requestClient.post('/sysMenu/sort', { id, sort });
  },

  /** 删除 */
  delete(id: string) {
    return requestClient.post('/sysMenu/delete', { id });
  },
};
