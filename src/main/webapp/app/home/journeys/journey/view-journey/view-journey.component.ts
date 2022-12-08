import { Component, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoriesService } from 'app/home/stories/stories.service';
import { Story } from 'app/home/stories/story/story.model';
import { UserProfileService } from 'app/home/stories/user-profile/user-profile.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { JourneysService } from '../../journeys.service';
import { Journey } from '../journey.model';
import { Location } from '@angular/common';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-view-journey',
  templateUrl: './view-journey.component.html',
  styleUrls: ['./view-journey.component.scss'],
})
export class ViewJourneyComponent implements AfterViewInit {
  public journey: Journey = new Journey();
  public storyToLink: Story | undefined;
  public canEdit = false;
  public storiesInJourney: Story[] = [];

  constructor(
    private userProfileService: UserProfileService,
    private storyService: StoriesService,
    private router: Router,
    private journeyService: JourneysService,
    private location: Location,
    private dialog: MatDialog,
    private accountService: AccountService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state?.story) {
      this.storyToLink = this.router.getCurrentNavigation()?.extras.state?.story;
    }
    if (this.router.getCurrentNavigation()?.extras.state?.journey) {
      this.journey = this.router.getCurrentNavigation()?.extras.state?.journey;
      this.accountService.getAuthenticationState().subscribe(result => {
        this.canEdit = this.journey.author === result?.login;
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.journey.storiesIds) {
      this.storyService.findAll().subscribe(allStories => {
        this.journey.storiesIds.split(';;').forEach(id => {
          const storyToPush: Story[] = allStories.filter(a => a.id.toString() === id);
          if (storyToPush.length === 1) {
            const story = storyToPush[0];
            if (!story.createdDate) {
              const date = new Date();
              date.setDate(date.getDate() - Math.round(Math.random() * 5));
              story.createdDate = date.toLocaleDateString('pt-PT');
            }
            this.storiesInJourney.push(story);
          }
        });
      });
    }

    if (this.storyToLink) {
      this.linkJourneyWithJourney(this.journey);
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
        height: '225px',
        width: '450px',
        panelClass: ['mat-dialog-override'],
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result && this.storyToLink) {
          if (journey.storiesIds) {
            journey.storiesIds = journey.storiesIds.concat(';;');
            journey.storiesIds = journey.storiesIds.concat(this.storyToLink.id.toString());
          } else {
            journey.storiesIds = this.storyToLink.id.toString();
          }
          this.journeyService.update(journey).subscribe((resultJourney: Journey) => {
            console.warn(resultJourney);
            this.router.navigate(['/story/'.concat(this.storyToLink?.id ? this.storyToLink.id.toString() : '')], {
              state: { story: this.storyToLink },
            });
            this.storyToLink = undefined;
          });
        }
      });
  }

  public returnDate(date: string): string {
    return date ? date.split('T')[0] : '';
  }

  public deleteJourneyPopup(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Delete current journey?',
          body: 'Your journey will be deleted.',
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
          this.journeyService.delete(this.journey.id).subscribe(() => {
            console.warn('deleted');
            this.location.back;
          });
        }
      });
  }
}
