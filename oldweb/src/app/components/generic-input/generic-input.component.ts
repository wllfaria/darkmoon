import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconDefinition, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-generic-input',
    templateUrl: './generic-input.component.html',
    styleUrls: ['./generic-input.component.scss']
})
export class GenericInputComponent implements OnInit {
    constructor() { }

    @Input() public inputId: string;
    @Input() public inputName: string;
    @Input() public inputPlaceholder: string;
    @Input() public inputControlName: string;
    @Input() public inputDisplayText: string;
    @Input() public inputType: string;
    @Input() public inputMask: string;
    @Input() public form: FormGroup;
    @Input() public requiredErrorMessage: string;
    @Input() public patternErrorMessage: string;
    @Input() public minLengthErrorMessage: string;
    @Input() public maxLengthErrorMessage: string;
    @Input() public passwordConfirmationErrorMessage: string;
    @Input() public passwordConfirmationValidator: boolean;
    @Input() public isPassword: boolean;

    public showPassword: boolean = false;

    public eyeIcon: IconDefinition = faEye;
    public eyeSlashIcon: IconDefinition = faEyeSlash;

    ngOnInit() { };

    public togglePasswordVisibility = (passwordElementReference: any): void => {
        this.showPassword = !this.showPassword;
		this.showPassword ? passwordElementReference.type = 'text' : passwordElementReference.type = 'password';
	}
}
