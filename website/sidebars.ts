import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/initialization',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      items: [
        'components/map',
        'components/marker',
        'components/polyline',
        'components/polygon',
        'components/arrow',
      ],
    },
    {
      type: 'category',
      label: 'Hooks',
      collapsed: false,
      items: ['hooks/use-routing'],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/here-config',
        'api/calculate-route',
        'api/types',
      ],
    },
  ],
};

export default sidebars;
