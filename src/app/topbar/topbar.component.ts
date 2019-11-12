import {Component, OnInit} from '@angular/core';
import {NgbDate, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {DashBoardActionsEnum} from '../redux/dashboard.actions';
import {Store} from '@ngrx/store';
import * as fromStore from '../redux/dashboard.reducer';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private store: Store<fromStore.AppState>) {
  }

  ngOnInit() {
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate && this.toDate) {
      this.store.dispatch({type: DashBoardActionsEnum.modifyFilterDate, from: new Date(this.convertDate(this.fromDate)), to: this.convertDate(this.toDate)});
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  /**
   * Convert ngbDate to Date
   * @param ngbDate
   */
  convertDate(ngbDate) {
    return new Date(ngbDate.year + '-' + ngbDate.month + '-' + ngbDate.day);
  }
}
