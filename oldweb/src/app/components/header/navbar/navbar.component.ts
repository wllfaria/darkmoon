import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { trigger, state, transition, style, query, stagger, animateChild, useAnimation, group, animate } from '@angular/animations';
import { defaultAnimate } from 'src/app/animations/basics.animation';

@Component({
	selector: 'app-navbar',
	animations: [
		trigger('slideNav', [
			state('void', style({ opacity: 0, transform: 'translateX(-100%)' })),
			transition(':enter', [
				useAnimation(defaultAnimate),
				query('@slideItems', animateChild()),
			]),
			transition(':leave', [
				query('@slideItems', animateChild()),
				useAnimation(defaultAnimate),
			])
		]),
		trigger('slideItems', [
			transition(':enter, :leave', [
				query('@slideLi', stagger(30, animateChild()))
			])
		]),
		trigger('slideLi', [
			state('void', style({ opacity: 0, transform: 'translateX(-200%)' })),
			transition(':enter, :leave', [
				useAnimation(defaultAnimate)
			])
		]),
		trigger('filter', [
			state('void', style({ background: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0)' })),
			transition(':enter, :leave', [
				useAnimation(defaultAnimate)
			])
		])
	],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	@Output() private closeEmitter: EventEmitter<void> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	public closeNavbar(): void {
		this.closeEmitter.emit();
	}

}
