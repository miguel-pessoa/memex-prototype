import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphInfoDialogData } from './graph-info-dialog-data.model';

@Component({
  templateUrl: './graph-info-dialog.component.html',
  styleUrls: ['./graph-info-dialog.component.scss'],
})
export class GraphInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: GraphInfoDialogData, public dialog: MatDialogRef<GraphInfoDialogComponent>) {}

  public closeDialog(): void {
    this.dialog.close();
  }

  public okButton(): void {
    console.warn('beep');
    this.dialog.close(true);
  }
}
