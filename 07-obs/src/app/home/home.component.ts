import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  firstSubscription: Subscription
  constructor() { }

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count)
    //   }
    // )
    const customObservable = new Observable(
      observer => {
        let count = 0
        setInterval(() => {
          observer.next(count)
          if(count === 2){
            observer.complete()
          }
          if(count > 3){
            observer.error(new Error('Count is greater than 3'))
          }
          count++
        },1000)
      }
    )

    this.firstSubscription = customObservable.pipe(filter(data => {
      return data > 0
    }), map((data: number) => {
      return 'Round ' + (data + 1)
    })).subscribe(
      data => {
        console.log(data)
      },
      error => {
        alert(error)
      },
      () => {
        console.log('Completed!')
      }
    )
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe()
  }

}
