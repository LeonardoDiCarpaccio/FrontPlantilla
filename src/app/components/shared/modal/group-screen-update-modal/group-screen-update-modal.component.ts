import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { TypeBasicCss } from 'src/app/models/Enums/TypeBasicCss';
import { SyneviewGroupScreen } from 'src/app/models/GroupScreen';

@Component({
  selector: 'app-group-screen-update-modal',
  templateUrl: './group-screen-update-modal.component.html',
  styleUrls: ['./group-screen-update-modal.component.scss']
})
export class GroupScreenUpdateModalComponent extends SimpleModalComponent<any, any> implements OnInit {
@Input() groupScreen = new SyneviewGroupScreen()
valueSelect =""
  constructor() {
    super();
   }
   TypeBasicCss = TypeBasicCss

  ngOnInit(): void {
  }
  pushScreenToArray(screen : any){
      this.groupScreen.Screens.push(screen.target.value)
  }
  removeItem(item : any){
    this.groupScreen.Screens.splice(this.groupScreen.Screens.findIndex((screen)=>screen == item),1)
    this.valueSelect = ""
  }
  OnSubmitScreenForm(f : NgForm){
    if(f.valid){
      this.confirm()
    }
  }

  // result est exploitable depuis l'appel du modal
  confirm() {
    this.result = this.groupScreen
    this.close();
  }


}
