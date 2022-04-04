import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { TypeBasicCss } from 'src/app/models/Enums/TypeBasicCss';
import { TypeStateScreen } from 'src/app/models/Enums/TypeStateScreen';
import { SyneviewScreen } from 'src/app/models/Screen';

@Component({
  selector: 'app-screen-update-modal',
  templateUrl: './screen-update-modal.component.html',
  styleUrls: ['./screen-update-modal.component.scss']
})
export class ScreenUpdateModalComponent extends SimpleModalComponent<any, any> implements OnInit {
  @Input() screen = new SyneviewScreen()

  constructor() {
    super();
   }
   TypeBasicCss = TypeBasicCss
   TypeStateScreen  = TypeStateScreen
  ngOnInit(): void {
  }


  OnSubmitScreenForm(f : NgForm){
    if(f.valid){
      this.confirm()
    }
  }

  // result est exploitable depuis l'appel du modal
  confirm() {
    this.result = this.screen
    this.close();
  }


}
