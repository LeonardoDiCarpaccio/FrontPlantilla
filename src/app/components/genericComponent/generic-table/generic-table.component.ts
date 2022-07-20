import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit {
  @Input() arrMainNgFor: any;
  @Input() arrHeader: any;
  @Input() actions: any;
  @Input() searchBar: any;
  @Input() filter: any;
  @Input() alertMsgFilterNoMatch: string = '';

  copyArrNgFor: any = [];
  searchText = '';
  arrIndexFilter: any[] = [];
  constructor(private alert: AlertService) {}

  ngOnInit(): void {
    this.copyArrNgFor = this.arrMainNgFor.slice();
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

  removeFilter(item: any, indexFilter: any) {
    // in any case, we reset those value
    item.filterValue = '';
    item.filterNgModelValue = '';
    // we remove from the array of filter the current one
    this.arrIndexFilter = this.arrIndexFilter.filter(
      (el: any) => el != indexFilter
    );
    // if filter array length == 0, that mean that we can come back to the initial array
    if (this.arrIndexFilter.length == 0) {
      this.arrMainNgFor = this.copyArrNgFor.slice();
    } else {
      // arrFilter will be the store of filtered value, at the end arrMainNgFor will be equal to it
      let arrFilter: any[] = [];
      // we iterate on the array which store wich filter are still active
      this.arrIndexFilter.forEach((filter: any, index: any) => {
        let temp = [];
        // index zero mean that we filter in the copyNgForArray
        if (index == 0) {
          temp = this.copyArrNgFor.filter(
            (el: any) =>
              el[this.filter[filter].keyNgForFilter] ==
              this.filter[filter].filterNgModelValue
          );
        } else {
          // index>0 mean that we need to filter "ourselves"
          temp = arrFilter.filter(
            (el: any) =>
              el[this.filter[filter].keyNgForFilter] ==
              this.filter[filter].filterNgModelValue
          );
        }
        // to finish we push values to arrFilter
        // if it's the last iteration, the filter is done, and we can make arrFilter = temp
        if (index == this.arrIndexFilter.length - 1) {
          arrFilter = temp.slice();
        } else {
          //while it's not the last we push filtered values in the arrFilter
          temp.forEach((item: any) => {
            arrFilter.find((element: any) => element.id == item.id) == undefined
              ? arrFilter.push(item)
              : null;
          });
        }
      });
      //finally job is done, arrMainNgFor = arrFilter
      this.arrMainNgFor = arrFilter.slice();
    }
  }
}
