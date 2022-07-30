import { defineConfig } from 'dumi';
import { nav } from './config';

export default defineConfig({
  title: 'logic-flow-react',
  favicon: '/logo.jpg',
  logo: '/logo.jpg',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: nav,
});
