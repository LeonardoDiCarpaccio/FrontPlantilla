import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CommandService } from 'src/app/services/crud/command.service';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-generic-table-myorder',
  templateUrl: './generic-table-myorder.component.html',
  styleUrls: ['./generic-table-myorder.component.scss'],
})
export class GenericTableMyorderComponent implements OnInit {
  @Input() arrMainNgFor: any;
  @Input() arrHeader: any;
  @Input() actions: any;
  @Input() status: any;
  @Input() colorBtn: any;

  @Input() searchBar: any;
  @Input() filter: any;
  @Input() alertMsgFilterNoMatch: string = '';
  @Input() statusStored: any;

  display: boolean = false;
  copyArrNgFor: any = [];
  searchText = '';
  arrIndexFilter: any[] = [];
  availableBtn: boolean = false;
  beforeBtn: any;
  beforeDisplayDetails: any;
  Show: boolean = false;
  statusStoredHisto: any;
  id: any;
  commandDetails: any;

  constructor(
    private alert: AlertService,
    private commandService: CommandService,
    private helperService: HelpersService
  ) {}

  ngOnInit(): void {
    this.statusStoredHisto = this.statusStored;
    this;
    this.copyArrNgFor = this.arrMainNgFor.slice();
  }

  toggleFunction(node) {
    if (this.beforeBtn != node.id && this.availableBtn) {
      this.arrMainNgFor.find((a) =>
        a.id == this.beforeBtn ? (a.isSelected = false) : null
      );
      node.isSelected = true;
      this.availableBtn = true;
    } else {
      this.availableBtn = !this.availableBtn;
      if (!this.availableBtn) {
        node.isSelected = false;
      } else {
        node.isSelected = true;
      }
    }
    this.statusStored = this.statusStoredHisto;

    this.beforeBtn = node.id;
  }
  storeStatus(input: any) {
    // this.statusStored = input.target.value;
    if (input.target.value == this.statusStored) {
      this.statusStored = 0;
    } else {
      this.statusStored = input.target.value;
    }
  }

  // async updateStatus(command: any) {

  //   if (this.statusStored == 0) {
  //     this.alert.warn(
  //       'No Se Puede Guardar Un Pedido Sin Estado De Processamiento'
  //     );
  //   } else {
  //     let update = {
  //       id: command.id,
  //       clientId: command.clientId,
  //       creationDate: command.creationDate,
  //       finishDateDisplay:
  //         this.statusStored == 3 ? this.helperService.dateNowString() : null,
  //       Price: command.price,
  //       statusId: this.statusStored,
  //     };
  //     this.commandService.insertUpdateCommand(update).subscribe((res) => {
  //       if (res) {
  //         this.alert.success(
  //           'El Estado del pedido fueron modificado en la base de datos !'
  //         );
  //         window.location.reload();
  //       } else {
  //         this.alert.error('El servidor se encontro con un problema');
  //       }
  //     });
  //   }
  //   this.toggleFunction(command);
  // }

  displayDetails(node) {
    if (this.beforeDisplayDetails != node.id && this.display) {
      this.arrMainNgFor.find((a) =>
        a.id == this.beforeDisplayDetails ? (a.selectedItem = false) : null
      );
      node.selectedItem = true;
      this.display = true;
    } else {
      this.display = !this.display;
      if (!this.display) {
        node.selectedItem = false;
      } else {
        node.selectedItem = true;
      }
    }

    this.commandDetails = node;
    this.beforeDisplayDetails = node.id;
  }

  filterFunction(filterValue: any, item: any, indexFilter: any) {
    // first case, it's the first time we filter so it's just filtering on the copyArray
    if (this.arrIndexFilter.length == 0) {
      this.arrMainNgFor = this.copyArrNgFor.filter(
        (el: any) => el[item.keyNgForFilter] == filterValue.target.value
      );
      // testing if key option is an array of obj, if it's an array of string item.filterValue == filterValue.target.value Otherwise we use a find with el[item.keyOptionFilter]
      item.filterValue =
        item.keyOptionFilter == ''
          ? filterValue.target.value
          : item.option.find(
              (el: any) => el[item.keyOptionFilter] == filterValue.target.value
            )[item.optionDisplaykey];
      //indexFilter deserve to store which filter which have been already used
      this.arrIndexFilter.push(indexFilter);
    } else {
      // second case, it mean that we're filtering an array already filtered with new conditions, the filter is not on the copyArray but on the iterating ngfor one
      this.arrMainNgFor = this.arrMainNgFor.filter(
        (el: any) => el[item.keyNgForFilter] == filterValue.target.value
      );
      // if the length of the iterating ngfor array == 0, we've to remove all filtr and make it equal to the copyArray
      if (this.arrMainNgFor.length == 0) {
        //we reset those values which are only for display logic
        this.filter.forEach((element: any, index: any) => {
          element.filterValue = '';
          element.filterNgModelValue = '';
          // we force the select to come back to the "start state"
          let a = document.getElementById('select' + index) as HTMLInputElement;
          a.value = '';
        });
        this.arrIndexFilter = [];
        this.arrMainNgFor = this.copyArrNgFor.slice();
        // we notify the user that those filter correspond to no one row
        this.alert.info(this.alertMsgFilterNoMatch);
      } else {
        // the ngFor array still contain value, we just do the same job as upper to get the filter value
        item.filterValue =
          item.keyOptionFilter == ''
            ? filterValue.target.value
            : item.option.find(
                (el: any) =>
                  el[item.keyOptionFilter] == filterValue.target.value
              )[item.optionDisplaykey];
        this.arrIndexFilter.push(indexFilter);
      }
    }
  }
}
