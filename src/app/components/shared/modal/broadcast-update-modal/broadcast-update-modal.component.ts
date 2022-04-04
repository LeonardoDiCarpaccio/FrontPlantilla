import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { SyneviewBroadcast } from 'src/app/models/Broadcast';
import { TypeBasicCss } from 'src/app/models/Enums/TypeBasicCss';
import { TypeStateBroadcast } from 'src/app/models/Enums/TypeStateBroadcast';

@Component({
  selector: 'app-broadcast-update-modal',
  templateUrl: './broadcast-update-modal.component.html',
  styleUrls: ['./broadcast-update-modal.component.scss'],
})
export class BroadcastUpdateModalComponent
  extends SimpleModalComponent<any, any>
  implements OnInit
{
  @Input() broadcast = new SyneviewBroadcast();
  selectGroupScreenValue = '';
  selectScreenValue = '';
  isPlanificationFirstClick = true;
  coordonateFirstClick : any = {
    x : null,
    y : null
  }
  configuration: any = {
    Processings: [],
  };
  readonly: any;
  arrOfDay = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"]
  // matrix : any = []
  arrOfHour : any= []
  grid: any = [];
  gridActive : any = [];
  Grid!: number[][];
  constructor() {
    super();
  }
  TypeBasicCss = TypeBasicCss;
  TypeStateBroadcast = TypeStateBroadcast;
  ngOnInit(): void {
    console.log('this.broadcast', this.broadcast);
    for (let i = 0; i < 7; i++) {
      this.grid.push([]);
      this.gridActive.push([])
      for (let j = 0; j < 24; j++) {
        if(i ==0){
          j <10 ? this.arrOfHour.push('0'+j+'h') : this.arrOfHour.push(j+'h')
        }
        this.grid[i].push(0);
        this.gridActive[i].push(0)
      }
    }
    console.log("this.grid",this.grid)
    // this.arrOfDay.forEach((el : any,index : any)=>{
    //   this.matrix.push([])
    //   for(let i = 0;i<24;i++){
    //     this.matrix[index][i] = 0
    //   }
    // })
  }
  //screen
  pushScreenToArray(screen: any) {
    this.broadcast.Screens.push(screen.target.value);
  }
  removeScreenItem(item: any) {
    this.broadcast.Screens.splice(
      this.broadcast.Screens.findIndex((screen) => screen == item),
      1
    );
    this.selectScreenValue = '';
  }
  // groupe screen
  pushGroupScreenToArray(screen: any) {
    this.broadcast.GroupScreens.push(screen.target.value);
  }
  removeGroupScreenItem(item: any) {
    this.broadcast.GroupScreens.splice(
      this.broadcast.GroupScreens.findIndex((screen) => screen == item),
      1
    );
    this.selectGroupScreenValue = '';
  }
  OnSubmitScreenForm(f: NgForm) {
    if (f.valid) {
      this.confirm();
    }
  }

  // grid stuff
  onCellGridClick(y: number, x: number) {

    // if (this.getProcessigIndexByCellPosition(y, x) == -1) {
    //   if (this.isGridCellActive(y, x)) {
    //     this.resetGridActive();
    //   } else {
    //     this.gridActive[y][x] = 1;
    //     let fx = -1; //first x cell active
    //     let fy = -1; //first y cell active
    //     let lx = -1; //last x cell active
    //     let ly = -1; //last y cell active
    //     for (let i = 0; i < this.grid.length; i++) {
    //       for (let j = 0; j < this.grid[i].length; j++) {
    //         if (this.isGridCellActive(i, j)) {
    //           if (fy == -1) fy = i;
    //           if (fx == -1) fx = j;
    //           ly = i;
    //           lx = j;
    //         }
    //       }
    //     }
    //     for (let i = fy; i <= y; i++) {
    //       this.gridActive[i][x] = 1;
    //       for (let j = fx; j <= x; j++) {
    //         this.gridActive[i][j] = 1;
    //       }
    //     }
    //     if (ly > y || lx > x) {
    //       this.resetGridActive();
    //       this.gridActive[y][x] = 1;
    //     }
    //     for (let i = 0; i < this.grid.length; i++) {
    //       for (let j = 0; j < this.grid[i].length; j++) {
    //         if (
    //           this.gridActive[i][j] &&
    //           this.getProcessigIndexByCellPosition(i, j) !== -1
    //         ) {
    //           this.resetGridActive();
    //         }
    //       }
    //     }
    //   }
    // }


    // if (this.isGridCellActive(y, x)) {
    //   this.gridActive[y][x] = 0

    // }else{
    //   this.gridActive[y][x] = 1
    // }
  }

  getProcessigIndexByCellPosition(y: number, x: number) {
    return this.configuration.Processings.findIndex(
      (t: any) => t.Grid[y][x] == 1
    );
  }

  isGridCellActive(y: number, x: number) {
    return this.gridActive[y][x] === 1;
  }
  computeGridActive() {
    let sum = 0;
    for (let row of this.gridActive) {
      for (let cell of row) {
        sum += cell;
      }
    }
    return sum;
  }

  resetGridActive() {
    this.gridActive = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
  }
  onPlanificationMouseClick(y: number, x: number){
    console.log("fired onPlanificationMouseClick")
    console.log("x",x,"y",y,"this.coordonateFirstClick.x",this.coordonateFirstClick.x)
    if(this.isPlanificationFirstClick){
        this.isPlanificationFirstClick = false
        this.coordonateFirstClick.x = x
        this.coordonateFirstClick.y = y
        if (this.isGridCellActive(y, x)) {
        this.gridActive[y][x] = 0
        }else{
        this.gridActive[y][x] = 1
    }
    }else{
      if(this.isGridCellActive(y,x)){
        this.gridActive[y][x] = 0
        this.isPlanificationFirstClick = true
        this.coordonateFirstClick.x =  null
        this.coordonateFirstClick.y = null
      }else{

          if(y == this.coordonateFirstClick.y){
              let diffBetweenNewXAndPreviousX = x  - this.coordonateFirstClick.x
              let startForLoop = (diffBetweenNewXAndPreviousX > 0) ? this.coordonateFirstClick.x : x
              let stopForLoop = (diffBetweenNewXAndPreviousX > 0) ? x : this.coordonateFirstClick.x
              for(let i = startForLoop ; i <= stopForLoop ; (diffBetweenNewXAndPreviousX > 0) ? i++ : i--  ){
                this.gridActive[y][i] = 1
              }
              this.isPlanificationFirstClick = true
              this.coordonateFirstClick.x =  null
              this.coordonateFirstClick.y = null
          }
      }
    }

  }
  // onPlanificationMouseOver(y: number, x: number){
  //   console.log("fired onPlanificationMouseOver")
  //   if(this.isPlanificationEditing){
  //     if (this.isGridCellActive(y, x)) {
  //       this.gridActive[y][x] = 0
  //     }else{
  //       this.gridActive[y][x] = 1
  //     }
  //   }
  // }

  // onPlanificationMouseDown(){
  //   console.log("fired onPlanificationMouseDown")
  //   this.isPlanificationEditing = true
  // }
  // onPlanificationMouseUp(){
  //   console.log("fird onPlanificationMouseUp")
  //   this.isPlanificationEditing = false
  // }
  // result est exploitable depuis l'appel du modal
  confirm() {
    this.result = this.broadcast;
    this.close();
  }
}
