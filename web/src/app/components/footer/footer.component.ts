import { Component, OnInit, ElementRef, HostBinding, ViewChild, AfterViewInit, getPlatform } from '@angular/core';
import { IconDefinition as brandIconDefinition, faInstagram, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { trigger, state, style, transition, useAnimation, animate, query, animateChild, stagger } from '@angular/animations';
import { defaultAnimate } from 'src/app/animations/basics.animation';
import { DeviceDetectorService } from 'ngx-device-detector';

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
				query('@slideItems', stagger(-30, animateChild())),
				query('@flipArrow', stagger(30, animateChild())),
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
export class FooterComponent implements OnInit {

	// ! Icons
	public instagramIcon: brandIconDefinition = faInstagram;
	public facebookIcon: brandIconDefinition = faFacebookF;
	public twitterIcon: brandIconDefinition = faTwitter;
	public chevronUpIcon: IconDefinition = faChevronUp;

	public footerState: string;
	private isMobile: boolean;

	constructor(
		private deviceService: DeviceDetectorService
	) { }

	ngOnInit(): void {
		this.isMobile = this.deviceService.isMobile();
	}

	public toggleFooter(event) {
		if (this.isMobile && (event.type === 'mouseenter' || event.type === 'mouseleave')) { return; }
		if (!this.isMobile && event.type === 'click') { return; }
		this.footerState === 'show' ? this.footerState = '*' : this.footerState = 'show';
	}

}
