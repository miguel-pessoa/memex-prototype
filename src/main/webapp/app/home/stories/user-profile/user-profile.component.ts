import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { UserProfile } from './user-profile.model';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public userProfile: UserProfile;
  account: Account | null = null;
  public coverPicture = '';

  public form: FormGroup = this.formBuilder.group({
    name: new FormControl(''),
    age: new FormControl(''),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    public dialog: MatDialogRef<UserProfileComponent>
  ) {
    this.userProfile = data.user;
    this.form = this.formBuilder.group({
      name: new FormControl(this.userProfile.name),
      age: new FormControl(this.userProfile.age === -1 ? '' : this.userProfile.age),
    });

    this.coverPicture = this.userProfile.coverImage;
  }
  public ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  public closeDialog(): void {
    this.dialog.close();
  }

  public okButton(): void {
    if (this.account) {
      this.userProfile.username = this.account.login;
    }
    this.userProfile.age = this.ageFormControl.value;
    this.userProfile.name = this.nameFormControl.value;
    this.userProfile.coverImage = this.coverPicture;
    this.dialog.close(this.userProfile);
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

  get nameFormControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get ageFormControl(): FormControl {
    return this.form.get('age') as FormControl;
  }
}
