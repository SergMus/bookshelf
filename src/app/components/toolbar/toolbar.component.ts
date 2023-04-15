import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() isPanelActive: boolean = false;
  @Output() panelBtnClick = new EventEmitter<string>();

  public showPanel() {
    this.panelBtnClick.emit('panel');
  }
}
