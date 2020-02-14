import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public recoveryForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.recoveryForm = this.formBuilder.group({
      emailCpf: ['', [Validators.required]]
    })
  }

  public get formControls() { return this.recoveryForm.controls }


  public onSubmit = (): void => {
    console.log(this.recoveryForm.value)
    if(this.recoveryForm.invalid) {
      return;
    }
  }

}
