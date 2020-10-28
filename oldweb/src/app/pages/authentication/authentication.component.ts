import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {

	constructor(
		private router: Router,
		private personService: PersonService
	) { }

	ngOnInit() {
		this.getLoggedUser();
	}

	private getLoggedUser = (): void => {
		if (this.personService.getLoggedUser) {
			this.router.navigate(['']);
		}
	}
}
