import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { GestionTareasComponent } from './gestion-tareas/gestion-tareas.component';

const routes: Routes = [
  { path: 'menu-principal', component: MenuPrincipalComponent },
  { path: 'menu-principal', redirectTo: '/menu-principal', pathMatch: 'full' },
  { path: 'gestion-tareas', component: GestionTareasComponent },
  { path: 'gestion-tareas', redirectTo: '/gestion-tareas', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
