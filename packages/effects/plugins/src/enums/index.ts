import { BaseEnum } from './_utils';

/** 菜单类型 */
export class MenuType extends BaseEnum {
  static override V = {
    /** 0-目录 */
    CATALOG: 0,
    /** 1-菜单 */
    MENU: 1,
    /** 2-按钮 */
    BUTTON: 2,
  };

  /** 定义枚举映射 */
  static override E = {
    [MenuType.V.CATALOG]: '目录',
    [MenuType.V.MENU]: '菜单',
    [MenuType.V.BUTTON]: '按钮',
  };
}

export class AccountStatus extends BaseEnum {
  static override V = {
    /** 0-启用 */
    ENABLED: 0,
    /** 1-停用 */
    DISABLED: 1,
  };

  /** 定义枚举映射 */
  static override E = {
    [AccountStatus.V.ENABLED]: '启用',
    [AccountStatus.V.DISABLED]: '停用',
  };
}
