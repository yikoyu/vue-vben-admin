<!-- eslint-disable no-unused-vars -->
<script lang="ts" setup>
import type { DataNode, TreeProps } from 'ant-design-vue/es/tree';

import { computed, ref } from 'vue';

import { TreeRelation } from '@vben/utils';

import { Checkbox, Tree } from 'ant-design-vue';

const props = withDefaults(
  defineProps<{
    /** （受控）选中复选框的树节点 */
    checkedKeys:
      | number[]
      | string
      | string[]
      | { checked: number[] | string[]; halfChecked: number[] | string[] };

    /** treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） */
    treeData: DataNode[];
  }>(),
  {},
);

const emits = defineEmits<{
  (event: 'update:checkedKeys', keys: number[] | string[]): void;
}>();

enum ToolbarEnum {
  SELECT_ALL,
  UN_SELECT_ALL,
  EXPAND_ALL,
  UN_EXPAND_ALL,
  CHECK_STRICTLY,
  CHECK_UN_STRICTLY,
}

const selectAll = ref(false);
const expandAll = ref(false);
const checkStrictly = ref(true);
const expandedKeys = ref<string[]>([]);

const innerCheckedKeys = computed(() => {
  if (typeof props.checkedKeys === 'string') {
    return [];
  }

  return TreeRelation.getCheckedKeys(
    props.treeData,
    props.checkedKeys as any[],
  );
});

const relation = computed(() => {
  return TreeRelation.getTreeRelation(props.treeData);
});

const onCheck: TreeProps['onCheck'] = (_event, { halfCheckedKeys = [] }) => {
  emits('update:checkedKeys', [...(_event as any[]), ...halfCheckedKeys]);
};

function onToolbarActions(action: ToolbarEnum) {
  switch (action) {
    case ToolbarEnum.CHECK_STRICTLY: {
      checkStrictly.value = true;
      break;
    }
    case ToolbarEnum.CHECK_UN_STRICTLY: {
      checkStrictly.value = false;
      break;
    }
    case ToolbarEnum.EXPAND_ALL: {
      expandedKeys.value = relation.value.parentKeys;
      break;
    }
    case ToolbarEnum.SELECT_ALL: {
      emits('update:checkedKeys', [
        ...relation.value.childrenKeys,
        ...relation.value.parentKeys,
      ]);
      break;
    }
    case ToolbarEnum.UN_EXPAND_ALL: {
      expandedKeys.value = [];
      break;
    }
    case ToolbarEnum.UN_SELECT_ALL: {
      emits('update:checkedKeys', []);
      break;
    }
  }
}

function onChangeExpandAll() {
  expandAll.value
    ? onToolbarActions(ToolbarEnum.EXPAND_ALL)
    : onToolbarActions(ToolbarEnum.UN_EXPAND_ALL);
}

function onChangeSelectAll() {
  selectAll.value
    ? onToolbarActions(ToolbarEnum.SELECT_ALL)
    : onToolbarActions(ToolbarEnum.UN_SELECT_ALL);
}
</script>

<template>
  <div>
    <div class="pb-2 pl-6">
      <Checkbox v-model:checked="expandAll" @change="onChangeExpandAll">
        展开/折叠
      </Checkbox>
      <Checkbox v-model:checked="selectAll" @change="onChangeSelectAll">
        全选/全不选
      </Checkbox>
      <Checkbox v-model:checked="checkStrictly">父子联动</Checkbox>
    </div>

    <Tree
      v-bind="$attrs"
      :tree-data="treeData"
      :checked-keys="innerCheckedKeys"
      v-model:expanded-keys="expandedKeys"
      :check-strictly="!checkStrictly"
      @check="onCheck"
    />
  </div>
</template>

<!-- <style lang="scss" scoped></style> -->
