import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/crud/client.service';
import { GenericFormgroupComponent } from '../../genericComponent/generic-formgroup/generic-formgroup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  filter = [];

  // Header of the <table>, name is what the user see, key is the real name of the key of obj
  arrHeader = [
    { name: 'Apellido', key: 'clientName' },
    { name: 'Nombre', key: 'clientFirstName' },
    { name: 'Organization', key: 'orga' },
    { name: 'Precio Por Plantilla', key: 'price' },
    { name: 'Email', key: 'mail' },
    { name: 'Dirrecion De Envio', key: 'location' },
    // { name: 'Contrasena', key: 'password' },
    { name: 'Cuenta Actual', key: 'account' },
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
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Precio Por Plantilla',
      label: 'Cambiar El Precio Por Plantilla',
      formControl: 'price',
    },
    {
      typeForm: 'input',
      typeInput: 'email',
      placeholder: 'Mail',
      label: 'Cambiar El Mail',
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
      typeForm: 'input',
      typeInput: 'number',
      placeholder:
        'Descuento Por Plantilla : Si descuento = 0.9, el cliente tiene 10% de descuento en cada plantilla',
      label: 'Entrar El Descuento Por Plantilla',
      formControl: 'price',
    },
    {
      typeForm: 'input',
      typeInput: 'email',
      placeholder: 'Mail',
      label: 'Entrar El Mail',
      formControl: 'mail',
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
  ];
  // Can be replaced by any SQL response
  arrMainNgFor = [];

  // option which deserve to add a searchBar upper the table, searchbar can be NULL.
  searchBar = {
    placeholder: 'Buscar un usuario',
  };

  // text alert when filter make the ngFor array lengh coming to zero
  alertMsgFilterNoMatch = 'Esos filtros no corresponden a ninguno usuarios';
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
    private http: HttpClientModule,
    private router: Router
  ) {}
  client: any;

  async ngOnInit() {
    this.client = JSON.parse(localStorage.getItem('user'));
  }

  disconnect() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
