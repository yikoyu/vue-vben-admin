# CODEX.md

This file provides guidance to Codex (OpenAI Codex CLI) when working in this repository.

## 语言要求

- 所有回复使用中文。
- 默认使用简体中文，保留代码与命令原样。

## 工作方式

- 先读后改：改动前先定位相关文件与上下文，避免全局大改。
- 以最小改动满足需求；不改无关文件。
- 优先使用 `rg`/`rg --files` 搜索。
- 需要安装依赖、运行长时任务或可能破坏性的操作前先确认。
- 遇到不确定或缺少信息时，提出简洁问题确认。

## 项目概览

- 这是 Vue Vben Admin v5.x 的 pnpm monorepo，使用 Turborepo。
- 应用目录：`apps/`（web-antd、web-antdv-next、web-ele、web-naive、web-tdesign 等）。
- 公共包：`packages/`（@core、effects、stores、locales、icons、styles、utils 等）。
- 构建/内部工具：`internal/`，脚本在 `scripts/`。

## 常用命令

### 开发

```bash
pnpm dev
pnpm dev:antdv-next
```

### 构建

```bash
pnpm build
pnpm build:antd
pnpm build:ele
pnpm build:naive
pnpm build:analyze
```

### 代码检查与格式化

```bash
pnpm lint
pnpm format
pnpm check:type
```

### 测试

```bash
pnpm test:unit
pnpm test:e2e
pnpm vitest run --dom packages/stores/src/modules/access.test.ts
```

## 代码约定

- Vue 相关默认使用 Composition API + `<script setup>` + TypeScript。
- 组件样式优先使用现有约定（Tailwind/SCSS），避免引入新依赖。
- 路由、Store、i18n 优先复用已有封装与工具包。

## 提交规范

- `type(scope): subject`，type 参考：feat/fix/docs/style/refactor/perf/test/workflow/build/ci/chore/types/wip
- 推荐使用 `pnpm commit` 交互式提交。

## 环境要求

- Node.js >= 20.19.0
- pnpm >= 10.0.0
