import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Employee',
    url: '/employee',
    icon: 'cil-user',
    children: [
      {
        name: 'Employee List',
        url: '/employee/employee_list',
        icon: 'cil-people'
      }
    ]
  },
  {
    divider: true
  }
];
