import { Action } from '@ngrx/store';
import { ISku } from 'src/app/models/sku.model';

export enum ECartActions {
    AddCartItem = '[Cart] Add product',
    AddCartItemSuccess = '[Cart] Add product success',
    RemoveCartItem = '[Cart] Remove product',
    RemoveCartItemSuccess = '[Cart] Remove product success',
    GetCurrentCart = '[Cart] Get current cart',
    GetCurrentCartSuccess = '[Cart] Get current cart success'
}

export class AddCartItem implements Action {
    public readonly type: ECartActions = ECartActions.AddCartItem;
    constructor(public payload: ISku) { }
}

export class AddCartItemSuccess implements Action {
    public readonly type: ECartActions = ECartActions.AddCartItemSuccess;
    constructor() { }
}

export class RemoveCartItem implements Action {
    public readonly type: ECartActions = ECartActions.RemoveCartItem;
    constructor(public payload: ISku) { }
}

export class RemoveCartItemSuccess implements Action {
    public readonly type: ECartActions = ECartActions.RemoveCartItemSuccess;
    constructor() { }
}

export class GetCurrentCart implements Action {
    public readonly type: ECartActions.GetCurrentCart = ECartActions.GetCurrentCart;
    constructor() { }
}

export class GetCurrentCartSuccess implements Action {
    public readonly type: ECartActions.GetCurrentCartSuccess = ECartActions.GetCurrentCartSuccess;
    constructor(public payload: ISku[]) { }
}

export type CartActions =
| AddCartItem
| AddCartItemSuccess
| RemoveCartItem
| RemoveCartItemSuccess
| GetCurrentCart
| GetCurrentCartSuccess
