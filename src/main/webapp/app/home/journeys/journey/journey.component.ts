import { Component, Input } from '@angular/core';
import { UserProfileService } from 'app/home/stories/user-profile/user-profile.service';
import { Journey } from './journey.model';

@Component({
  selector: 'jhi-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent {
  @Input()
  public journey: Journey = new Journey();

  public userImage = '';

  constructor(private userProfileService: UserProfileService) {}

  public ngOnInit(): void {
    this.userProfileService.findByUsername(this.journey.author).subscribe(result => {
      if (result.id) {
        this.userImage = result.coverImage;
      }
    });
  }

  public returnDate(date: string): string {
    return date.split('T')[0];
  }
}
