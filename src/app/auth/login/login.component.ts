import { Component, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import {AuthModalService} from '../../auth/auth-modal.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }


  ngOnInit(): void {
    // console.log("dhsdhsdhshd")
  }




  // close(){
  //   this.dialog.close();
  // }
  // signup(){
  //   this.dialog.close();
  //   this.authModalService.SignupDialog();
  // }

}
