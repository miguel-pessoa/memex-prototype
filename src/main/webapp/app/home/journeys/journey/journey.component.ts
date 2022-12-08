import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Story } from 'app/home/stories/story/story.model';
import { UserProfileService } from 'app/home/stories/user-profile/user-profile.service';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { JourneysService } from '../journeys.service';
import { Journey } from './journey.model';

@Component({
  selector: 'jhi-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent {
  @Input()
  public journey: Journey = new Journey();
  public stories: string[] = [];
  public userImage = '';
  @Input()
  public storyToLink: Story | undefined;

  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private journeyService: JourneysService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    console.warn('journeySquare');
    console.warn(this.storyToLink);
    this.userProfileService.findByUsername(this.journey.author).subscribe(result => {
      if (result.id) {
        this.userImage = result.coverImage;
      }
    });
    this.stories = this.journey.storiesIds ? this.journey.storiesIds.split(';;') : [];
  }

  public returnDate(date: string): string {
    return date ? date.split('T')[0] : '';
  }
}
