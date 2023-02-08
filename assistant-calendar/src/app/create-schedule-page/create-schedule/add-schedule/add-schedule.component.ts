import { Component, Inject, Optional } from '@angular/core';
import { Deliverable } from '../deliverable';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent {

  action?:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<AddScheduleComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Deliverable) {
    this.local_data = {...data};
    console.log(this.local_data);
    this.action = this.local_data.action;
  }

  addNewDeliverable(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }
}
