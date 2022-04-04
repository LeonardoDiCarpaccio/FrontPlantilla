import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { SyneviewGroupScreen } from 'src/app/models/GroupScreen';
import { AlertService } from 'src/app/services/alert.service';
import { GroupScreenUpdateModalComponent } from '../../shared/modal/group-screen-update-modal/group-screen-update-modal.component';

@Component({
  selector: 'app-screen-groups',
  templateUrl: './screen-groups.component.html',
  styleUrls: ['./screen-groups.component.scss']
})
export class ScreenGroupsComponent implements OnInit {

  constructor(private simpleModalService:SimpleModalService,private alert : AlertService) { }

  ngOnInit(): void {
  }

  insertGroupScreen(){
    let subscription =  this.simpleModalService.addModal(GroupScreenUpdateModalComponent, {
      groupScreen : new SyneviewGroupScreen(),

     })
     .subscribe((data)=>{
         //We get modal result
         this.alert.success("L'utilisateur a bien été ajouté à l'application")
         subscription.unsubscribe()

       console.log("data",data)
     });
  }


  updateGroupScreen(){
    let update = new SyneviewGroupScreen()
    update.Name = "Groupe 1"

   let subscription =  this.simpleModalService.addModal(GroupScreenUpdateModalComponent, {
      groupScreen : update,
      role : "Utilisateur"
     })
     .subscribe((data)=>{
      this.alert.success("Les informations de l'utilisateur ont bien été modifié")
         //We get modal result
         subscription.unsubscribe()
       console.log("data",data)
     });


  }

}
