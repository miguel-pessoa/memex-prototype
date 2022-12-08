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
      const journeysWithDate: Journey[] = [];
      journeys.forEach(journey => {
        if (!journey.createdDate) {
          const date = new Date();
          date.setDate(date.getDate() - Math.round(Math.random() * 5));
          journey.createdDate = date.toLocaleDateString('pt-PT');
        }
        journeysWithDate.push(journey);
      });
      this.journeys = journeysWithDate;
      this.journeys = journeys;
      this.selectFilter();
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
