import { Component, OnInit } from '@angular/core';
import { ArrivalsService } from '../../services/arrivals.service';

@Component({
  selector: 'app-arrival',
  templateUrl: './arrival.component.html',
  styleUrls: ['./arrival.component.scss']
})
export class ArrivalComponent implements OnInit {
  products: Array<Object> = []
  constructor(private _arrivalsService: ArrivalsService) { }

  ngOnInit() {
    this.products = this._arrivalsService.getArrivals()
  }

}
