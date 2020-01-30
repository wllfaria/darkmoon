import { Component, OnInit } from '@angular/core';
import {
  state,
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
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
export class RecoveryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  recoveryForm: FormGroup;
  animateEmail: boolean;
  faSearch = faSearch;

  ngOnInit() {
    this.animateEmail = false;
    this.createForm();
  }

  createForm() {
    this.recoveryForm = this.formBuilder.group({
      emailCpf: ['', [Validators.required]]
    })
  }

  get controls() { return this.recoveryForm.controls; }

  animateLabel(event) {
    this.animateEmail = !this.animateEmail;
  }

  recovery() {
    if(this.recoveryForm.invalid) {
      return;
    }
    console.log(this.recoveryForm.value)
  }

}
