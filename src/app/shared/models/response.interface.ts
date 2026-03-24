export interface AppResponse<T> {
  dados: T;
  mensagem: string;
  sucesso: boolean;
}