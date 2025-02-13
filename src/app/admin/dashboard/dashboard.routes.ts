import {Routes} from '@angular/router';


const dashboardRoutes:Routes=[
  {
    path:'users',
    loadComponent:()=>import('../user/user.component').then(u=>u.UserComponent),
    pathMatch:'full'
  },{
    path:'roles',
    loadComponent:()=>import('../role/role.component').then(r=>r.RoleComponent),
    pathMatch:'full'
  },{
    path:'groups',
    loadComponent:()=>import('../group/group.component').then(g=>g.GroupComponent),
    pathMatch:'full'
  }
]

export default dashboardRoutes;
