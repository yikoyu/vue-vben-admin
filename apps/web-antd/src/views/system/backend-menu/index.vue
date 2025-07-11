<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';
import type { SysMenuType } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';
import { MenuType } from '@vben/plugins/enums';

import { Button, message, Popconfirm } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { SysMenuApi } from '#/api';

const gridOptions: VxeGridProps<SysMenuType.TreeDetailResult> = {
  columns: [
    {
      title: '菜单名称',
      field: 'name',
      treeNode: true,
    },
    {
      title: '类型',
      field: 'item.type',
      width: '80px',
      formatter({ cellValue }) {
        return MenuType.E[cellValue] || '--';
      },
    },
    {
      title: '菜单编码',
      field: 'item.code',
    },
    {
      title: '接口权限',
      field: 'item.permission',
    },
    {
      title: '排序',
      field: 'item.sort',
      editRender: {
        name: 'input',
        attrs: { type: 'number' },
      },
    },
    {
      title: '是否可见',
      field: 'item.visible',
      cellRender: {
        name: 'CellSwitch',
        props: {
          checkedValue: 'Y', // 开关打开时的值
          checkedChildren: '是',
          unCheckedValue: 'N', // 开关关闭时的值
          unCheckedChildren: '否',
        },
        events: {
          onChange: async ({ row }) =>
            SysMenuApi.visible(row.id, row.item.visible),
        },
      },
    },
    {
      title: '操作',
      width: 300,
      field: 'action',
      slots: { default: 'action' },
    },
  ],
  editConfig: {
    mode: 'cell',
    trigger: 'click',
    showStatus: true,
  },
  align: 'left',
  height: 'auto',
  keepSource: true,
  pagerConfig: { enabled: false },
  treeConfig: {
    expandAll: true,
  },
  proxyConfig: {
    response: {
      result: '', // 直接使用根数据
      total: 'length', // 使用数组的 length 属性作为总条数
      list: '', // 直接使用根数据
    },
    ajax: {
      query: SysMenuApi.treeDetail,
    },
  },
  rowClassName: ({ row }) => {
    if (row?.item?.type === 1 && row?.pid !== '0') {
      return 'bg-success-200 dark:bg-success-700';
    }

    if (row?.item?.type === 2 && row?.pid !== '0') {
      return 'bg-warning-200 dark:bg-warning-700';
    }
    return '';
  },
  toolbarConfig: {
    refresh: true,
  },
};

const gridEvents: VxeGridListeners<SysMenuType.TreeDetailResult> = {
  async editClosed({ row }) {
    const hide = message.loading('正在提交中...', 0);

    await SysMenuApi.sort(row.id, row.item.sort);

    hide();
    gridApi.reload();
    message.success('更新成功');
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
  gridEvents,
});

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    formItemClass: 'col-span-2',
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 垂直布局，label和input在不同行，值为vertical
  // 水平布局，label和input在同一行
  layout: 'horizontal',
  schema: [
    {
      fieldName: 'pid',
      label: '上级目录',
      rules: 'required',
      component: 'ApiTreeSelect',
      componentProps: {
        api: async () => {
          return [
            {
              id: '0',
              name: '根目录',
              pid: null,
              children: await SysMenuApi.parentTree(),
            },
          ];
        },
        childrenField: 'children',
        labelField: 'name',
        valueField: 'id',
        showSearch: true,
        treeDefaultExpandAll: true,
      },
    },
    {
      fieldName: 'type',
      label: '菜单类型',
      rules: 'required',
      component: 'RadioGroup',
      componentProps: {
        options: MenuType.getList(),
      },
    },
    {
      fieldName: 'name',
      label: '菜单名称',
      rules: 'required',
      // rules: z.string().default('默认值').optional(),
      // rules: z.string().min(1, { message: '最少输入1个字符' }),
      // rules: z.string().email('请输入正确的邮箱'),
      component: 'Input',
    },
    {
      fieldName: 'code',
      label: '菜单编码',
      rules: 'required',
      component: 'Input',
    },
    {
      fieldName: 'permission',
      label: '接口权限',
      component: 'Input',
      dependencies: {
        triggerFields: ['type'],
        required(values) {
          return values.type === 2;
        },
      },
    },
    {
      fieldName: 'sort',
      label: '排序',
      rules: 'required',
      formItemClass: 'col-span-1',
      component: 'InputNumber',
      componentProps: {
        class: 'w-auto',
      },
      dependencies: {
        triggerFields: ['type'],
        trigger(values, form) {
          form.setFieldValue('sort', values.type === 2 ? 1 : 0);
        },
      },
    },
    {
      fieldName: 'visible',
      label: '是否可见',
      rules: 'required',
      formItemClass: 'col-span-1',
      component: 'Switch',
      componentProps: {
        class: 'w-auto',
        checkedValue: 'Y', // 开关打开时的值
        checkedChildren: '是',
        unCheckedValue: 'N', // 开关关闭时的值
        unCheckedChildren: '否',
      },
    },
    {
      fieldName: 'remark',
      label: '备注',
      component: 'Textarea',
    },
  ],
  wrapperClass: 'grid-cols-2',
  handleSubmit: onHandleSubmit,
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  class: 'w-[600px]',
  confirmText: '提交',
  cancelText: '取消',
  onConfirm: formApi.validateAndSubmitForm,
  onOpenChange(isOpen) {
    !isOpen && formApi.resetForm();
  },
});

function openFormDialog(
  mode: 'add' | 'children' | 'update' = 'add',
  data?: SysMenuType.TreeDetailResult,
) {
  const isAdd = mode === 'add';
  const isChildren = mode === 'children';
  const isUpdate = mode === 'update';

  if (isAdd) {
    formApi.setValues({
      pid: '0',
      type: 1,
      permission: '',
      sort: 0,
      visible: 'Y',
      ...data?.item,
    });
  }

  if (isChildren) {
    formApi.setValues({
      pid: data?.id,
      type: 1,
      name: '',
      code: '',
      permission: '',
      sort: 0,
      visible: 'Y',
    });
  }

  if (isUpdate) {
    formApi.setValues(
      {
        ...data,
        ...data?.item,
        name: data?.item?.name || '',
        code: data?.item?.code || '',
        permission: data?.item?.permission || '',
      },
      false,
    );
  }

  modalApi.setState({ title: isUpdate ? '修改菜单' : '新增菜单' }).open();
}

async function onHandleSubmit(values: Record<string, any>) {
  const hide = message.loading('正在提交中...', 0);
  modalApi.lock();

  try {
    await (values.id ? SysMenuApi.update(values) : SysMenuApi.save(values));

    hide();
    message.success('提交成功');
    modalApi.close();
    gridApi.reload();
  } catch {
    modalApi.setState({ submitting: false });
  }
}

async function onHandleDelete(values: Record<string, any>) {
  const hide = message.loading('正在提交中...', 0);
  try {
    await SysMenuApi.delete(values.id);

    hide();
    message.success('删除成功');
    gridApi.reload();
  } catch {
    hide();
  }
}
</script>

<template>
  <Page auto-content-height>
    <Modal>
      <Form />
    </Modal>

    <Grid>
      <template #toolbar-tools>
        <Button size="small" type="primary" @click="openFormDialog('add')">
          新增
        </Button>
      </template>

      <template #action="{ row }">
        <Button
          type="link"
          size="small"
          :disabled="row.item.type === 2"
          @click="openFormDialog('children', row)"
        >
          新增
        </Button>
        <Button type="link" size="small" :disabled="row.item.type === 2">
          复制
        </Button>
        <Button type="link" size="small" @click="openFormDialog('add', row)">
          复制到
        </Button>
        <Button type="link" size="small" @click="openFormDialog('update', row)">
          修改
        </Button>

        <Popconfirm
          :title="`是否确认删除 ${row.name} ？`"
          placement="topRight"
          @confirm="onHandleDelete(row)"
        >
          <Button type="link" size="small" danger> 删除 </Button>
        </Popconfirm>
      </template>
    </Grid>
  </Page>
</template>

<!-- <style lang="scss" scoped></style> -->
