import { Component, OnInit, Input } from '@angular/core';

import { AeronaveService } from './services/aeronave.service';
import { Aeronave } from './interfaces/aeronave';
import { Resultado } from './interfaces/resultado';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Exclusão de Aeronave</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss(0)">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Confirma a exclusão da aeronave modelo <span class="text-primary">{{modeloAeronave}}</span>?</strong></p>
    <p>Todas as informações associadas a esta aeronave serão excluídas permanentemente.
    <span class="text-danger">Esta operação não pode ser desfeita.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss(0)">Cancelar</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close(idAeronave)">Ok</button>
  </div>
  `
})
export class AppNgbdModalConfirmComponent {
  @Input() idAeronave;
  @Input() modeloAeronave;

  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // paginação da grid
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  // icons
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

   withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
       (click)="modal.close('Ok click')">Ok</button>`;

  aeronaves: Aeronave[] = [];
  resultado: Resultado;

  formularioAeronave: FormGroup;
  formularioEnviado = false;

  constructor(
    private service: AeronaveService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregaGridAeronaves();

    this.formularioAeronave = this.formBuilder.group({
      id: [null],
      modelo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      quantidadeAssento: [null, [Validators.required, Validators.min(2), Validators.max(300)]],
      dataCriacao: [null]
    });
  }

  private carregaGridAeronaves() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

    this.service.getAeronaves(this.resultado).subscribe(result => {
      if (result.erro) {
        this.toastr.error('Erro ao tentar carregar a grid de aeronaves. Favor tente novamente!');
      } else {
        this.aeronaves = result;
        this.collectionSize = this.aeronaves.length;
      }
    });
  }

  get listaAeronaves(): Aeronave[] {
    return this.aeronaves
    .map((aeronave, i) => ({id: i + 1, ...aeronave}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  carregaFormulario(id: number) {
    const aeronaveSelecionada = this.aeronaves.find((item: { id: number; }) =>
    item.id === id);

    this.formularioAeronave.get('id').setValue(aeronaveSelecionada.id);
    this.formularioAeronave.get('modelo').setValue(aeronaveSelecionada.modelo);
    this.formularioAeronave.get('quantidadeAssento').setValue(aeronaveSelecionada.quantidadeAssento);
    this.formularioAeronave.get('dataCriacao').setValue(aeronaveSelecionada.dataCriacao);
  }

  open(id: number, modelo: string) {
    const modalReferencia = this.modalService.open(AppNgbdModalConfirmComponent);
    modalReferencia.componentInstance.idAeronave = id;
    modalReferencia.componentInstance.modeloAeronave = modelo;

    modalReferencia.result.then((result) => {
      this.excluiAeronave(result);
    }, (reason) => { });
  }

  excluiAeronave(id: number) {
    this.spinner.show();
    const aeronaveSelecionada = this.aeronaves.find((item: { id: number; }) =>
    item.id === id);

    this.service.deleteAeronave(id, aeronaveSelecionada)
      .subscribe(result => {
        if (result.erro) {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar excluir uma aeronave. Favor tente novamente!');
        } else {
          this.spinner.hide();
          this.toastr.success('Aeronave excluída com sucesso!');
          this.excluiAeronaveDaLista(id);
        }
      });
  }

  private excluiAeronaveDaLista(id: number) {
    this.aeronaves = this.aeronaves.filter((elem) => {
      return elem.id !== id;
    });
  }

  get f() {
    return this.formularioAeronave.controls;
  }

  onSubmit() {
    this.formularioEnviado = true;

    if (this.formularioAeronave.invalid) {
      return;
    }

    this.spinner.show();
    const aeronave: Aeronave = this.formularioAeronave.value;

    if (aeronave.id === null) {
      aeronave.id = 0;
      aeronave.dataCriacao = new Date();

      this.service.addAeronave(aeronave)
        .subscribe(result => {
          if (result.erro) {
            this.spinner.hide();
            this.toastr.error('Erro ao tentar inserir uma aeronave. Favor tente novamente!');
          } else {
            this.spinner.hide();
            this.toastr.success('Aeronave inserida com sucesso!');
            this.insereAeronaveNaLista(result);
          }
        });
    } else {
      this.service.updateAeronave(aeronave.id, aeronave)
        .subscribe(result => {
          if (result.erro) {
            this.spinner.hide();
            this.toastr.error('Erro ao tentar alterar uma aeronave. Favor tente novamente!');
          } else {
            this.spinner.hide();
            this.toastr.success('Aeronave alterada com sucesso!');
            this.atualizaAeronaveDaLista(aeronave);
          }
        });
    }

    this.LimpaFormulario();
  }

  private insereAeronaveNaLista(aeronave: Aeronave) {
    this.aeronaves.push(aeronave);
  }

  private atualizaAeronaveDaLista(aeronave: Aeronave) {
    this.aeronaves.forEach(elem => {
      if (elem.id === aeronave.id) {
        elem.modelo = aeronave.modelo;
        elem.quantidadeAssento = aeronave.quantidadeAssento;
      }
    });
  }

  LimpaFormulario() {
    this.formularioEnviado = false;
    this.formularioAeronave.reset();
  }
}
