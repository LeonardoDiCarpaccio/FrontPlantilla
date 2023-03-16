import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-generic-steps-form',
  templateUrl: './generic-steps-form.component.html',
  styleUrls: ['./generic-steps-form.component.scss'],
})
export class GenericStepsFormComponent implements OnInit {
  @Input() step: any;

  constructor() {}

  ngOnInit(): void {}
}
