import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../resources/js/components/**/*.stories.@(js|jsx|ts|tsx)",
    '../resources/js/components/**/stories/*.stories.@(js|jsx|ts|tsx)',
    // "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  "addons": [],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  // viteFinal: async (config) => {
  //   return mergeConfig(config, {
  //     css: {
  //       modules: {
  //         // 👇 オプションを明示しておくと安心
  //         localsConvention: 'camelCase',
  //       }
  //     }
  //   })
  // },
};
export default config;
