import { Component, OnInit } from "@angular/core";
import { ShirtsService } from "../../core/services/shirts.service";
import { Skus } from 'src/app/models/skus.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  constructor(private shirtsService: ShirtsService) {}

  private shirts: Skus[]
  private pageLoading: boolean;
  private requestError: boolean;
  
  // Everything that needs to be fetched;
  private shirtsLoaded: boolean;

  ngOnInit() {
    this.setLoading();
    this.getDistinctShirts();
  }

  setLoading = () => {
    this.pageLoading = true;
  }

  checkLoading = () => {
    if(
      this.shirtsLoaded
    ) {
      this.pageLoading = false;
    }
  }

  getDistinctShirts = () => {
    this.shirtsService.getDistinct().subscribe(
      (res: HttpResponse<any>) => {
        if(!res.ok) {
          this.requestError = true;
          return;
        }
        this.shirts = res.body;
        console.log(res);
      },
      (error: HttpErrorResponse) => {
        this.requestError = true;
      },
      () => {
        this.shirtsLoaded = true;
        this.checkLoading();
      }
    )
  }
}
