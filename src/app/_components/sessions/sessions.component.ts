import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Helpers} from "../../helpers";
import * as moment from 'moment';
import constant from "../../const";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
  animations: [
    trigger('changeDay', [
      state('1', style({
        opacity: 1,
      })),
      state('0', style({
        opacity: 0,
      })),
      transition('0 => 1', [
        animate('0.25s')
      ]),
      transition('1 => 0', [
        animate('0.25s')
      ]),
    ]),
  ]
})
export class SessionsComponent implements OnInit {

  constructor() { }

  @Input() data: any;
  @Input() visible: boolean;
  @Output() bookTicket = new EventEmitter<any>();

  checkCurrent = Helpers.checkCurrent;
  maxTicket = constant.maxTicket;

  momentDate = (date) => moment(date);

  getTime(hour) {
    return `${hour.padStart(2, '0')}:00`;
  }

  ngOnInit() {
  }

}
