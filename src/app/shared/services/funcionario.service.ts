import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse, Paginacao } from '../models/response.interface';
import { FuncionarioCreate, FuncionarioList, FuncionarioUpdate } from '../models/funcionario.interface';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  apiUrl = environment.urlApi;

  constructor(private http: HttpClient) {}

  getFuncionarios(skip: number, take: number): Observable<AppResponse<Paginacao<FuncionarioList>>> {
    return this.http.get<AppResponse<Paginacao<FuncionarioList>>>(`${this.apiUrl}?skip=${skip}&take=${take}`);
  }

  deleteFuncionario(id: string): Observable<AppResponse<FuncionarioList>> {
    return this.http.delete<AppResponse<FuncionarioList>>(`${this.apiUrl}?id=${id}`);
  }

  postFuncionario(funcionario: FuncionarioCreate): Observable<AppResponse<FuncionarioCreate>> {
    return this.http.post<AppResponse<FuncionarioCreate>>(`${this.apiUrl}`, funcionario);
  }

  putFuncionario(funcionarioId: FuncionarioUpdate): Observable<AppResponse<FuncionarioList>> {
    return this.http.put<AppResponse<FuncionarioList>>(`${this.apiUrl}`, funcionarioId);
  }

  getFuncionarioById(id: string): Observable<AppResponse<FuncionarioList>> {
    return this.http.get<AppResponse<FuncionarioList>>(`${this.apiUrl}/${id}`);
  }
}
