import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-builder',
  templateUrl: './svg-builder.component.html',
  styleUrls: ['./svg-builder.component.scss']
})
export class SvgBuilderComponent implements OnInit {

  @Input() svg : string = "";
  @Input() color : string = ""
  @Input() class : string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
