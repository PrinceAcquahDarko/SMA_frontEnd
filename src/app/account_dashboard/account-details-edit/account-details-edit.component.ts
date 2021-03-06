import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ClassDetailsService } from 'src/app/dashboard/class-details.service';
import { account, students } from 'src/app/shared/studentsClass';

@Component({
  selector: 'app-account-details-edit',
  templateUrl: './account-details-edit.component.html',
  styleUrls: ['./account-details-edit.component.css']
})
export class AccountDetailsEditComponent implements OnInit {
  currentClass: string;
  currentStudent: students
  amount: account = {
    paid: 0
  }
  delete = false
  constructor(public dialogRef: MatDialogRef<AccountDetailsEditComponent>,private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any, private classdetails: ClassDetailsService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.currentClass = params.class
      console.log(this.currentClass)
   })
    this.currentStudent = this.data
    this.amount.paid = this.data.fees.paid
  }

  onSubmit(): void {
    console.log('hey')
    this.preSubmit()
    this.classdetails.sendFees(this.amount).subscribe(
      res =>{ console.log(res); this.closeDialog()}
    )
  }

  onDelete(): void {
    this.delete = true
    this.closeDialog()
  }

  preSubmit(): void {
    this.classdetails.class = this.currentClass;
    this.classdetails.id = this.currentStudent._id
  }


  closeDialog() {
    this.dialogRef.close({
      event: 'close', data : {data: this.amount, id: this.currentStudent._id, delete: this.delete}
    })
  }


}
