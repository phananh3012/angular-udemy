import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'databinding-assignment';
  oddArray: number[] = []
  evenArray: number[] = []

  onIntervalFired(i: number) {
    if(i%2 === 0){
      this.evenArray.push(i)
    } else{
      this.oddArray.push(i)
    }
  }
}
