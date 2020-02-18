import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RegexService {
	constructor() {}

	public get emailRegex(): RegExp {
		// tslint:disable-next-line: max-line-length
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	}

	public get cpfRegex() {
		return /^(\d{3})(\.)?(\d{3})(\.)?(\d{3})(\-)?(\d{2})$/;
	}
}
