import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NotificationComponent
  ]
})
export class SharedModule { }
