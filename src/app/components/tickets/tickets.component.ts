import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as moment from 'moment';
import {Helpers} from "../../helpers";
import {ToastService} from "../../_services/toast-service";
import constant from "../../const";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketsComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  lowTicket = constant.lowTicket;
  bsValue = null;
  dataTickets = {};
  bsCountTickes = {};
  currentMonth = moment().format('MMYYYY');
  sessions = null;
  visible = false;
  checkCurrent = Helpers.checkCurrent;

  changeDay(event) {
    this.visible = false;
    setTimeout(() => this.visible = true, 200);
    event.month--;
    this.sessions = {day: +moment(event), session: this.dataTickets[event.day]};
  }

  changeMonth(event) {
    event.month--;
    this.currentMonth = moment(event).format('MMYYYY');
    this.dataTickets = Helpers.loadTickets(moment(event), this.currentMonth);
    this.bsCountTickes = Helpers.checkCountTickes(this.dataTickets);
  }

  bookTicket(event) {
    let message;
    [this.dataTickets, this.sessions.session, message] = Helpers.addOneTicket(moment(event.day), event.time);
    this.toastService.show(message.text, message.param);
    this.bsCountTickes = Helpers.checkCountTickes(this.dataTickets);
  }

  ngOnInit() {
  }

}
