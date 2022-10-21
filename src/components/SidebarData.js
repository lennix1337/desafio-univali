import React from 'react';
import ListIcon from '@mui/icons-material/List';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const SidebarData = [
  {
    title: 'Listagem',
    path: '/',
    icon: <ListIcon />,
    cName: 'nav-text'
  },
  {
    title: 'Cadastro',
    path: '/cadastro',
    icon: <AppRegistrationIcon />,
    cName: 'nav-text'
  },
];
