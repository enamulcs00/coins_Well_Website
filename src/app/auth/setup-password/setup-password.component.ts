import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import {AuthModalService} from '../../auth/auth-modal.service';
@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.scss']
})
export class SetupPasswordComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }
 
  // WhatsEmailid(){
  //   this.dialog.close();
  //   this.authModalService.WhatsEmailidDialog();
  // }
}
