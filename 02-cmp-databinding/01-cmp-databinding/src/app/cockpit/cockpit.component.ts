import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ blueprintName: string, blueprintContent: string }>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', {static : true}) serverContentInput: ElementRef;
  onAddServer(serverNameInput : HTMLInputElement){
    this.serverCreated.emit(
      {serverName: serverNameInput.value, serverContent: this.serverContentInput.nativeElement.value})
  }

  onAddBlueprint(serverNameInput : HTMLInputElement){
    this.blueprintCreated.emit(
      {blueprintName: serverNameInput.value, blueprintContent: this.serverContentInput.nativeElement.value})
  }
}
