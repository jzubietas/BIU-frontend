import { MenuItem } from './menu.model';

export const MENUFadmin: MenuItem[] = [
    {
        id: 1,
        label: 'Home',
        icon: 'fas fa-home',
        subItems: [
            {
                id: 2,
                label: 'Inicio',
                link: '/fadmin',
                icon: 'fas fa-home',
                parentId: 1
            },
        ]
    },
    {
        id: 2,
        label: 'Configuraciones',
        icon: 'fal fa-gem',
        subItems: [
            {
                id: 3,
                label: 'Usuarios',
                link: '/dashboard/user',
                icon: 'fas fa-user',
                parentId: 2
            },
            {
                id: 4,
                label: 'Productos',
                link: '/dashboard/product',
                icon: 'fas fa-shopping-cart',
                parentId: 2
            },
        ]
    },
];

