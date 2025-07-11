<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { UserAccountType } from '#/api';

import { Page, useVbenModal } from '@vben/common-ui';
import { AccountStatus } from '@vben/plugins/enums';

import { Button, message, Popconfirm } from 'ant-design-vue';

import { useVbenForm, z } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { SysRoleApi, UserAccountApi } from '#/api';

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'nickName',
      label: '用户名',
    },
    {
      component: 'Input',
      fieldName: 'bindPhone',
      label: '手机号',
    },
    {
      component: 'ApiSelect',
      fieldName: 'roleId',
      label: '角色',
      componentProps: {
        api: SysRoleApi.list,
        valueField: 'id',
        labelField: 'name',
      },
    },
    {
      component: 'Select',
      fieldName: 'accountState',
      label: '启用状态',
      componentProps: {
        options: AccountStatus.getList(),
      },
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 是否在字段值改变时提交表单
  submitOnChange: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeTableGridOptions<UserAccountType.QueryByPageResult> = {
  columns: [
    { field: 'userId', title: '管理员ID' },
    { field: 'nickName', title: '用户名' },
    { field: 'bindPhone', title: '手机号' },
    {
      field: 'roles',
      title: '角色',
      formatter: ({ cellValue }) => {
        return cellValue.map((k: Record<string, any>) => k.name).join(', ');
      },
    },
    {
      field: 'accountState',
      title: '启用状态',
      cellRender: {
        name: 'CellSwitch',
        props: {
          checkedValue: 0,
          checkedChildren: '启用',
          unCheckedValue: 1,
          unCheckedChildren: '停用',
        },
        events: {
          onChange: async ({ row }) =>
            UserAccountApi.status(row.userId as string, row.accountState),
        },
      },
    },
    {
      title: '操作',
      field: 'action',
      minWidth: 150,
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
        return await UserAccountApi.queryByPage({
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
      fieldName: 'nickName',
      label: '用户名',
      rules: 'required',
      component: 'Input',
      componentProps: {
        maxlength: 20,
      },
    },
    {
      fieldName: 'bindPhone',
      label: '手机号',
      rules: 'required',
      component: 'Input',
      componentProps: {
        maxlength: 11,
      },
    },
    {
      fieldName: 'roleIds',
      label: '选择角色',
      rules: 'required',
      component: 'ApiSelect',
      componentProps: {
        api: SysRoleApi.list,
        labelField: 'name',
        valueField: 'id',
        mode: 'multiple',
      },
    },
    {
      fieldName: 'accPwd',
      label: '登录密码',
      rules: z.string().refine(
        (val) => {
          const regex =
            /^(?!\d+$)(?![a-z]+$)(?![A-Z]+$)(?![!@#$%^&*?.]+$)[\dA-Za-z!@#$%&*?.]{8,16}$/;
          return regex.test(val);
        },
        {
          message: '密码为8-16位，至少包含两种英文大小写、数字、特殊字符',
        },
      ),
      component: 'Input',
      componentProps: {
        maxlength: 16,
        visible: true,
      },
      dependencies: {
        if(values) {
          return !values.userId;
        },
        triggerFields: ['userId'],
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
  onOpenChange(isOpen) {
    !isOpen && formApi.resetForm();
  },
});

async function openFormDialog(data?: UserAccountType.QueryByPageResult) {
  if (data?.userId) {
    formApi.setValues(
      {
        roleIds: data?.roles?.map((k) => k.id),
        ...data,
      },
      false,
    );
  }

  modalApi.setState({ title: `${data ? '修改' : '新增'}管理员` }).open();
}

async function onHandleSubmit(values: Record<string, any>) {
  const hide = message.loading('正在提交中...', 0);
  modalApi.lock();

  const data: UserAccountType.SaveOrUpdateData = {
    userId: values.userId,
    accPwd: values.accPwd || undefined,
    bindPhone: values.bindPhone,
    nickName: values.nickName,
    roleIds: values?.roleIds || [],
  };

  try {
    await (data.userId
      ? UserAccountApi.update(data)
      : UserAccountApi.save(data));

    hide();
    message.success('提交成功');
    modalApi.close();
    gridApi.reload();
  } catch {
    modalApi.setState({ submitting: false });
  }
}

async function onHandleDelete(values: UserAccountType.QueryByPageResult) {
  const hide = message.loading('正在提交中...', 0);
  try {
    await UserAccountApi.delete(values.userId as string);

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

        <Button type="link" size="small"> 重置密码 </Button>

        <Popconfirm
          :title="`是否确认删除 ${row.nickName} ？`"
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
