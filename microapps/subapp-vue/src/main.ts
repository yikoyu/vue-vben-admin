/* eslint-disable no-console */
import { createApp } from 'vue';

import {
  qiankunWindow,
  renderWithQiankun,
} from 'vite-plugin-qiankun/dist/helper';

import App from './App.vue';
import { initRouter } from './router';

import './style.css';

let isInitQiankunApp = false;

// 判断是否在qiankun环境下
if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('qiankun模式');

  const app = createApp(App);

  renderWithQiankun({
    // qiankun的生命周期，挂载
    mount(props) {
      console.log('qiankun模式 mount', props.baseName);

      if (isInitQiankunApp) {
        return;
      }

      initRouter(app, props.baseName);

      // 传递的值可以获取到了
      app.mount(
        props.container
          ? (props.container.querySelector('#app') as Element)
          : '#app',
      );

      isInitQiankunApp = true;
    },
    // 应用加载
    bootstrap() {
      console.log('qiankun模式 --bootstrap');
      return Promise.resolve();
    },
    // 修改
    update(_props) {
      console.log('qiankun模式 --update');
      return Promise.resolve();
    },
    // 销毁
    unmount(_props) {
      console.log('qiankun模式 --unmount');
      app?.unmount();
      isInitQiankunApp = false;
      return Promise.resolve();
    },
  });
} else {
  const app = createApp(App);
  initRouter(app);
  app.mount('#app');
}
