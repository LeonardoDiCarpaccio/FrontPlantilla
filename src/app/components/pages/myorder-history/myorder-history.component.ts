import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertService } from 'src/app/services/alert.service';
import { CommandService } from 'src/app/services/crud/command.service';

@Component({
  selector: 'app-myorder-history',
  templateUrl: './myorder-history.component.html',
  styleUrls: ['./myorder-history.component.scss'],
})
export class MyorderHistoryComponent implements OnInit {
  user: any;
  // Header of the <table>, name is what the user see, key is the real name of the key of obj
  arrHeader = [
    // { name: 'Estado', key: 'name', obj: 'status' },
    { name: 'Estado', key: 'name', obj: 'status' },
    { name: 'Numero', key: 'id' },
    { name: 'Apellido', key: 'clientName', obj: 'client' },
    { name: 'Nombre', key: 'clientFirstName', obj: 'client' },
    { name: 'Organization', key: 'orga', obj: 'client' },
    { name: 'Precio', key: 'Indisponibel' },

    { name: 'Fecha De Creacion', key: 'creationDateDisplay' },
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

  // option which deserve to add a searchBar upper the table, searchbar can be NULL.
  searchBar = {
    placeholder: 'BUSCAR UN PEDIDO',
  };

  filter = [];

  // text alert when filter make the ngFor array lengh coming to zero
  alertMsgFilterNoMatch = 'Esos filtros no corresponden a ningun pedido';
  // actions is initialized at null, but it can be filled by an array with the text of the action and the method to call, if it stay null, the generic table will only be for display
  // actions is always filled in the ngOnInit, otherwise we get an error "property is used before initialisation" ///// the method passed to the obj are method with callback
  // this.actions = [
  //   { text: 'Modifier', method: this.updateUser },
  //   { text: 'Supprimer', method: this.deleteUser },
  // ];
  client: any;
  actions: any = null;
  status: any = null;
  constructor(
    private commandService: CommandService,
    private simpleModalService: SimpleModalService,
    private alert: AlertService
  ) {}

  async ngOnInit() {
    this.actions = [
      // { text: 'Modificar', method: this.updateUser },
      { text: 'Borrar', method: this.deletePedido },
    ];
    this.client = JSON.parse(localStorage.getItem('user'));

    // this.status = [{ text: 'Cambiar El Estado', method: this.changeStatus }];
    await this.loadCommand();
  }
  async loadCommand() {
    await this.commandService
      .findByCommand({
        where: { statusId: 3, clientId: this.client.id },
        relations: ['status', 'client', 'patient', 'patient.item'],
        order: { id: 'DESC' },
      })
      .subscribe((res) => {
        this.arrMainNgFor = res;
      });
  }
  // changeStatus = (status: any): void => {
  //   let update = {
  //     Pedido: {
  //       status: {
  //         id: status.id,
  //       },
  //     },
  //   };
  // };

  // updateUser = (user: any): void => {
  //   let update = {
  //     User: {
  //       FirstName: user.firstname,
  //       LastName: user.name,
  //       Email: user.mail,
  //     },
  //   };
  //   let subscription = this.simpleModalService
  //     .addModal(PersonUpdateModalComponent, {
  //       person: update,
  //       role: 'Utilisateur',
  //     })
  //     .subscribe((data) => {
  //       if (data) {
  //         this.alert.success(
  //           'Los datos del usuario fueron modificado en la base de datos !'
  //         );
  //         //We get modal result
  //         subscription.unsubscribe();
  //       }
  //     });
  // };

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
