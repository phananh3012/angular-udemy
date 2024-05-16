import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {
  @Output() ref = new EventEmitter<number>()
  interval = 0
  i = 0
  onStart(){
    this.interval = setInterval(()=>{
      this.ref.emit(this.i+1)
      this.i++
    },1000)
  }

  onPause() {
    clearInterval(this.interval)
  }
}
