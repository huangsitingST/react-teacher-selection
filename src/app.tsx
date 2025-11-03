import '@/assets/less/tailwind.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import React from 'react';
import './assets/less/index.less';
// import {useSelector} from 'umi';

dayjs.locale('zh-cn');

export function rootContainer(container: React.ReactNode) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Layout: {
            bodyBg: 'var(--primary-color)',
            headerBg: '#fff',
            siderBg: '#28333e',
          },
          Menu: {
            itemBg: '#28333e',
            colorText: '#fff',
            itemActiveBg: '#e6f4ff',
            itemSelectedBg: '#7c8faa',
            itemSelectedColor: '#fff',
          },
        },
      }}
    >
      {container}
    </ConfigProvider>
  );
}

export function onRouteChange({
  matchedRoutes,
  location,
  routes,
  action,
}: {
  matchedRoutes: any;
  location: any;
  routes: any;
  action: any;
}) {
  console.log('路由监听', matchedRoutes, location, routes, action);
  document.title = '12';
}
(window as any).onRouteChange = onRouteChange;

// src/app.tsx  （Umi 4 / 插件 initial-state）
// export async function getInitialState() {
//   // 真实项目里换成你的请求
//   useSelector()
//   const currentUser = await Promise.resolve({ id: 'u1', role: 'admin' });
//   return { currentUser };
// }
