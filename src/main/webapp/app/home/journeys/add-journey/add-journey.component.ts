import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { Journey } from '../journey/journey.model';

@Component({
  selector: 'jhi-add-journey',
  templateUrl: './add-journey.component.html',
  styleUrls: ['./add-journey.component.scss'],
})
export class AddJourneyComponent {
  @Input()
  public journey: Journey = new Journey();

  public stepCount = 0;
  public selectedColor = 1;
  public selectedColorClass = 'color1';
  public form: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(private location: Location, private formBuilder: FormBuilder, private dialog: MatDialog) {}

  get titleFormControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get descriptionFormControl(): FormControl {
    return this.form.get('description') as FormControl;
  }

  public nextStep(step: number): void {
    if (this.stepCount === step) {
      this.stepCount++;
    }
  }

  public selectColor(color: number): void {
    this.selectedColor = color;
    this.selectedColorClass = 'color'.concat(color as unknown as string);
  }

  public publish(): void {
    this.nextStep(-1);
  }

  public back(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Discard current journey?',
          body: 'Your journey creation progress will be lost.',
          cancelButton: 'cancel',
          okButton: 'Ok',
          hasCancel: true,
        },
        restoreFocus: false,
        height: '200px',
        width: '450px',
        panelClass: ['mat-dialog-override'],
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.location.back();
        }
      });
  }
}
