import { Component, OnInit } from "@angular/core";
import { Tops } from "src/app/models/tops";
import { TopsService } from "../../core/services/tops.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private topsService: TopsService) {}

  tops: Array<Tops> = [];

  ngOnInit() {
    this.getAllProducts();
    this.getAllProductsImages();
  }

  getAllProducts() {
    let response: any;
    this.topsService.getAll().subscribe(products => {
      response = products;
      if (response.ok) {
        this.tops.push(<Tops>response.data[0]);
      }
    });
  }

  getAllProductsImages() {
    let response: any;
    this.topsService.getImages().subscribe(
      images => {
        response = images;
        if (response.ok) {
          //! If product has no images it becomes a new array and then pushes every image that matched the id of the product to it.
          response.data.forEach(image => {
            for (let i = 0; i < this.tops.length; i++) {
              if (!this.tops[i].images) {
                this.tops[i].images = [];
              }
              if (image.top_id === this.tops[i].id) {
                this.tops[i].images.push(image);
              }
            }
          });
        }
      },
      error => {},
      () => {}
    );
  }
}
