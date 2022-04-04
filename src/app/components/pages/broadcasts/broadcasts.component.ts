import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { SyneviewBroadcast } from 'src/app/models/Broadcast';
import { AlertService } from 'src/app/services/alert.service';
import { BroadcastUpdateModalComponent } from '../../shared/modal/broadcast-update-modal/broadcast-update-modal.component';

@Component({
  selector: 'app-broadcasts',
  templateUrl: './broadcasts.component.html',
  styleUrls: ['./broadcasts.component.scss']
})
export class BroadcastsComponent implements OnInit {
  broadcast : SyneviewBroadcast = new SyneviewBroadcast()
  constructor(private simpleModalService:SimpleModalService,private alert : AlertService) { }


  ngOnInit(): void {
  }

insertBroadcast(){
  let subscription = this.simpleModalService.addModal(BroadcastUpdateModalComponent, {

    broadcast : new SyneviewBroadcast()
}).subscribe((data)=>{
  subscription.unsubscribe()
  console.log("data",data)
});
}

updateBroadcast(){

}


}
