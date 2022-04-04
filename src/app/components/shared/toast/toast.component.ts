import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent extends Toast implements OnInit {
   constructor ( toastrService: ToastrService, toastPackage: ToastPackage) {

    super(toastrService,toastPackage);
  }
  text = this.options.payload.text
  classBg = ""
  classText = ""
  ngOnInit(): void {
    switch(this.options.payload.class){
      case "success" :
      this.classBg = "bg-green-100 "
      this.classText="text-green-600"
       break;
      case "warning" :
      this.classBg = " bg-yellow-100"
      this.classText="text-yellow-600"
      break;
      case "error" :
      this.classBg =" bg-red-100"
      this.classText="text-red-600"
      break;
      case "info" :
      this.classBg =" bg-blue-100"
      this.classText="text-blue-600"
      break;
    }

  }

}
