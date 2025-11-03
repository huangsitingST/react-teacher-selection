import path from 'path';
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes,
  npmClient: 'npm',
  extraPostCSSPlugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
  theme: {
    '@primary-color': 'black',
  },
  alias: {
    '@': path.resolve(__dirname, '../src'),
  },
  plugins: [
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/dva',
    '@umijs/plugins/dist/access',
    '@umijs/plugins/dist/initial-state',
  ],
  model: {},
  dva: {
    immer: {}, // 启用immer，让状态更新更简洁
  },
  // treeShaking: true,
  // targets: {
  //   ie: 11,
  // }
  fastRefresh: false,
  title: '名师评优',
  icons: { autoInstall: {} },
  metas: [
    { name: 'keywords', content: '名师评优' },
    { name: 'description', content: 'React framework.' },
  ],
  // vite: {},
  // clientLoader: {},
  mock: {},
  proxy: {
    // "/api": {
    // target: "https://api.example.com",
    // changeOrigin: true,
    // pathRewrite: { "^/api": "" },
    // },
  },
  // access: {},
  // initialState: {},
});
