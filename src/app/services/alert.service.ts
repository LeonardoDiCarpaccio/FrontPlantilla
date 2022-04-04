import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr : ToastrService) { }

  success(text : string) {
     this.toastr.success("","",{timeOut: 3000,payload : {text  : text,class : "success"}});
  }

  error(text : string){
    this.toastr.success("","",{timeOut: 3000,payload : {text  : text,class : "error"}});
  }

  warn(text : string){
    this.toastr.success("","",{timeOut: 3000,payload : {text  : text,class : "warning"}});
  }

  info(text : string){
    this.toastr.success("","",{timeOut: 3000,payload : {text  : text,class : "info"}});
  }

}
