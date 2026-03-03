import { registerMicroApps, start } from 'qiankun';

export function registerQiankunApps() {
  registerMicroApps([
    {
      name: 'subapp-vue',
      entry: '//localhost:8001/',
      container: '#subapp-content',
      activeRule: '/subapp-vue',
      props: { baseName: '/subapp-vue' },
    },
  ]);
  // setDefaultMountApp('vbenApp');
  start({ sandbox: { strictStyleIsolation: true } });
}
