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

	public get cpfRegex(): RegExp {
		return /^(\d{3})(\.)?(\d{3})(\.)?(\d{3})(\-)?(\d{2})$/;
	}

	public get emailOrCpfRegex(): RegExp {
		// tslint:disable-next-line: max-line-length
		return /(^\d{3}(\.)?\d{3}(\.)?\d{3}(\-)?\d{2}$)|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	}

	public get pinRegex(): RegExp {
		return /^[0-9]{6}$/;
	}
}
