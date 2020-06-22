import { Component, OnInit, ElementRef, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { IconDefinition as brandIconDefinition, faInstagram, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, useAnimation, animate, query, animateChild, stagger } from '@angular/animations';
import { defaultAnimate } from 'src/app/animations/basics.animation';

@Component({
	selector: 'app-footer',
	animations: [
		trigger('footerHeight', [
			state('*', style({ height: 0 })),
			state('show', style({ height: '*' })),
			transition('* => show', [
				animate('300ms cubic-bezier(.8,0,1,1)'),
				query('@slideItems', stagger(30, animateChild())),
				query('@flipArrow', stagger(30, animateChild())),
			]),
			transition('show => *', [
				query('@flipArrow', stagger(30, animateChild())),
				query('@slideItems', stagger(-30, animateChild())),
				animate('300ms cubic-bezier(.8,0,1,1)'),
			])
		]),
		trigger('slideItems', [
			transition('* => show', [
				style({ opacity: 0, transform: 'translateY(100%)' }),
				animate('200ms cubic-bezier(.8,0,1,1)')
			]),
			transition('show => *', [
				animate('200ms cubic-bezier(.8,0,1,1)', style({ opacity: 0, transform: 'translateY(100%)' }))
			])
		]),
		trigger('flipArrow', [
			state('*', style({ transform: 'rotate(0)' })),
			state('show', style({ transform: 'rotate(180deg)' })),
				transition('* => show', [
				// style({ transform: 'rotate(0deg)' }),
				animate('150ms cubic-bezier(.8,0,1,1)')
			]),
			transition('show => *', [
				animate('150ms cubic-bezier(.8,0,1,1)')
			])
		])
	],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {

	// ! Icons
	public instagramIcon: brandIconDefinition = faInstagram;
	public facebookIcon: brandIconDefinition = faFacebookF;
	public twitterIcon: brandIconDefinition = faTwitter;
	public chevronUpIcon: IconDefinition = faChevronUp;

	public showFooter: boolean = false;

	@ViewChild('hidden', { static: false }) private hidden: ElementRef;

	footerState;

	constructor() { }

	ngOnInit(): void {

	}

	ngAfterViewInit() {
		console.log(this.hidden.nativeElement.clientHeight);
	}

	public toggleFooter() {
		this.footerState === 'show' ? this.footerState = '*' : this.footerState = 'show';
	}

}
