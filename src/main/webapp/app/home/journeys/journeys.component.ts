import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { Story } from '../stories/story/story.model';
import { Journey } from './journey/journey.model';

@Component({
  selector: 'jhi-journeys',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss'],
})
export class JourneysComponent {
  public journeys = [new Journey(), new Journey(), new Journey(), new Journey()];

  public storyToLink: Story | undefined;

  constructor(private router: Router, private dialog: MatDialog) {
    if (this.router.getCurrentNavigation()?.extras.state?.story) {
      this.storyToLink = this.router.getCurrentNavigation()?.extras.state?.story;
    }
  }

  public linkStoryWithJourney(journey: Journey): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Link story with selected journey?',
          body: "You can edit the stories linked in the journey's page",
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
          journey.stories.push(this.storyToLink);
        }
      });
  }
}
