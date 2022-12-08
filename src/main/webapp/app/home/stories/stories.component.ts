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
import { CoAuthorDialogComponent } from './co-author-dialog/co-author-dialog.component';
import { Router } from '@angular/router';

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
    private router: Router,
    private userService: UserProfileService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state?.coAuthorsFilter) {
      this.coAuthorsFilter.push(this.router.getCurrentNavigation()?.extras.state?.coAuthorsFilter);
    }
  }

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => {
      if (account?.login) {
        this.userService.findByUsername(account.login).subscribe(result => {
          this.userProfile = result;
        });
      }
      this.account = account;
    });

    this.storiesService.findAll().subscribe(stories => {
      const storiesWDate: Story[] = [];
      stories.forEach(story => {
        if (!story.createdDate) {
          const date = new Date();
          date.setDate(date.getDate() - Math.round(Math.random() * 5));
          story.createdDate = date.toLocaleDateString('pt-PT');
        }
        storiesWDate.push(story);
      });
      this.stories = storiesWDate;
      this.stories.forEach(story => {
        const coAuthors = story.coAuthors ? story.coAuthors.split(';;') : [];
        if (coAuthors.includes(this.account!.login)) {
          this.coAuthorModal(story);
        }
      });
      //this.coAuthorModal(this.stories[0]);
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
      this.displayedStories = this.displayedStories.filter(
        (story: Story) => this.tagsFilter.filter(tag => story.tags.split(';;').includes(tag)).length !== 0
      );
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

  public coAuthorModal(story: Story): void {
    this.dialog
      .open(CoAuthorDialogComponent, {
        data: {
          story,
        },
        restoreFocus: false,
        height: '500px',
        width: '450px',
        panelClass: ['mat-dialog-override'],
      })
      .afterClosed()
      .subscribe((result: boolean | null) => {
        console.warn(result);
        if (result) {
          story.coAuthors = story.coAuthors.replace(this.account!.login, '');
          story.coAuthors = story.coAuthors.replace(';;;;', ';;');
          if (!story.coAuthorsApproved) {
            story.coAuthorsApproved = this.account!.login;
          } else {
            story.coAuthorsApproved = story.coAuthorsApproved.concat(';;'.concat(this.account!.login));
          }
          this.storiesService.update(story).subscribe(_ => console.warn('updated'));
          console.warn(result);
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
