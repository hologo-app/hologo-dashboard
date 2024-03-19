// assets
// import { Iconlenses } from '@tabler/icons-react';
import { IconBrandSnapchat } from "@tabler/icons-react";

// constant
const icons = { IconBrandSnapchat };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const lenses = {
  id: 'lenses',
  title: 'Lenses',
  type: 'group',
  children: [
    {
      id: 'lens',
      title: 'lenses',
      type: 'item',
      url: '/lenses',
      icon: icons.IconBrandSnapchat,
      breadcrumbs: false
    }
  ]
};

export default lenses;
