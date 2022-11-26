import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from './confirm-dialog-data.model';

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData, public dialog: MatDialogRef<ConfirmDialogComponent>) {}

  public closeDialog(): void {
    this.dialog.close();
  }

  public okButton(): void {
    console.warn('beep');
    this.dialog.close(true);
  }
}
