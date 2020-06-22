import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-skeleton-loader',
	templateUrl: './skeleton-loader.component.html',
	styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent implements OnInit {

	@Input() public width: string;
	@Input() public percentageWidth: boolean;
	@Input() public height: string;
	@Input() public percentageHeight: boolean;
	@Input() public circle: boolean;

	constructor() { }

	ngOnInit(): void {
	}

	public get getStyles() {
		const styles = { };
		this.percentageWidth ? styles['width.%'] = this.width ? this.width : '' : styles['width.px'] = this.width ? this.width : '';
		this.percentageHeight ? styles['height.%'] = this.height ? this.height : '' : styles['height.px'] = this.height ? this.height : '';
		styles['border-radius'] = this.circle ? '50%' : '';
		return styles;
	}

}
