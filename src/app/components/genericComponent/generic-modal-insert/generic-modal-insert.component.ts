import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';

@Component({
  selector: 'app-generic-modal-insert',
  templateUrl: './generic-modal-insert.component.html',
  styleUrls: ['./generic-modal-insert.component.scss'],
})
export class GenericModalInsertComponent
  extends SimpleModalComponent<any, any>
  implements OnInit
{
  constructor() {
    super();
  }
  data = {
    email: '',
    role: '',
    name: '',
    orga: [],
  };

  formRules = [
    {
      typeForm: 'input',
      typeInput: 'email',
      placeholder: 'Email',
      required: true,
      label: 'email',
      key: 'email',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Name',
      required: false,
      label: 'Name',
      key: 'name',
    },
    {
      typeForm: 'select',
      placeholder: 'Choisissez un role',
      required: true,
      label: 'Role',
      option: ['Administrateur', 'Utilisateur'],
      key: 'role',
      multiSelect: false,
    },
    {
      typeForm: 'select',
      placeholder: 'Choisissez une orga',
      required: true,
      label: 'Orga',
      option: [
        { id: 1, name: 'Synexie' },
        { id: 2, name: 'Sema' },
      ],
      key: 'orga',
      multiSelect: false,
      itemSelected: [],
    },
  ];

  ngOnInit(): void {}

  OnSubmitUserForm(f: NgForm) {
    if (f.valid) {
      this.confirm();
    }
  }

  removeItem(selectedItem: any, item: any) {}

  // result est exploitable depuis l'appel du modal
  confirm() {
    this.result = this.data;
    this.close();
  }
}
