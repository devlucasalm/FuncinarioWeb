import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FuncionarioService } from '../../shared/services/funcionario.service';
import { FuncionarioList } from '../../shared/models/funcionario.interface';
import { ButtonModule } from 'primeng/button';
import { DepartamentoEnum } from '../../shared/enums/departamento.enum';
import { TurnoEnum } from '../../shared/enums/turno.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss',
})
export class FuncionarioListComponent implements OnInit {
  DepartamentoEnum = DepartamentoEnum;
  TurnoEnum = TurnoEnum;
  funcionarios: FuncionarioList[] = [];
  funcionariosFiltrados: FuncionarioList[] = [];

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.funcionarioService.getFuncionarios().subscribe((response) => {
      this.funcionarios = response.dados;
      this.funcionariosFiltrados = response.dados;
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    this.funcionarios = this.funcionariosFiltrados.filter(
      (funcionario) =>
        funcionario.nome.toLowerCase().includes(value) ||
        funcionario.sobrenome.toLowerCase().includes(value),
    );
  }

  deletar(id: string) {
    this.funcionarioService.deleteFuncionario(id).subscribe(() => {
      this.funcionarios = this.funcionarios.filter(
        (funcionario) => funcionario.id !== id,
      );
    });
  }

  newfuncionario() {
    this.funcionarioService.postFuncionario().subscribe((response) => {
      this.funcionarios.push(response.dados);
    });
  }
}
