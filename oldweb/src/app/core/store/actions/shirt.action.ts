import { Action } from '@ngrx/store';
import { ISku } from 'src/app/models/sku.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

export enum EShirtActions {
	GetShirtByUrl = '[Shirt] Get Shirt By Url',
	GetShirtByUrlSuccess = '[Shirt] Get Shirt By Url Success',
	GetShirtByUrlFailed = '[Shirt] Get Shirt By Url Failed',
}

export class GetShirtByUrl implements Action {
	public readonly type: EShirtActions.GetShirtByUrl = EShirtActions.GetShirtByUrl;
	constructor(public payload: string) { }
}

export class GetShirtByUrlSuccess implements Action {
	public readonly type: EShirtActions.GetShirtByUrlSuccess = EShirtActions.GetShirtByUrlSuccess;
	constructor(public payload: HttpResponse<ISku[]>) { }
}

export class GetShirtByUrlFailed implements Action {
	public readonly type: EShirtActions.GetShirtByUrlFailed = EShirtActions.GetShirtByUrlFailed;
	constructor(public payload: HttpErrorResponse) { }
}

export type ShirtActions =
| GetShirtByUrl
| GetShirtByUrlSuccess
| GetShirtByUrlFailed;
