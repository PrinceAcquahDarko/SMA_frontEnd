import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminService } from '../admin.service';



const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-headie-details',
  templateUrl: './headie-details.component.html',
  styleUrls: ['./headie-details.component.css']
})
export class HeadieDetailsComponent implements OnInit {
 
  public isScreenSmall: boolean;
  
  schoolData$ = this.adminservice.schoolData$.pipe(
    map(data => data[0].classGroup),
    catchError(err => {
      // this.errMsg = err;
      return EMPTY
    })
 )

  constructor(private adminservice: AdminService, private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {
    console.log(this.schoolData$);
    console.log('u guys are givin me headache')

     this.breakpointObserver.observe([
      `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
    ]).subscribe(
      (state: BreakpointState) =>  {
        this.isScreenSmall = state.matches
      }
    )
  
  }


  logout(): void{
    localStorage.clear()
    this.router.navigate(['/logout'])

    

  }

}
