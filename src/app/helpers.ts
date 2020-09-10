import * as moment from 'moment';
import constant from "./const";

export class Helpers {

  static _newMonth(time) {
    const obj = {};
    const arrTime = [];
    for (let i = constant.startTime; i <= constant.endTime; i += constant.rangeTime) {
      arrTime.push(i);
    }
    for (let i = +time.startOf('month').format('DD'); i <= +time.endOf('month').format('DD'); i++) {
      obj[i] = arrTime.reduce((res, item) => ({
        ...res,
        [item]: Math.floor(Math.random() * (constant.maxTicket + 1))
      }), {});
    }
    return obj;
  }

  static loadTickets(dateMoment, key) {
    let dataTickets;
    const checkLocal = localStorage.getItem(key);
    if (checkLocal) {
      dataTickets = JSON.parse(checkLocal);
    } else {
      dataTickets = this._newMonth(dateMoment);
      localStorage.setItem(key, JSON.stringify(dataTickets));
    }
    return dataTickets;
  }

  static checkCountTickes(tickets) {
    const bsCountTickes = {};
    Object.keys(tickets).forEach(key => {
      bsCountTickes[key] = Object.keys(tickets[key])
        .reduce((res, item) => res += constant.maxTicket - tickets[key][item], 0);
    });
    return bsCountTickes;
  }

  static addOneTicket(momentDay, bookTime) {
    const bookMonth = momentDay.format('MMYYYY');
    const bookDay = +momentDay.format('DD');
    const listSession = this.loadTickets(momentDay, bookMonth);
    let message;
    if (listSession[bookDay][bookTime] === constant.maxTicket || this.checkCurrent(momentDay, bookTime)) {
      message = {
        text: 'Tickets are over',
        param: {
          classname: 'bg-danger text-light',
          delay: 5000
        }
      };
    } else {
      listSession[bookDay][bookTime] = listSession[bookDay][bookTime] + 1;
      localStorage.setItem(bookMonth, JSON.stringify(listSession));
      message = {
        text: 'Ticket booked',
        param: {
          classname: 'bg-success text-light',
          delay: 5000
        }
      };
    }
    return [listSession, listSession[bookDay], message];
  }

  static checkCurrent(momentDay, bookTime = null, fromCalendar = false) {
    const current = moment().startOf('day');
    if (fromCalendar) {
      momentDay = {...momentDay};
      momentDay.month--;
      momentDay = moment(momentDay);
    }
    return current.diff(momentDay, 'days') > 0 ||
      (current.diff(momentDay.startOf('day'), 'days') === 0
        && moment().format('HH') >= (bookTime ?? constant.endTime));
  }
}
