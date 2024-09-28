import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConsumoService } from '../api-consumo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-tareas',
  templateUrl: './gestion-tareas.component.html',
  styleUrls: ['./gestion-tareas.component.css']
})
export class GestionTareasComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiConsumoService){
  }

  ngOnInit(): void {
    this.getObjetos();

    //Manejo de fechas
    let today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const day = String(today.getDate()).padStart(2, '0');
    this.today = `${year}-${month}-${day}`;
    //Para no permitir poner fecha límite, antes de la fecha de hoy.
    const inputFecha: HTMLInputElement | null = document.getElementById('fecha_limite') as HTMLInputElement;
    if(inputFecha){
      inputFecha.setAttribute('min', this.today);
    }
    
  }
  items: any[] = [];  
  temporal: any=[];
  objeto_habilidades: any = [];
  objeto_personas: any = [];
  posicion: number = 0;
  posicionPersona: number = 0;
  filtro: string | any;
  title: string | any;
  description: string | any;
  fecha_limite: any;
  nombre_completo: any;
  edad: any;
  habilidad: any;
  tareas = [
    { title: 'Entregar la prueba',
      description: 'Entregar la prueba',
      fecha_limite: '2024-09-30',
      completed: false,
      objeto_personas: [{
        nombre_completo: 'Santiago Rojas',
        edad: '28'
      }],
      objeto_habilidades: [
        {
        nombre_habilidad: 'TypeScript',
        },
        {
        nombre_habilidad: 'Ionic framework',
        }
    ],
    }
  ]
  tareasCopy: any;
  today: any;

  getObjetos(){
    this.apiService.getItems().subscribe(
      (data) => {
        this.items = data; 
        this.tareasCopy = this.tareas;
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    );
  };

  //Valida que los campos no estén vacíos
  validarCamposNulos(){
    this.objeto_personas.forEach((element: any) => {
      if(element.nombre_completo.length<5){
        Swal.fire("El nombre debe tener mínimo 5 caracteres!", "", "error");
        return;
      }else if(element.edad<18){
        Swal.fire("No puede ser menor de edad", "", "error");
        return;
      }
    });
    if(this.title==='' || this.title === undefined || this.title === null){
      Swal.fire("Debe diligenciar el campo del título!", "", "error");
      return;
    }else if(this.description==='' || this.description === undefined || this.description === null){
      Swal.fire("Debe diligenciar el campo descripción!", "", "error");
      return;
    }else if(this.fecha_limite==='' || this.fecha_limite === undefined || this.fecha_limite === null){
      Swal.fire("Debe diligenciar el campo fecha límite!", "", "error");
      return;
    }else if(this.objeto_personas==='' || this.objeto_personas === undefined || this.objeto_personas === null || this.objeto_personas.length<1){
      Swal.fire("Debe diligenciar la información de las personas a cargo.", "", "error");
      return;
    }else if(this.objeto_habilidades==='' || this.objeto_habilidades === undefined || this.objeto_habilidades === null || this.objeto_habilidades.length<1){
      Swal.fire("Debe diligenciar la información de las habilidades.", "", "error");
      return;
    }else{
      let title = this.title;
      let description = this.description;
      let fecha_limite = this.fecha_limite;
      let objeto_personas = this.objeto_personas;
      let objeto_habilidades = this.objeto_habilidades;
      this.newObject({title, description, fecha_limite, objeto_personas, objeto_habilidades});
    }
  }
  //Guardar un objeto en el array de tareas
  async newObject(datos: any = []){
    this.tareas.push(datos);
    console.log(this.tareas);
    this.title = null;
    this.description = null;
    this.fecha_limite = null;
    this.objeto_personas = null;
    this.filtro = undefined;
  };

  //Filtro de tareas
  filtrar(){
    if(this.filtro === 'completadas'){
      this.tareas = this.tareasCopy;
      this.tareas = this.tareasCopy.filter((tarea: any) => {
        return tarea.completed == true;
      });
    }else if(this.filtro === 'pendiente'){
      this.tareas = this.tareasCopy;
      this.tareas = this.tareasCopy.filter((tarea: any) => {
        return tarea.completed != true;
      });
    }
  };

  //Retirar el filtro seleccionado
  quitarFiltro(){
    this.tareas = this.tareasCopy;
    this.filtro = undefined;
  };

  //Marcar la tarea como completada
  completarTarea(tarea: any){
    if(!tarea.completed){
      Swal.fire({
        title: "¿Está seguro de desmarcar esta tarea? se cancelara el estado terminado.",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Acepto",
        denyButtonText: `No acepto`,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          tarea.completed = false;
          Swal.fire("¡La tarea queda en estado pendiente!", "", "info");
        } else if (result.isDenied) {
          tarea.completed = true;
          Swal.fire("Cancelado", "", "info");
        }
      });
    }else{
      Swal.fire({
        title: "¿Está seguro de marcar esta tarea como terminada?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Acepto",
        denyButtonText: `No acepto`,
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          tarea.completed = true;
          Swal.fire("¡Se ha finalizado esta tarea satisfactoriamente!", "", "success");
        } else if (result.isDenied) {
          tarea.completed = false;
          Swal.fire("Cancelado", "", "info");
        }
      });
    }
  };

  //Añade un campo para agregar habilidades, va ascendentemente
  async agregarHabilidad() {
    var item = {
      posicion: this.posicion,
    };
    this.posicion++;
    this.objeto_habilidades.push(item);
    this.posicion++;
  };

  async agregarPersona() {
    var item = {
      posicion: this.posicionPersona,
    };
    this.posicionPersona++;
    this.objeto_personas.push(item);
    this.posicionPersona++;
  };

  //Elimina uno de los campos de habilidad.
  eliminarCampoHabilidad(item: any){
      var i = this.objeto_habilidades.indexOf(item);
      this.objeto_habilidades.splice(i, 1);
  };
  eliminarCampoPersona(item: any){
      var i = this.objeto_personas.indexOf(item);
      this.objeto_personas.splice(i, 1);
  };

  asignarTemporal(temporal: any){
    this.temporal = temporal;
    console.log(this.temporal);
  }
  limpiarTemporal(){
    this.temporal = [];
  }
}
