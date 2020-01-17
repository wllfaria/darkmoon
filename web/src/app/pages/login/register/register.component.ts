import { Component, OnInit } from '@angular/core';
import {
  state,
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('animateLabel', [
      state('up', style({
        fontSize: '16px',
        top: '14px',
        left: '12px'
      })),
      state('down', style({
        fontSize: '18px',
        top: '50%'
      })),
      transition('down => up', [
        animate('100ms')
      ]),
      transition('up => down', [
        animate('100ms')
      ])
    ]),
    trigger('animateInput', [
      state('animated', style({
        background: '#ffffff'
      })),
      state('still', style({
        background: '#ededed'
      })),
      transition('still => animated', [
        animate('100ms')
      ]),
      transition('animated => still', [
        animate('100ms')
      ])
    ]),
    trigger('border', [
      state('active', style({
        border: '2px solid #333'
      })),
      state('invactive', style({
        border: 'none'
      })),
      transition('inactive => active', [
        animate('100ms'),
      ]),
      transition('inactive => active', [
        animate('100ms')
      ])
    ]),
    trigger('registerStep', [
      state('keepForm', style({
        transform: 'translateX(0)'
      })),
      state('hideForm', style({
        transform: 'translateX(-200%)',
      })),
      transition('keepForm => hideForm', [
        animate('150ms')
      ])
    ]),
    trigger('registerStepSecond', [
      state('stepHide', style({
        transform: 'translateX(200%)'
      })),
      state('showStep', style({
        transform: 'translateX(0)'
      })),
      transition('stepHide => showStep', [
        animate('150ms')
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  registerForm: FormGroup;
  animateEmail: boolean;
  animatePass: boolean;
  faUserPlus = faUserPlus;
  animatePassConfirm: boolean;
  animateCpf: boolean;
  passwordsDontMatch: boolean;
  loading: boolean;

  ngOnInit() {
    this.animateEmail = false;
    this.loading = false;
    this.animatePass = false;
    this.animatePassConfirm = false;
    this.animateCpf = false;
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}(\.)?\d{3}(\.)?\d{3}(\-)?\d{2}$/)]]
    })
  }

  get controls() { return this.registerForm.controls; }

  animateLabel(event) {
    if(event.target.name === "email" && !event.target.value) {
      this.animateEmail = !this.animateEmail;
    } else if (event.target.name === 'password' && !event.target.value){
      this.animatePass = !this.animatePass;
    } else if (event.target.name === 'passwordConfirmation' && !event.target.value) {
      this.animatePassConfirm = !this.animatePassConfirm
    } else if (event.target.name === 'cpf' && !event.target.value) {
      this.animateCpf = !this.animateCpf;
    }
  }

  register() {
    if(this.registerForm.invalid) {
      return;
    }
    if(this.controls.password.value !== this.controls.passwordConfirmation.value) {
      this.passwordsDontMatch = true;
      return;
    }
    this.loading = true;
    this.passwordsDontMatch = false;
    console.log(this.registerForm.value);
  }
}
