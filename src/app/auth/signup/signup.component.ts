import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // onLogin(){
  //   this.dialog.close();
  //   this.authModalService.loginDialog();
  // }
  // signupactivate(){
  //   this.dialog.close();
  //   this.authModalService.SignupactivateDialog();
  // }
}
