import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/alert.service';
import { GenericModalInsertComponent } from '../../genericComponent/generic-modal-insert/generic-modal-insert.component';
import { PersonUpdateModalComponent } from '../../shared/modal/person-update-modal/person-update-modal.component';
import { ClientService } from 'src/app/services/crud/client.service';
import { HttpClientModule } from '@angular/common/http';
import { GenericFormgroupComponent } from '../../genericComponent/generic-formgroup/generic-formgroup.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  user: any;
  filter = [];

  // Header of the <table>, name is what the user see, key is the real name of the key of obj
  arrHeader = [
    { name: 'Apellido', key: 'clientName' },
    { name: 'Nombre', key: 'clientFirstName' },
    { name: 'Organization', key: 'orga' },
    { name: 'Precio Por Plantilla', key: 'price' },
    { name: 'Usuario', key: 'mail' },
    { name: 'Dirrecion De Envio', key: 'location' },
    // { name: 'Contrasena', key: 'password' },
    { name: 'Cuenta Actual', key: 'account' },
  ];
  listedOfPrice = [
    { Type: 'AAA-Sin Descuento', id: 1 },
    { Type: 'AA-5% Descuento', id: 0.95 },
    { Type: 'A-10% Descuento', id: 0.9 },
  ];

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
      label: 'Cambiar Empreza',
      formControl: 'orga',
    },
    {
      typeForm: 'dropdown',
      placeholder: 'Precio por plantilla',
      label: 'Descuento Por Plantilla ',
      option: this.listedOfPrice,
      keyOption: 'Type',
      formControl: 'price',
    },
    {
      typeForm: 'input',
      typeInput: 'email',
      placeholder: 'Usuario',
      label: 'Cambiar El Usuario',
      formControl: 'mail',
    },

    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Dirrecion De Envio',
      label: 'Cambiar Dirrecion De Envio',
      formControl: 'location',
    },
    {
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Cuenta',
      label: 'Cambiar Valor de la Cuenta',
      formControl: 'account',
    },
  ];
  formRulesInsert = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Apellido',
      label: 'Entrar Apellido',
      formControl: 'clientName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Nombre',
      label: 'Entrar Nombre',
      formControl: 'clientFirstName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Organization',
      label: 'Entrar Empreza',
      formControl: 'orga',
    },
    {
      typeForm: 'dropdown',
      placeholder: 'Precio por plantilla',
      label: 'Descuento Por Plantilla ',
      option: this.listedOfPrice,
      keyOption: 'Type',
      formControl: 'price',
    },
    // {
    //   typeForm: 'input',
    //   typeInput: 'number',
    //   placeholder: 'Descuento Por Plantilla del 0 AL 1',
    //   label:
    //     'Descuento Por Plantilla : Si descuento = 0.9, el cliente tiene 10% de descuento en cada plantilla',
    //   formControl: 'price',
    // },
    {
      typeForm: 'input',
      typeInput: 'email',
      placeholder: 'Usuario',
      label: 'Entrar El Usuario De La Cuenta',
      formControl: 'mail',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Contrasena del Usuario',
      label: 'Entrar Valor De La Contrasena',
      formControl: 'password',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Dirrecion De Envio',
      label: 'Entrar Dirrecion De Envio',
      formControl: 'location',
    },
    {
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Cuenta',
      label: 'Entrar Valor de la Cuenta',
      formControl: 'account',
    },
    {
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Cellular',
      label: 'Entrar El Cellular',
      formControl: 'phone',
    },
  ];
  // Can be replaced by any SQL response
  arrMainNgFor = [];

  // option which deserve to add a searchBar upper the table, searchbar can be NULL.
  searchBar = {
    placeholder: 'BUSCAR UN CLIENTE',
  };

  // text alert when filter make the ngFor array lengh coming to zero
  alertMsgFilterNoMatch = 'Esos filtros no corresponden a ninguno cliente';
  // actions is initialized at null, but it can be filled by an array with the text of the action and the method to call, if it stay null, the generic table will only be for display
  // actions is always filled in the ngOnInit, otherwise we get an error "property is used before initialisation" ///// the method passed to the obj are method with callback
  // this.actions = [
  //   { text: 'Modifier', method: this.updateUser },
  //   { text: 'Supprimer', method: this.deleteUser },
  // ];
  actions: any = null;

  constructor(
    private simpleModalService: SimpleModalService,
    private alert: AlertService,
    private clientService: ClientService,
    private http: HttpClientModule
  ) {}

  async ngOnInit() {
    //
    await this.loadSkills();

    this.actions = [
      { text: 'Modificar', method: this.updateUser },
      { text: 'Borrar', method: this.deleteUser },
    ];
  }

  async loadSkills() {
    await this.clientService
      .findByClient({ where: { roleId: 2 } })
      .subscribe((res) => {
        this.arrMainNgFor = res;
      });
  }

  insertUser() {
    let title = 'Entrar Un Nuevo Cliente';
    let form = new FormGroup({
      // id: new FormControl(Validators.required),
      clientName: new FormControl(),
      password: new FormControl(),
      clientFirstName: new FormControl(),
      mail: new FormControl(),
      price: new FormControl(),
      location: new FormControl(),
      orga: new FormControl(),
      account: new FormControl(),
      phone: new FormControl(),
    });
    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,
        formRules: this.formRulesInsert,
        title: title,
      })
      .subscribe(async (data) => {
        if (data) {
          console.log(data, 'success data: ');
          if (data.price == 'AAA') {
            data.price = 1;
          }
          if (data.price == 'AA') {
            data.price = 0.95;
          }
          if (data.price == 'A') {
            data.price = 0.9;
          }

          await this.clientService.insertUpdateClient(data).subscribe((res) => {
            if (res) {
              this.alert.success(
                'Los datos del cliente fueron modificado en la base de datos !'
              );
              window.location.reload();
            } else {
              this.alert.error('El servidor se encontro con un problema');
            }
          });

          //We get modal result
        }
      });
  }

  updateUser = (user: any): void => {
    let title = 'Cambiar Los Datos Del Cliente';
    let form = new FormGroup({
      id: new FormControl(user.id, Validators.required),
      clientName: new FormControl(user.clientName, Validators.required),
      clientFirstName: new FormControl(
        user.clientFirstName,
        Validators.required
      ),
      mail: new FormControl(user.mail, Validators.required),
      price: new FormControl(user.price, Validators.required),
      location: new FormControl(user.location, Validators.required),
      orga: new FormControl(user.orga, Validators.required),
      account: new FormControl(user.account, Validators.required),
    });

    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,
        formRules: this.formRulesUpdate,
        title: title,
      })
      .subscribe(async (data) => {
        if (data) {
          await this.clientService.insertUpdateClient(data).subscribe((res) => {
            if (res) {
              this.alert.success(
                'Los datos del cliente fueron modificado en la base de datos !'
              );
              window.location.reload();
            } else {
              this.alert.error('El servidor se encontro con un problema');
            }
          });

          //We get modal result
          subscription.unsubscribe();
        }
      });
  };

  deleteUser = (user: any): void => {
    if (user) {
      this.clientService.deleteClient(user).subscribe((res) => {
        if (res) {
          this.alert.success(
            'Los datos del cliente fueron modificado en la base de datos !'
          );
          window.location.reload();
        } else {
          this.alert.error('El servidor se encontro con un problema');
        }
      });

      this.alert.warn('En Trabajo');
    }
  };
}
// array of fiter, each item of the array become a <select>
// option is used to fill the <option>
// placeholder is the first row "<option disabled selected>" (kind of <select> title)
// keyNgForFilter : we're iterating on an ngFor, this string has to know which key of the current iteration we have to filter
// EX : keyNgForFilter: 'id_category' ===>>> arrNgFor.filter((el[keyNgForFilter] == ...))
// keyOptionFilter : this time, it's for precise by which key we filter
// EX : keyOptionFilter : 'id' ======>>>>>>  we have a select with a <option ngFor="let item of option">, if option is an array of object we can precise which key use for filter
// EX : combining  keyNgForFilter : id  && keyOptionFilter : id_category  ====>>>> <option ngFor="let item of option value="item[obj.keyOptionFilter]">
// SO the filter function will do something like  arrNgFor.filter((el[keyNgForFilter] == item.target.value)) value will be the "item[obj.keyOptionFilter]"*
// filterNgModelValue && filterValue are just 2 values which deserve to handle some display logic and reseting the <select> correctly
//optionDisplaykey is used when the option arrays is an array of object to display the "text" value <option ngFor="let item of option >{{item[obj.optionDisplaykey]}}</option>
// filter can be equal to NULL, in this case no filter on the table
// filter = [
// {
//   option: ['Synexie', 'Sema'],
//   placeholder: 'Filtrar por Organization',
//   keyNgForFilter: 'orga',
//   keyOptionFilter: '',
//   filterValue: '',
//   filterNgModelValue: '',
//   optionDisplaykey: '',
// },
// {
//   option: [
//     { id: 2, txt: 'dehka1' },
//     { id: 3, txt: 'dehka2' },
//   ],
//   placeholder: 'Filtrar por dehka',
//   keyNgForFilter: 'idDehka',
//   keyOptionFilter: 'id',
//   filterValue: '',
//   filterNgModelValue: '',
//   optionDisplaykey: 'txt',
// },
// //if the filter is used on an array of object the keyOptionFilter is used
// {
//   option: ['Maxime', 'Alexandre'],
//   placeholder: 'Filtrar por Nombre',
//   keyNgForFilter: 'name',
//   keyOptionFilter: '',
//   filterValue: '',
//   filterNgModelValue: '',
//   optionDisplaykey: '',
// },
// ];
