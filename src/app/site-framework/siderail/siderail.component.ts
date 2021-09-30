import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-siderail',
  templateUrl: './siderail.component.html',
  styleUrls: ['./siderail.component.css'],
})
export class SiderailComponent implements OnInit {
  @Output() updateOrderEvent = new EventEmitter();
  @Output() hideValue: boolean;
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.hideValue = !this.hideValue;
  }
}
