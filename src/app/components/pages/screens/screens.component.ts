import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { TypeStateScreen } from 'src/app/models/Enums/TypeStateScreen';
import { SyneviewScreen } from 'src/app/models/Screen';
import { AlertService } from 'src/app/services/alert.service';
import { ScreenUpdateModalComponent } from '../../shared/modal/screen-update-modal/screen-update-modal.component';

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.scss']
})
export class ScreensComponent implements OnInit {
  screen : SyneviewScreen = new SyneviewScreen()
  constructor(private simpleModalService:SimpleModalService,private alert : AlertService) { }

  ngOnInit(): void {
  }

insertScreen(){
let subscription = this.simpleModalService.addModal(ScreenUpdateModalComponent, {
    screen : new SyneviewScreen()
}).subscribe((data)=>{
  //We get modal result
  // this.alert.success("L'utilisateur a bien été ajouté à l'application")
  subscription.unsubscribe()
console.log("data",data)
});
}

updateScreen(){
  let update = new SyneviewScreen()
  update.Key = "YBPD8"
  update.Name = "Ecran 1"
  update.State = TypeStateScreen.ON
  let subscription = this.simpleModalService.addModal(ScreenUpdateModalComponent, {
    screen : update
}).subscribe((data)=>{
  //We get modal result
  // this.alert.success("L'utilisateur a bien été ajouté à l'application")
  subscription.unsubscribe()
console.log("data",data)
});
}

}
