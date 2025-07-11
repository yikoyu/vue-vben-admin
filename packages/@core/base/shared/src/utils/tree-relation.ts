// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TreeRelation {
  private static TREE_CHILDREN_FIELD_KEY = 'children' as const;
  private static TREE_LABEL_FIELD_KEY = 'label' as const;
  private static TREE_VALUE_FIELD_KEY = 'value' as const;

  static getCheckedKeys(data: any[] = [], value: (number | string)[] = []) {
    const { parentKeys } = this.getTreeRelation(data);
    return value.filter((v) => !parentKeys.includes(v.toString()));
  }

  static getTreeRelation(data: any[] = []) {
    const relation: Record<string, any> = this.getChildrenAllIds(data);
    // eslint-disable-next-line unicorn/no-array-reduce
    const relationKey = Object.entries(relation).reduce(
      (acc, [key, value]) => {
        acc[key] = (value as any[]).map(
          (item) => item[this.TREE_VALUE_FIELD_KEY],
        );
        return acc;
      },
      {} as Record<string, any>,
    );
    const allNodes = this.getFlattenTree(data, relation);

    const parentKeys = Object.keys(relation).filter(
      (key) => relation[key].length > 0,
    );
    const parents = parentKeys.map((k) => allNodes[k]);

    const childrenKeys = Object.keys(relation).filter(
      (key) => relation[key].length === 0,
    );
    const childrens = childrenKeys.map((k) => allNodes[k]);

    return {
      allNodes,
      parentKeys,
      parents,
      relation,
      relationKey,
      childrenKeys,
      childrens,
    };
  }

  /**
   * @description: 伏羲树形列表子父级别关系
   * @param {*} treeData
   * @param {*} parentIds
   * @param {*} node
   */
  private static getChildrenAllIds(
    treeData: any[],
    parentIds: (number | string)[] = [],
    node: any = {},
  ) {
    for (const item of treeData) {
      const key = item[this.TREE_VALUE_FIELD_KEY];

      for (const pitem of parentIds) {
        if (!Array.isArray(node[pitem])) node[pitem] = [];

        node[pitem].push(item);
      }

      if (
        item[this.TREE_CHILDREN_FIELD_KEY] &&
        item[this.TREE_CHILDREN_FIELD_KEY].length > 0
      ) {
        this.getChildrenAllIds(
          item[this.TREE_CHILDREN_FIELD_KEY],
          [...parentIds, key],
          node,
        );
      } else {
        node[key] = [];
      }
    }

    return node;
  }

  /**
   * @description: 树形转列表
   * @param {*} treeData
   * @param {*} relation
   * @param {*} parents
   * @param {*} node
   */
  private static getFlattenTree(
    treeData: any[],
    relation: Record<string, any>,
    parents: any[] = [],
    node: any = {},
  ) {
    for (const item of treeData) {
      node[item[this.TREE_VALUE_FIELD_KEY]] = {
        ...item,
        _parentNames: parents.map(
          (parent) => parent[this.TREE_LABEL_FIELD_KEY],
        ),
        _parents: parents,
        _children: relation[item[this.TREE_VALUE_FIELD_KEY]] || [],
      };

      if (
        item[this.TREE_CHILDREN_FIELD_KEY] &&
        item[this.TREE_CHILDREN_FIELD_KEY].length > 0
      ) {
        this.getFlattenTree(
          item[this.TREE_CHILDREN_FIELD_KEY],
          relation,
          [...parents, item],
          node,
        );
      }
    }

    return node;
  }
}
