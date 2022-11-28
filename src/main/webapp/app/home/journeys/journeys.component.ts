import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { Story } from '../stories/story/story.model';
import { UserProfile } from '../stories/user-profile/user-profile.model';
import { Journey } from './journey/journey.model';
import { JourneysService } from './journeys.service';

@Component({
  selector: 'jhi-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss'],
})
export class JourneysComponent {
  public filters = false;
  public myJourneys = false;
  public recentJourneys = false;
  public journeys: Journey[] = [];
  public displayedJourneys: Journey[] = [];
  public userProfile: UserProfile = new UserProfile();
  public account: Account | null = null;
  public storyToLink: Story | undefined;

  constructor(
    private router: Router,
    private journeyService: JourneysService,
    private accountService: AccountService,
    private dialog: MatDialog
  ) {
    console.warn('storyToLink');
    console.warn(this.router.getCurrentNavigation()?.extras.state);
    if (this.router.getCurrentNavigation()?.extras.state?.story) {
      this.storyToLink = this.router.getCurrentNavigation()?.extras.state?.story;
    }
  }

  ngOnInit(): void {
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));

    this.journeyService.findAll().subscribe(journeys => {
      this.journeys = journeys;
      this.selectFilter();
    });
  }

  public linkStory(journey: Journey, event: MouseEvent): void {
    if (this.storyToLink) {
      event.stopPropagation();
      this.linkJourneyWithJourney(journey);
    }
  }

  public linkJourneyWithJourney(journey: Journey): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Link journey with selected journey?',
          body: "You can edit the journeys linked in the journey's page",
          cancelButton: 'Cancel',
          okButton: 'Link',
          hasCancel: true,
        },
        restoreFocus: false,
        height: '200px',
        width: '450px',
        panelClass: ['mat-dialog-override'],
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result && this.storyToLink) {
          if (journey.stories) {
            journey.stories.concat(this.storyToLink.id.toString());
          } else {
            journey.stories = this.storyToLink.id.toString();
          }
          this.journeyService.update(journey).subscribe((resultJourney: Journey) => {
            console.warn(resultJourney);
            this.router.navigate(['/story/'.concat(this.storyToLink?.id ? this.storyToLink.id.toString() : '')]);
            this.storyToLink = undefined;
          });
        }
      });
  }

  public toggleFilters(): void {
    this.filters = !this.filters;
  }

  public selectFilter(): void {
    this.displayedJourneys = this.journeys;

    if (this.myJourneys) {
      this.displayedJourneys = this.displayedJourneys.filter((journey: Journey) => {
        console.warn(journey.author);
        console.warn(this.account?.login);
        return journey.author === this.account?.login;
      });
    }
    if (this.recentJourneys) {
      this.displayedJourneys = this.displayedJourneys.filter((journey: Journey) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return new Date(journey.createdDate) >= yesterday;
      });
    }
  }
}
