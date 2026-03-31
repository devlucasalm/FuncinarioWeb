import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FuncionarioService } from '../../shared/services/funcionario.service';
import { FuncionarioList } from '../../shared/models/funcionario.interface';
import { ButtonModule } from 'primeng/button';
import { DepartamentoEnum } from '../../shared/enums/departamento.enum';
import { TurnoEnum } from '../../shared/enums/turno.enum';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    RouterLink,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.scss',
})
export class FuncionarioListComponent implements OnInit {
  DepartamentoEnum = DepartamentoEnum;
  TurnoEnum = TurnoEnum;
  funcionarios: FuncionarioList[] = [];
  funcionariosFiltrados: FuncionarioList[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

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
  this.confirmationService.confirm({
    message: 'Tem certeza que deseja excluir este funcionário?',
    header: 'Confirmação',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sim',
    rejectLabel: 'Cancelar',

    accept: () => {
      this.funcionarioService.deleteFuncionario(id).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Funcionário deletado com sucesso!',
        });

        this.funcionarios = this.funcionarios.filter(
          (funcionario) => funcionario.id !== id
        );
      });
    }
  });
}

  editar(id: string) {
    this.router.navigate(['/funcionario', id]);
  }
}

