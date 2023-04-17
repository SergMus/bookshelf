import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToggleState } from 'src/app/shared/models/toggle.enum';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() isPanelActive: boolean | null = false;
  @Output() panelBtnClick = new EventEmitter<string>();

  public showPanel() {
    this.panelBtnClick.emit(ToggleState.Panel);
  }
}
