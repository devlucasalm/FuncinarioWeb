import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { FuncionarioService } from '../../shared/services/funcionario.service';
import { MessageService } from 'primeng/api';
import { TurnoEnum } from '../../shared/enums/turno.enum';
import { DepartamentoEnum } from '../../shared/enums/departamento.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-funcionario-edit',
  standalone: true,
 imports: [
    ButtonModule,
    DropdownModule,
    TriStateCheckboxModule,
    RouterLink,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [MessageService,],
  templateUrl: './funcionario-edit.component.html',
  styleUrl: './funcionario-edit.component.scss'
})
export class FuncionarioEditComponent {
  form! : FormGroup;
  id!: string;

  constructor( private fb: FormBuilder,
      private funcionarioService: FuncionarioService,
      private messageService: MessageService,
      private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      departamento: [null, Validators.required],
      turno: [null, Validators.required],
      ativo: [false],
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id = id;
      this.funcionarioService.getFuncionarioById(id).subscribe((response) => {
        const funcionario = response.dados;
        this.form.patchValue({
          nome: funcionario.nome,
          sobrenome: funcionario.sobrenome,
          departamento: funcionario.departamento,
          turno: funcionario.turno,
          ativo: funcionario.ativo,
        });
      });
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

  salvar(): void {
    if (this.form.valid) {
      const payload = {
        id: this.id,
        ...this.form.value,
        dataDeCriacao: new Date().toISOString(),
        dataDeAltercao: new Date().toISOString(),
      };
      this.funcionarioService.putFuncionario(payload).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Funcionário atualizado com sucesso!',
        });
        this.form.reset();
      });
    }
  }
  
}
