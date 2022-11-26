import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Map } from './map.model';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  public map: Map;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Map, public dialog: MatDialogRef<MapComponent>) {
    this.map = data;
  }

  public closeDialog(): void {
    this.dialog.close();
  }

  public okButton(): void {
    console.warn('beep');
    this.dialog.close(this.map);
  }
}
