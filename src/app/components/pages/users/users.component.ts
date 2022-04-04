import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { SyneviewPerson } from 'src/app/models/Person';
import { AlertService } from 'src/app/services/alert.service';
import { PersonUpdateModalComponent } from '../../shared/modal/person-update-modal/person-update-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // user : SyneviewPerson = new SyneviewPerson()
  constructor(private simpleModalService:SimpleModalService,private alert : AlertService) { }

  ngOnInit(): void {

  }



insertUser(){
  let subscription =  this.simpleModalService.addModal(PersonUpdateModalComponent, {
    person : new SyneviewPerson(),
    role : ""
   })
   .subscribe((data)=>{
       //We get modal result
       this.alert.success("L'utilisateur a bien été ajouté à l'application")
       subscription.unsubscribe()

     console.log("data",data)
   });
}


updateUser(){
  let update = new SyneviewPerson()
  update.User.FirstName = "Alexandre"
  update.User.LastName = "Blandon"
  update.User.Email = "ablandon@synexie.fr"
 let subscription =  this.simpleModalService.addModal(PersonUpdateModalComponent, {
    person : update,
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
