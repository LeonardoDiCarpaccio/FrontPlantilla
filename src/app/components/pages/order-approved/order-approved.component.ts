import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { GenericModalInsertComponent } from '../../genericComponent/generic-modal-insert/generic-modal-insert.component';
import { PersonUpdateModalComponent } from '../../shared/modal/person-update-modal/person-update-modal.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { CommandService } from 'src/app/services/crud/command.service';
import { GenericFormgroupComponent } from '../../genericComponent/generic-formgroup/generic-formgroup.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-approved',
  templateUrl: './order-approved.component.html',
  styleUrls: ['./order-approved.component.scss'],
})
export class OrderApprovedComponent implements OnInit {
  user: any;
  // Header of the <table>, name is what the user see, key is the real name of the key of obj
  arrHeader = [
    // { name: 'Estado', key: 'name', obj: 'status' },
    { name: 'Estado', key: 'name', obj: 'status' },
    { name: 'Numero', key: 'id' },
    { name: 'Apellido', key: 'clientName', obj: 'client' },
    { name: 'Nombre', key: 'clientFirstName', obj: 'client' },
    { name: 'Organization', key: 'orga', obj: 'client' },
    { name: 'Feche De Creacion', key: 'creationDateDisplay' },
    { name: 'Ver Detalles', key: 'details' },

    // { name: 'Cantidad', key: 'quantity', obj: 'item' },
    // { name: 'Modele', key: 'model' },
    // { name: 'Talles', key: 'sizes' },
    // { name: 'Correcion', key: 'correction' },
    // { name: 'Oliva/Barra Metatarsal', key: 'olivaBarra' },
    // { name: 'RPI', key: 'rpi' },
    // { name: 'RPE', key: 'rpe' },
    // { name: 'RAI', key: 'rai' },
    // { name: 'RAEX', key: 'raex' },
    // { name: 'Info Clinica', key: 'clinica' },

    // { name: 'Organization', key: 'orga' },
    // { name: 'Ubicacion', key: 'location' },
  ];
  // Can be replaced by any SQL response
  arrMainNgFor = [];
  display = false;
  // option which deserve to add a searchBar upper the table, searchbar can be NULL.
  searchBar = {
    placeholder: 'Buscar un pedido',
  };

  filter = [];
  formRulesUpdate = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Apellido',
      label: 'Cambiar El Apellido',
      formControl: 'clientName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Nombre',
      label: 'Cambiar El Nombre',
      formControl: 'clientFirstName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Organization',
      label: 'Cambiar Organization',
      formControl: 'orga',
    },
    {
      typeForm: 'input',
      typeInput: 'date',
      placeholder: 'Fecha de creacion',
      label: 'Cambiar La Fecha De Creacion',
      formControl: 'creationDate',
    },
  ];
  // text alert when filter make the ngFor array lengh coming to zero
  alertMsgFilterNoMatch = 'Esos filtros no corresponden a ningun pedido';
  // actions is initialized at null, but it can be filled by an array with the text of the action and the method to call, if it stay null, the generic table will only be for display
  // actions is always filled in the ngOnInit, otherwise we get an error "property is used before initialisation" ///// the method passed to the obj are method with callback
  // this.actions = [
  //   { text: 'Modifier', method: this.updateUser },
  //   { text: 'Supprimer', method: this.deleteUser },
  // ];
  actions: any = null;
  status: any = null;
  constructor(
    private commandService: CommandService,
    private simpleModalService: SimpleModalService,
    private alert: AlertService
  ) {}

  async ngOnInit() {
    this.actions = [
      // { text: 'Modificar', method: this.updatePedido },
      { text: 'Borrar', method: this.deletePedido },
    ];
    this.status = [{ text: 'Cambiar El Estado', method: this.changeStatus }];
    await this.loadCommand();
  }
  async loadCommand() {
    await this.commandService
      .findByCommand({
        where: { statusId: 2 },
        relations: ['status', 'client', 'patient', 'patient.item'],
      })
      .subscribe((res) => {
        this.arrMainNgFor = res;
      });
    this.display = true;
  }
  changeStatus = (status: any): void => {
    let update = {
      Pedido: {
        status: {
          id: status.id,
        },
      },
    };
  };

  updatePedido = (pedido: any): void => {
    let title = 'Cambiar Los Datos Del  Pedido';
    let form = new FormGroup({
      id: new FormControl(pedido.id),
      clientFirstName: new FormControl(pedido.client.clientFirstName),
      clientName: new FormControl(pedido.client.clientName),

      orga: new FormControl(pedido.client.orga),
      creationDate: new FormControl(pedido.creationDate),
    });

    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,

        formRules: this.formRulesUpdate,
        title: title,
      })
      .subscribe((data) => {
        if (data) {
          this.alert.success(
            'Los datos del usuario fueron modificado en la base de datos !'
          );
          //We get modal result
          subscription.unsubscribe();
        }
      });
  };

  deletePedido = (pedido: any) => {
    this.alert.warn('En Trabajo');
    this.alert.warn('En Trabajo');

    if (pedido) {
      this.commandService.deleteCommand(pedido).subscribe((res) => {
        if (res) {
          this.alert.success('El Pedido fue borrado de la base de datos !');
          window.location.reload();
        } else {
          this.alert.error('El servidor se encontro con un problema');
        }
      });
    }
  };
}
