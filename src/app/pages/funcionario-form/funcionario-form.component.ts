import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { FuncionarioService } from '../../shared/services/funcionario.service';
import { DepartamentoEnum } from '../../shared/enums/departamento.enum';
import { TurnoEnum } from '../../shared/enums/turno.enum';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    TriStateCheckboxModule,
    RouterLink,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss',
})
export class FuncionarioFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      departamento: [null, Validators.required],
      turno: [null, Validators.required],
      ativo: [false],
    });
  }

  DepartamentoEnum = DepartamentoEnum;
  TurnoEnum = TurnoEnum;

  departamentos = [
    { label: 'Compras', value: DepartamentoEnum.Compras },
    { label: 'Recursos Humanos', value: DepartamentoEnum.RH },
    { label: 'Financeiro', value: DepartamentoEnum.Financeiro },
    { label: 'Atendimento', value: DepartamentoEnum.Atendimento },
    { label: 'Zeladoria', value: DepartamentoEnum.Zeladoria },
  ];

  turnos = [
    { label: 'Manhã', value: TurnoEnum.Manha },
    { label: 'Tarde', value: TurnoEnum.Tarde },
    { label: 'Noite', value: TurnoEnum.Noite },
  ];

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  salvar(): void {
    if (this.form.valid) {
      const payload = {
        ...this.form.value,
        dataDeCriacao: new Date().toISOString(),
        dataDeAltercao: new Date().toISOString(),
      };
      this.funcionarioService.postFuncionario(payload).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Funcionário cadastrado com sucesso!',
        });
        this.form.reset();
      });
    }
    
  }
}
