import {Component} from '@angular/core';
import {WarningAlertComponent} from "./warning-alert/warning-alert.component";
import {SuccessAlertComponent} from "./success-alert/success-alert.component";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    WarningAlertComponent,
    SuccessAlertComponent,
    FormsModule,
    NgIf,
    NgForOf,
    NgStyle,
    NgClass
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = ''
  isDisplay: boolean = false
  logs: Date[] = []

  onReset() {
    this.username = ''
  }

  onDisplay() {
    this.isDisplay = !this.isDisplay
    this.logs.push(new Date())
  }
}
