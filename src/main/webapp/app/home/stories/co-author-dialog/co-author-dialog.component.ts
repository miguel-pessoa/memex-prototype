import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoAuthorDialogData } from './co-author-dialog-data.model';

@Component({
  templateUrl: './co-author-dialog.component.html',
  styleUrls: ['./co-author-dialog.component.scss'],
})
export class CoAuthorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CoAuthorDialogData, public dialog: MatDialogRef<CoAuthorDialogComponent>) {}

  public closeDialog(): void {
    this.dialog.close();
  }

  public okButton(): void {
    this.dialog.close(true);
  }
}
