<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';
import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { SysRoleType } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Popconfirm } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { SysMenuApi, SysRoleApi } from '#/api';

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '角色名',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: false,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeTableGridOptions<SysRoleType.PageResult> = {
  columns: [
    { field: 'id', title: '角色ID' },
    { field: 'name', title: '角色名' },
    { field: 'remark', title: '角色描述' },
    { field: 'userCnt', title: '管理员数量' },
    {
      title: '操作',
      field: 'action',
      slots: { default: 'action' },
    },
  ],
  align: 'left',
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      async query(params, formValues) {
        return await SysRoleApi.page({
          pageSize: params.page.pageSize,
          pageNo: params.page.currentPage,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    refresh: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    formItemClass: 'col-span-1',
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
      fieldName: 'name',
      label: '角色名',
      rules: 'required',
      component: 'Input',
    },
    {
      fieldName: 'remark',
      label: '角色描述',
      component: 'Textarea',
    },
    {
      fieldName: 'grantMenuIdList',
      label: '角色权限',
      rules: 'required',
      defaultValue: [],
      component: 'ApiTree',
      componentProps: {
        api: SysMenuApi.tree,
        childrenField: 'children',
        labelField: 'name',
        valueField: 'id',
        checkable: true,
        checkStrictly: false,
      },
    },
  ],
  wrapperClass: 'grid-cols-1',
  handleSubmit: onHandleSubmit,
});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  class: 'w-[600px]',
  confirmText: '提交',
  cancelText: '取消',
  onConfirm: formApi.validateAndSubmitForm,
  async onOpenChange(isOpen) {
    !isOpen && formApi.resetForm();
  },
});

async function openFormDialog(data?: Record<string, any>) {
  if (data?.id) {
    const grantMenuIdList = await SysRoleApi.ownMenu(data.id);
    formApi.setValues({ grantMenuIdList, ...data }, false);
  }

  modalApi.setState({ title: `${data ? '修改' : '新增'}菜单` }).open();
}

async function onHandleSubmit(values: Record<string, any>) {
  const hide = message.loading('正在提交中...', 0);
  modalApi.lock();

  const data: SysRoleType.AddOrEditData = {
    id: values.id,
    grantMenuIdList: values.grantMenuIdList,
    name: values.name,
    remark: values.remark,
  };

  try {
    await (data.id ? SysRoleApi.edit(data) : SysRoleApi.add(data));

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
    await SysRoleApi.delete(values.id);

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
        <Button size="small" type="primary" @click="openFormDialog()">
          新增
        </Button>
      </template>

      <template #action="{ row }">
        <Button type="link" size="small" @click="openFormDialog(row)">
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
