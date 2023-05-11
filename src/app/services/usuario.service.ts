import { Observable, EMPTY, map, catchError } from 'rxjs';
import { Usuario } from '../models/Usuario.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = '/api/users?page'

  constructor(private HttpClient: HttpClient) { }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.url,usuario).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  getAllUsers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  getUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/${id}`).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.url}/${usuario.id}`,usuario).pipe (
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  delete(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url}/${id}`).pipe (
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  exibirErro(erro: any): Observable<any> {
    alert('Algo de errado aconteceu')
    console.log(erro);
    return EMPTY;
  }
}
