import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'react-native-here-explore',
  tagline: 'Integrate HERE Maps into React Native',
  favicon: 'img/favicon.ico',

  url: 'https://ajakka.github.io',
  baseUrl: '/react-native-here-explore/',

  organizationName: 'ajakka',
  projectName: 'react-native-here-explore',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/ajakka/react-native-here-explore/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'react-native-here-explore',

      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/ajakka/react-native-here-explore',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/react-native-here-explore',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/intro' },
            { label: 'Components', to: '/docs/components/map' },
            { label: 'Hooks', to: '/docs/hooks/use-routing' },
            { label: 'API Reference', to: '/docs/api/here-config' },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ajakka/react-native-here-explore',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/react-native-here-explore',
            },
            {
              label: 'HERE Platform',
              href: 'https://platform.here.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} react-native-here-explore. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'tsx', 'typescript', 'ruby', 'groovy'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
