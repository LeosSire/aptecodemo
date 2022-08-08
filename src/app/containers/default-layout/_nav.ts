import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Table View',
    url: '/dashboard',
  },
  {
    name: 'Chart View',
    url: '/charts',
    badge: {
      color: 'info',
      text: 'Coming soon'
    },
    children: []
  },
];
