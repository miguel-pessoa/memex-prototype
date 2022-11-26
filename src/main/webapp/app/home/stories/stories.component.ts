import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoriesService } from './stories.service';
import { Story } from './story/story.model';
import { UserProfile } from './user-profile/user-profile.model';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileService } from './user-profile/user-profile.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'jhi-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  public filters = false;
  public myStories = false;
  public recentStories = false;
  public stories: Story[] = [];
  public displayedStories: Story[] = [];
  public userProfile: UserProfile = new UserProfile();
  public account: Account | null = null;
  public coAuthorsFilter: string[] = [];
  public tagsFilter: string[] = [];
  public form: FormGroup = this.formBuilder.group({
    coAuthor: new FormControl(''),
    tags: new FormControl(''),
  });

  constructor(
    private storiesService: StoriesService,
    private dialog: MatDialog,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account?.login) {
        this.userService.findByUsername(account.login).subscribe(result => {
          this.userProfile = result;
        });
      }
    });

    this.storiesService.findAll().subscribe(stories => {
      this.stories = stories;
      this.selectFilter();
    });
  }

  public toggleFilters(): void {
    this.filters = !this.filters;
  }

  public selectFilter(): void {
    this.displayedStories = this.stories;

    if (this.myStories) {
      this.displayedStories = this.displayedStories.filter((story: Story) => {
        console.warn(story.author);
        console.warn(this.account?.login);
        return story.author === this.account?.login;
      });
    }
    if (this.recentStories) {
      this.displayedStories = this.displayedStories.filter((story: Story) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return new Date(story.createdDate) >= yesterday;
      });
    }
    if (this.coAuthorsFilter.length !== 0) {
      this.displayedStories = this.displayedStories.filter((story: Story) => this.coAuthorsFilter.indexOf(story.author) !== -1);
    }
    if (this.tagsFilter.length !== 0) {
      this.displayedStories = this.displayedStories.filter((story: Story) => this.tagsFilter.indexOf(story.author) !== -1);
    }
  }

  public addCoAuthorFilter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const value = this.authorsFormControl.value as string;
      console.warn(value);
      if (this.coAuthorsFilter.indexOf(value) === -1 && value) {
        this.coAuthorsFilter.push(value);
      }
      this.selectFilter();
    }
  }

  public removeCoAuthorFilter(author: string): void {
    this.coAuthorsFilter = this.coAuthorsFilter.filter(a => a !== author);
    this.selectFilter();
  }

  public addTagsFilter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const value = this.tagsFormControl.value as string;
      console.warn(value);
      if (this.tagsFilter.indexOf(value) === -1 && value) {
        this.tagsFilter.push(value);
      }
      this.selectFilter();
    }
  }

  public removeTagsFilter(tag: string): void {
    this.tagsFilter = this.tagsFilter.filter(a => a !== tag);
    this.selectFilter();
  }

  public userProfileModal(): void {
    this.dialog
      .open(UserProfileComponent, {
        data: {
          user: this.userProfile,
        },
        restoreFocus: false,
        height: '336px',
        width: '450px',
        panelClass: ['mat-dialog-override'],
      })
      .afterClosed()
      .subscribe((result: UserProfile | null) => {
        if (result) {
          this.userService.create(this.userProfile).subscribe((resultProfile: UserProfile) => {
            this.userProfile = resultProfile;
          });
        }
      });
  }

  get authorsFormControl(): FormControl {
    return this.form.get('coAuthor') as FormControl;
  }
  get tagsFormControl(): FormControl {
    return this.form.get('tags') as FormControl;
  }
}
