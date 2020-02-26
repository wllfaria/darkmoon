import { Injectable } from '@angular/core';
import { IGetCurrentProductRequest } from 'src/app/models/serverRequests/getCurrentProduct.model';
import { ShirtsService } from './shirts.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ISku } from 'src/app/models/sku.model';
import { ISizeMap } from 'src/app/models/custom/sizeMap.model';
import { IShirt } from 'src/app/models/shirt.model';

enum EProductTypes {
    Camisetas = 'camisetas',
}

@Injectable({
	providedIn: 'root'
})
export class ProductService {
    constructor(
        private shirtsService: ShirtsService
    ) {}

    public getCurrentProduct = (productInfo: IGetCurrentProductRequest): Observable<HttpResponse<ISku>>  => {
        switch (productInfo.productType) {
            case EProductTypes.Camisetas: {
                return this.shirtsService.getByUrl(productInfo.productUrl);
            }
        }
    }

    public calculateSizeCount = (product: ISku, productType: string): ISizeMap => {
        switch (productType) {
            case EProductTypes.Camisetas: {
                return this.calculateShirtSizeCount(product);
            }
        }
    }

    private calculateShirtSizeCount = (product: ISku): ISizeMap => {
        const sizeMap: ISizeMap = {
            PP: 0,
            P: 0,
            M: 0,
            G: 0,
            GG: 0
        }
        product.shirts.forEach((shirt: IShirt): ISizeMap => sizeMap[shirt.size.name] += 1)
        return sizeMap;
    }
}
