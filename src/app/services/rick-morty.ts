import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Personaje { id: number; name: string; image: string; status: string; species: string; gender: string; }
export interface Episodio { id: number; name: string; episode: string; air_date: string; characters: string[]; }
interface Pagina<T> { info: { next: string | null }; results: T[]; }
@Injectable({ providedIn: 'root' })
export class RickMortyService {
  private http = inject(HttpClient);
  private api = 'https://rickandmortyapi.com/api';
  getPersonajes(page = 1) { return this.http.get<Pagina<Personaje>>(`${this.api}/character?page=${page}`); }
  getPersonaje(id: number) { return this.http.get<Personaje>(`${this.api}/character/${id}`); }
  getEpisodios(page = 1) { return this.http.get<Pagina<Episodio>>(`${this.api}/episode?page=${page}`); }
  getEpisodio(id: number) { return this.http.get<Episodio>(`${this.api}/episode/${id}`); }
  getPersonajesPorIds(ids: number[]) { return this.http.get<Personaje | Personaje[]>(`${this.api}/character/${ids.join(',')}`); }
}
