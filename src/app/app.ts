import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickMortyService, Personaje, Episodio } from './services/rick-morty';
@Component({selector:'app-root',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./app.html',styleUrl:'./app.css'})
export class App implements OnInit {
  private api = inject(RickMortyService);
  usuario=''; password=''; autenticado=false; error=''; cargando=false;
  personajes: Personaje[]=[]; episodios: Episodio[]=[];
  detallePersonaje: Personaje | null=null; detalleEpisodio: Episodio | null=null;
  personajesEpisodio: Personaje[]=[]; paginaPersonajes=1; paginaEpisodios=1;
  ngOnInit() {}
  login() { this.error=''; if(this.usuario.trim()==='administrador' && this.password==='123456'){this.autenticado=true;this.cargarDatos();}else{this.error='Usuario o contraseña incorrectos';} }
  cargarDatos(){this.cargarPersonajes();this.cargarEpisodios();}
  cargarPersonajes(){this.api.getPersonajes(this.paginaPersonajes).subscribe({next:d=>this.personajes=d.results,error:()=>this.error='No se pudieron cargar los personajes'});}
  cargarEpisodios(){this.api.getEpisodios(this.paginaEpisodios).subscribe({next:d=>this.episodios=d.results,error:()=>this.error='No se pudieron cargar los episodios'});}
  cambiarPagina(tipo:'personajes'|'episodios',paso:number){if(tipo==='personajes'){this.paginaPersonajes=Math.max(1,Math.min(42,this.paginaPersonajes+paso));this.cargarPersonajes();}else{this.paginaEpisodios=Math.max(1,Math.min(3,this.paginaEpisodios+paso));this.cargarEpisodios();}}
  verPersonaje(id:number){this.error='';this.api.getPersonaje(id).subscribe({next:p=>{this.detallePersonaje=p;this.detalleEpisodio=null;},error:()=>this.error='No se pudo cargar el personaje'});}
  verEpisodio(id:number){this.error='';this.api.getEpisodio(id).subscribe({next:e=>{this.detalleEpisodio=e;this.detallePersonaje=null;this.personajesEpisodio=[];const ids=e.characters.map(url=>Number(url.split('/').pop())).filter(Boolean);if(ids.length){this.api.getPersonajesPorIds(ids).subscribe({next:p=>this.personajesEpisodio=Array.isArray(p)?p:[p],error:()=>this.error='No se pudieron cargar los personajes del episodio'});}},error:()=>this.error='No se pudo cargar el episodio'});}
  volver(){this.detallePersonaje=null;this.detalleEpisodio=null;this.error='';}
  salir(){this.autenticado=false;this.volver();this.usuario='';this.password='';}
}
