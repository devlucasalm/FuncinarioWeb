import { DepartamentoEnum } from "../enums/departamento.enum";
import { TurnoEnum } from "../enums/turno.enum";

export interface FuncionarioList {
  id?: string;
  nome: string;
  sobrenome: string;
  departamento: DepartamentoEnum;
  ativo: boolean;
  turno: TurnoEnum;
  datadecriacao: Date;
  datadealteracao: Date;
}