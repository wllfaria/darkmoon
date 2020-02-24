import { Action } from '@ngrx/store';
import { ISku } from 'src/app/models/sku.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

export enum EProductActions {
    UpdateCurrentProduct = '[Product] Update Current Product',
    GetCurrentProduct = '[Product] Get Current Product',
    GetCurrentProductSuccess = '[Product] Get Current Product Success',
    GetCurrentProductFailed = '[Product] Get Current Product Failed'
}

export class UpdateCurrentProduct implements Action {
    public readonly type: EProductActions.UpdateCurrentProduct = EProductActions.UpdateCurrentProduct;
    constructor(public payload: ISku) { }
}

export class GetCurrentProduct implements Action {
    public readonly type: EProductActions.GetCurrentProduct = EProductActions.GetCurrentProduct;
    constructor(public payload: string) { }
}

export class GetCurrentProductSuccess implements Action {
    public readonly type: EProductActions.GetCurrentProductSuccess = EProductActions.GetCurrentProductSuccess;
    constructor(public payload: HttpResponse<ISku>) { }
}

export class GetCurrentProductFailed implements Action {
    public readonly type: EProductActions.GetCurrentProductFailed = EProductActions.GetCurrentProductFailed;
    constructor(public payload: HttpErrorResponse) { }
}

export type ProductActions =
| UpdateCurrentProduct
| GetCurrentProduct
| GetCurrentProductSuccess
| GetCurrentProductFailed;
