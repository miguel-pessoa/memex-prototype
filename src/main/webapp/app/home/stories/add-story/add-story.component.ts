import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { MapComponent } from 'app/shared/components/map/map.component';
import { StoriesService } from '../stories.service';
import { Story } from '../story/story.model';

@Component({
  selector: 'jhi-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.scss'],
})
export class AddStoryComponent implements OnInit {
  @Input()
  public story: Story = new Story();

  public stepCount = 0;

  public account: Account | null = null;

  public tags = [
    'Historic event',
    'Art',
    'Nature',
    'Music and dance',
    'Food',
    'Architecture',
    'Gender',
    'Human & civil rights',
    'Museum',
    'Life event',
  ];
  public selectedTags: string[] = [];
  public selectedAuthors: string[] = [];
  public selectedMedia: string[] = [];
  public coverPicture = '';
  public form: FormGroup = this.formBuilder.group({
    coAuthor: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private location: Location,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private storiesService: StoriesService,
    private accountService: AccountService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state?.story) {
      this.story = this.router.getCurrentNavigation()?.extras.state?.story;
      this.form = this.formBuilder.group({
        coAuthor: new FormControl('', [Validators.required]),
        title: new FormControl(this.story.title, [Validators.required]),
        description: new FormControl(this.story.description, [Validators.required]),
      });
      this.stepCount = 3;
    }
    this.selectedTags = this.stringToArray(this.story.tags);
    this.selectedTags.forEach(tag => {
      if (this.tags.indexOf(tag) === -1) {
        this.tags.push(tag);
      }
      this.coverPicture = this.story.coverImage;
    });
    if (this.story.addCoverImage1) {
      this.selectedMedia.push(this.story.addCoverImage1);
    }
    if (this.story.addCoverImage2) {
      this.selectedMedia.push(this.story.addCoverImage2);
    }
    if (this.story.addCoverImage3) {
      this.selectedMedia.push(this.story.addCoverImage3);
    }
    if (this.story.addCoverImage4) {
      this.selectedMedia.push(this.story.addCoverImage4);
    }
    if (this.story.addCoverImage5) {
      this.selectedMedia.push(this.story.addCoverImage5);
    }
    if (this.story.addCoverImage6) {
      this.selectedMedia.push(this.story.addCoverImage6);
    }
    if (this.story.addCoverImage7) {
      this.selectedMedia.push(this.story.addCoverImage7);
    }
    if (this.story.addCoverImage8) {
      this.selectedMedia.push(this.story.addCoverImage8);
    }
    if (this.story.addCoverImage9) {
      this.selectedMedia.push(this.story.addCoverImage9);
    }
    if (this.story.addCoverImage10) {
      this.selectedMedia.push(this.story.addCoverImage10);
    }
    this.selectedAuthors = this.stringToArray(this.story.coAuthors);
    this.selectedAuthors = this.stringToArray(this.story.coAuthors);
  }
  public ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  public nextStep(step: number): void {
    if (this.stepCount === step) {
      this.stepCount++;
    }
  }

  public publish(): void {
    if (this.account) {
      this.story.author = this.account.login;
    }
    this.story.addCoverImage1 = this.selectedMedia.length > 0 ? this.selectedMedia[0] : '';
    this.story.addCoverImage2 = this.selectedMedia.length > 1 ? this.selectedMedia[1] : '';
    this.story.addCoverImage3 = this.selectedMedia.length > 2 ? this.selectedMedia[2] : '';
    this.story.addCoverImage4 = this.selectedMedia.length > 3 ? this.selectedMedia[3] : '';
    this.story.addCoverImage5 = this.selectedMedia.length > 4 ? this.selectedMedia[4] : '';
    this.story.addCoverImage6 = this.selectedMedia.length > 5 ? this.selectedMedia[5] : '';
    this.story.addCoverImage7 = this.selectedMedia.length > 6 ? this.selectedMedia[6] : '';
    this.story.addCoverImage8 = this.selectedMedia.length > 7 ? this.selectedMedia[7] : '';
    this.story.addCoverImage9 = this.selectedMedia.length > 8 ? this.selectedMedia[8] : '';
    this.story.addCoverImage10 = this.selectedMedia.length > 9 ? this.selectedMedia[9] : '';
    this.story.coverImage = this.coverPicture;
    //this.story.tags = this.;
    this.story.title = this.titleFormControl.value;
    this.story.description = this.descriptionFormControl.value;
    this.storiesService.create(this.story).subscribe((story: Story) => {
      console.warn(story);
      //this.filesService.create(this.coverPicture).subscribe((result: string) => {
      //  console.warn('file');
      //  console.warn(result);
      this.router.navigate(['/']);
      // });
    });
  }

  public openMap(): void {
    this.dialog
      .open(MapComponent, {
        data: {
          lat: 51.673858,
          lon: 7.815982,
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

  public back(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Discard current story?',
          body: 'Your story creation progress will be lost.',
          cancelButton: 'Cancel',
          okButton: 'Discard',
          hasCancel: true,
        },
        restoreFocus: false,
        height: '225px',
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

  public noMoreMedia(): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "You've reached a limit for additional media",
        body: 'Please add only 10 additional media files',
        okButton: 'Ok',
        cancel: false,
      },
      restoreFocus: false,
      height: '225px',
      width: '450px',
      panelClass: ['mat-dialog-override'],
    });
  }

  public addCoAuthor(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const value = this.authorsFormControl.value as string;
      console.warn(value);
      if (this.selectedAuthors.indexOf(value) === -1 && value) {
        this.selectedAuthors.push(value);
      }
    }
    this.story.coAuthors = this.arrayToString(this.selectedAuthors);
  }

  public removeCoAuthor(author: string): void {
    this.selectedAuthors = this.selectedAuthors.filter(a => a !== author);
    this.story.coAuthors = this.arrayToString(this.selectedAuthors);
  }

  public selectTag(tag: string): void {
    console.warn(tag);
    console.warn(this.selectedTags);
    if (this.selectedTags.indexOf(tag) === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(a => a !== tag);
    }
    this.story.tags = this.arrayToString(this.selectedTags);
  }

  public arrayToString(array: string[]): string {
    const result = '';
    array.forEach((a: string) => {
      result.concat(a, ';;');
    });
    return result;
  }

  public stringToArray(strin: string): string[] {
    return strin.split(';;');
  }

  get titleFormControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get descriptionFormControl(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get authorsFormControl(): FormControl {
    return this.form.get('coAuthor') as FormControl;
  }

  public onImageSelected($event: Event): void {
    const files = ($event.target as HTMLInputElement).files;
    console.warn(files);

    if (files) {
      const reader = new FileReader();
      const url = reader.readAsDataURL(files[0]);
      reader.onload = _event => {
        this.storiesService.addImage(reader.result as string);
        this.coverPicture = reader.result as string;
      };
    }
  }

  public onMoreImageSelected($event: Event): void {
    const files = ($event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const url = reader.readAsDataURL(files[i]);
        if (this.selectedMedia.length === 10) {
          this.noMoreMedia();
        }

        reader.onload = _event => {
          this.selectedMedia.push(reader.result as string);
        };
      }
    }
    //this.story.additionalMedia = this.arrayToString(this.selectedMedia);
  }

  public removeAdditionalMedia(media: any): void {
    if (this.selectedMedia.indexOf(media) !== 1) {
      this.selectedMedia = this.selectedMedia.filter(a => a !== media);
      //this.story.additionalMedia = this.arrayToString(this.selectedMedia);
    }
  }
}
