import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/alert.service';
import { GenericModalInsertComponent } from '../../genericComponent/generic-modal-insert/generic-modal-insert.component';
import { PersonUpdateModalComponent } from '../../shared/modal/person-update-modal/person-update-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  user: any;
  // Header of the <table>, name is what the user see, key is the real name of the key of obj
  arrHeader = [
    { name: 'Email', key: 'mail' },
    { name: 'Nom', key: 'name' },
    { name: 'Prénom', key: 'firstname' },
    { name: 'Organisation', key: 'orga' },
  ];
  // Can be replaced by any SQL response
  arrMainNgFor = [
    {
      id: 1,
      mail: 'ablandon@synexie.fr',
      name: 'Alexandre',
      firstname: 'Blandon',
      orga: 'Synexie',
      idDehka: 2,
    },
    {
      id: 2,
      mail: 'mloubet@synexie.fr',
      name: 'Maxime',
      firstname: 'Loubet',
      orga: 'Sema',
      idDehka: 3,
    },
    {
      id: 3,
      mail: 'mloubet@synexie.fr',
      name: 'Maxime',
      firstname: 'Loubet',
      orga: 'Synexie',
      idDehka: 3,
    },
  ];
  // option which deserve to add a searchBar upper the table, searchbar can be NULL.
  searchBar = {
    placeholder: 'Rechercher un utilisateur',
  };
  // array of fiter, each item of the array become a <select>
  // option is for fill the <option>
  // placeholder is the first row "<option disabled selected>" (kind of <select> title)
  // keyNgForFilter : we're iterating on an ngFor, this string deserve to know which key of the current iteration we have to filter
  // EX : keyNgForFilter: 'id_category' ===>>> arrNgFor.filter((el[keyNgForFilter] == ...))
  // keyOptionFilter : this time, it's for precise by which key we filter
  // EX : keyOptionFilter : 'id' ======>>>>>>  we have a select with a <option ngFor="let item of option">, if option is an array of object we can precise which key use for filter
  // EX : combining  keyNgForFilter : id  && keyOptionFilter : id_category  ====>>>> <option ngFor="let item of option value="item[obj.keyOptionFilter]">
  // SO the filter function will do something like  arrNgFor.filter((el[keyNgForFilter] == item.target.value)) value will be the "item[obj.keyOptionFilter]"*
  // filterNgModelValue && filterValue are just 2 values which deserve to handle some display logic and reseting the <select> correctly
  //optionDisplaykey is used when the option arrays is an array of object to display the "text" value <option ngFor="let item of option >{{item[obj.optionDisplaykey]}}</option>
  // filter can be equal to NULL, in this case no filter on the table
  filter = [
    {
      option: ['Synexie', 'Sema'],
      placeholder: 'Filtrer par organisation',
      keyNgForFilter: 'orga',
      keyOptionFilter: '',
      filterValue: '',
      filterNgModelValue: '',
      optionDisplaykey: '',
    },
    {
      option: [
        { id: 2, txt: 'dehka1' },
        { id: 3, txt: 'dehka2' },
      ],
      placeholder: 'Filtrer par dehka',
      keyNgForFilter: 'idDehka',
      keyOptionFilter: 'id',
      filterValue: '',
      filterNgModelValue: '',
      optionDisplaykey: 'txt',
    },
    {
      option: ['Maxime', 'Alexandre'],
      placeholder: 'Filtrer par Prénom',
      keyNgForFilter: 'name',
      keyOptionFilter: '',
      filterValue: '',
      filterNgModelValue: '',
      optionDisplaykey: '',
    },
  ];

  // text alert when filter make the ngFor array lengh coming to zero
  alertMsgFilterNoMatch = 'Ces filtres ne correspondent à aucun utilisateur';
  // actions is initialized at null, but it can be filled by an array with the text of the action and the method to call, if it stay null, the generic table will only be for display
  // actions is always filled in the ngOnInit, otherwise we get an error "property is used before initialisation" ///// the method passed to the obj are method with callback
  // this.actions = [
  //   { text: 'Modifier', method: this.updateUser },
  //   { text: 'Supprimer', method: this.deleteUser },
  // ];
  actions: any = null;

  constructor(
    private simpleModalService: SimpleModalService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.actions = [
      { text: 'Modifier', method: this.updateUser },
      { text: 'Supprimer', method: this.deleteUser },
    ];
  }

  insertUser() {
    let subscription = this.simpleModalService
      .addModal(GenericModalInsertComponent, {
        person: this.user,
        role: '',
      })
      .subscribe((data) => {
        console.log('data', data);

        if (data) {
          //We get modal result
          this.alert.success("L'utilisateur a bien été ajouté à l'application");
          subscription.unsubscribe();
        }
      });
  }

  updateUser = (user: any): void => {
    let update = {
      User: {
        FirstName: user.firstname,
        LastName: user.name,
        Email: user.mail,
      },
    };
    let subscription = this.simpleModalService
      .addModal(PersonUpdateModalComponent, {
        person: update,
        role: 'Utilisateur',
      })
      .subscribe((data) => {
        if (data) {
          this.alert.success(
            "Les informations de l'utilisateur ont bien été modifié"
          );
          //We get modal result
          subscription.unsubscribe();
          console.log('data', data);
        }
      });
  };

  deleteUser = () => {
    this.alert.warn('working');
  };
}
