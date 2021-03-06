import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { students } from 'src/app/shared/studentsClass';
import { ClassDetailsService } from '../class-details.service';

@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.css']
})
export class AddMarksComponent implements OnInit {

  @ViewChild(NgForm) editForm: NgForm

  get isDirty(): boolean {
    return this.editForm.dirty ? true : false
  }
  studentsData: students[];
  currentStudent: students;
  get currentClass(): string{
    return this._currentClass
  }
  set currentClass(value: string){
    this._currentClass = value;
    this.classdetails.getClassData(this.currentClass).subscribe(
      res => {
        this.studentsData = res
        this.currentStudent = this.studentsData[0]
        console.log(this.currentStudent)
        console.log(this.studentsData[0], 'hey fooling around lets see if it works')
      },
      err => console.log(err)
    )
  }
  _currentClass: string;
  subject: string;
  count = 0;

  marks = {
    classScore: '',
    examScore: '',
    totalScore: 0
  }

  constructor(public dialogRef: MatDialogRef<AddMarksComponent>, private route: ActivatedRoute, private classdetails: ClassDetailsService, @Inject(MAT_DIALOG_DATA) public data: string) { }
  // this.route.params.subscribe(subject => {
  //   this.subject = subject.subject
  // })

  // this.route.queryParams.subscribe(params => {
  //   this.currentClass = params.class
  // })
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentClass = params.class
      console.log(this.currentClass)
    })

    this.subject = this.data;
    console.log(this.data, 'from this.data heyaaaa')
  }

  nextStudent(): void{
    this.count +=1;
    console.log(this.studentsData[this.count])
    this.currentStudent = this.studentsData[this.count]
  }

  previousStudent(): void {
    this.count -= 1;
    console.log(this.studentsData[this.count])
    this.currentStudent = this.studentsData[this.count]

  }

  onSubmit(): void {
    this.preSubmit();
    this.classdetails.sendMarks(this.marks).subscribe(
      res => {console.log(res); console.log(this.subject, 'logiing thtis.subject'); this.closeDialog()}
    )
    // this.nextStudent()
  }

  preSubmit(): void {
    this.classdetails.subject = this.subject;
    this.classdetails.class = this.currentClass;
    this.classdetails.id = this.currentStudent._id
    this.classdetails.status = 'add'
    this.marks.totalScore = (+this.marks.classScore) + (+this.marks.examScore) 
  }

  closeDialog() {
    
    this.dialogRef.close({
      event: 'close', data : {data: this.marks, id: this.currentStudent._id, dirty: this.isDirty}
    })
  }
}
