import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba_tecnica_velaio';
  public mostrarContenido = true;

  constructor(private router: Router) {
    // Subscribe to router events
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)  // Type guard explícito
    ).subscribe((event) => {
      this.mostrarContenido = event.url !== '/gestion-tareas';  // Cambia la condición según sea necesario
    });
  }
}
