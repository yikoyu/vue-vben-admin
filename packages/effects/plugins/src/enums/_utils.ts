// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class BaseEnum {
  /** 枚举映射表 */
  protected static E: Record<number, string>;

  /** 值转换映射表 */
  protected static V: Record<number, number | string>;

  /** 获取枚举列表（通用实现） */
  static getList() {
    return Object.keys(this.E).map((key) => ({
      label: this.E[Number(key)],
      value: Number(key),
    }));
  }
}
