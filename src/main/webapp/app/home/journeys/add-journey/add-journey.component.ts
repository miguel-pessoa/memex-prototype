import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { Journey } from '../journey/journey.model';
import { JourneysService } from '../journeys.service';

@Component({
  selector: 'jhi-add-journey',
  templateUrl: './add-journey.component.html',
  styleUrls: ['./add-journey.component.scss'],
})
export class AddJourneyComponent implements OnInit {
  @Input()
  public journey: Journey = new Journey();

  public account: Account | null = null;
  public stepCount = 0;
  public selectedColor = 1;
  public coverPicture = '';
  public selectedColorClass = 'color1';
  public form: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private location: Location,
    private journeyService: JourneysService,
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
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

  public onImageSelected($event: Event): void {
    const files = ($event.target as HTMLInputElement).files;
    console.warn(files);

    if (files) {
      const reader = new FileReader();
      const url = reader.readAsDataURL(files[0]);
      reader.onload = _event => {
        this.coverPicture = reader.result as string;
      };
    }
  }

  public publish(): void {
    if (this.account) {
      this.journey.author = this.account.login;
    }
    this.journey.coverImage = this.coverPicture;
    this.journey.title = this.titleFormControl.value;
    this.journey.description = this.descriptionFormControl.value;
    this.journeyService.create(this.journey).subscribe((journey: Journey) => {
      console.warn(journey);
      this.router.navigate(['/journeys']);
      // });
    });
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
