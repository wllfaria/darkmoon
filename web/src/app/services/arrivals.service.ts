import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {

  constructor() { }

  public getArrivals() {
    return [
      {
        id: 1,
        name: "Dishearneted Classic Raglan Shirt",
        price: 59.99,
        images: [
          'https://via.placeholder.com/500x350',
          'https://via.placeholder.com/500x350',
        ]
      }
    ]
  }
}
