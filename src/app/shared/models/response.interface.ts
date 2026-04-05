export interface AppResponse<T> {
  dados: T;
  mensagem: string;
  sucesso: boolean;
}

export interface Paginacao<T> {
  skip: number;
  take: number;
  totalCount: number;
  items: T[];
}