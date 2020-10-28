import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-error',
  templateUrl: './request-error.component.html',
  styleUrls: ['./request-error.component.scss']
})
export class RequestErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  refreshPage() {
    window.location.reload();
  }

}
