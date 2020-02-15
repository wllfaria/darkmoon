import { Component, OnInit, ViewChild } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { faShoppingCart, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { PersonService } from 'src/app/core/services/person.service';
import { UserService } from 'src/app/core/services/user.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(
		private router: Router,
		private personService: PersonService,
		private userService: UserService
	) { }

	@ViewChild(CartComponent) cart: CartComponent;

	public loggedUser: any;
	private parsedToken: any;


	// Everything that need to be fetched;
	private userLoaded: boolean;
	public loading: boolean;

	public faShoppingCart: IconDefinition = faShoppingCart;
	public faUser: IconDefinition = faUser;

	ngOnInit() {
		this.setLoading();
		this.verifyUser();
		this.getUser();
		this.routerEvents();
	}

	private setLoading = (): void => {
		this.loading = true;
	}

	private checkLoading = (): void => {
		if (
			this.userLoaded
		) {
			this.loading = false;
		}
	}

	private getUser = (): void => {
		if (!this.parsedToken) { return; }

		this.userService.getById(this.parsedToken.id).subscribe(
			(res: HttpResponse<any>): void => {
				if (!res.ok) { return; }
				console.log(res);
				this.loggedUser = res.body.person;
			},
			(error: HttpErrorResponse): void => { },
			(): void => {
				this.userLoaded = true;
				this.checkLoading();
			}
		);
	}

	private routerEvents = (): void => {
		this.router.events.subscribe(
			(event: RouterEvent): void => {
				if (event instanceof NavigationEnd) {
					this.verifyUser();
				}
			}
		);
	}

	private verifyUser = (): void => {
		this.parsedToken = this.personService.getLoggedUser;
		if (!this.parsedToken) {
			this.loggedUser = null;
			return;
		}
	}



	toggleCart(): void {
		this.cart.toggleCart();
	}
}
