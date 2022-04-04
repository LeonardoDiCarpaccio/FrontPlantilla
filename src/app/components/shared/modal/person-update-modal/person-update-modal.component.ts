import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { TypeBasicCss } from 'src/app/models/Enums/TypeBasicCss';
import { SyneviewPerson } from 'src/app/models/Person';

@Component({
  selector: 'app-person-update-modal',
  templateUrl: './person-update-modal.component.html',
  styleUrls: ['./person-update-modal.component.scss']
})
export class PersonUpdateModalComponent extends SimpleModalComponent<any, any> implements OnInit{

  @Input() person : SyneviewPerson =  new SyneviewPerson();
  @Input() role : string = ""
  constructor() {
    super();
  }
  TypeBasicCss = TypeBasicCss

  ngOnInit(): void {
    console.log("this.person",this.person)
  }

  // dans syneview il semble qu'un user ne puisse avoir qu'un seul rôle, donc on reset l'array à chaque click sur le select
  pushToRoleArray(role : any){
      this.person.User.UserRoleCollection.push(role)
  }

  OnSubmitUserForm(f : NgForm){
    if(f.valid){
      this.pushToRoleArray(this.role)
      this.confirm()
    }
  }

  // result est exploitable depuis l'appel du modal
  confirm() {
    this.result = this.person
    this.close();
  }



}
