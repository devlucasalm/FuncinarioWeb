import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse } from '../models/response.interface';
import { FuncionarioCreate, FuncionarioList } from '../models/funcionario.interface';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  apiUrl = environment.urlApi;

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<AppResponse<FuncionarioList[]>> {
    return this.http.get<AppResponse<FuncionarioList[]>>(`${this.apiUrl}`);
  }

  deleteFuncionario(id: string): Observable<AppResponse<FuncionarioList>> {
    return this.http.delete<AppResponse<FuncionarioList>>(`${this.apiUrl}?id=${id}`);
  }

  postFuncionario(funcionario: FuncionarioCreate): Observable<AppResponse<FuncionarioCreate>> {
    return this.http.post<AppResponse<FuncionarioCreate>>(`${this.apiUrl}`, funcionario);
  }
}
