import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importar el Router
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
constructor(private router: Router){
  console.log(this.router.routerState.snapshot.url);
  console.log(AppComponent);
}
  public variable: string = 'Ahora si la prueba';

  irGestionTareas(){
    this.router.navigate(['/gestion-tareas']);
  }

}
