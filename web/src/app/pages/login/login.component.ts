import { Component, OnInit } from '@angular/core';
import {
  state,
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';
import { faAngleRight, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    ])
  ]
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  animateEmail: boolean;
  animatePass: boolean;
  faAngleRight = faAngleRight;
  faSignInAlt = faSignInAlt;
  loginForm: FormGroup;
  loading: boolean;
  isLogin: boolean;
  isRecovery: boolean;

  ngOnInit() {
    this.checkLogin();
    this.loading = false;
    this.animateEmail = false;
    this.animatePass = false;
    this.createForm()
  }

  login() {
    this.loading = true;
    console.log(this.loginForm.value)
  }

  checkLogin() {
    if(this.route.snapshot.url[0].path === "registro") {
      this.isRecovery = false;
      this.isLogin = false;
    } else if(this.route.snapshot.url[0].path === "login") {
      this.isRecovery = false;
      this.isLogin = true;
    } else if(this.route.snapshot.url[0].path === "recuperar-senha") {
      this.isRecovery = true;
    }
  }

  createForm() {
    this.loginForm =  this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      password: ['', Validators.required]
    })
  }

  get controls() { return this.loginForm.controls; }

  animateLabel(event) {
    if(event.target.name === "email" && !event.target.value) {
      this.animateEmail = !this.animateEmail;
    } else if (event.target.name === 'password' && !event.target.value){
      this.animatePass = !this.animatePass;
    }
  }

}
