import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from '../user-profile/user-profile.model';
import { UserProfileService } from '../user-profile/user-profile.service';
import { Story } from './story.model';

@Component({
  selector: 'jhi-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  public coAuthors: string[] = [];
  public userProfile: UserProfile = new UserProfile();
  @Input()
  public story: Story = new Story();

  constructor(private userProfileService: UserProfileService) {}

  public ngOnInit(): void {
    this.coAuthors = this.story.coAuthorsApproved ? this.story.coAuthorsApproved.split(';;') : [];
    this.userProfileService.findByUsername(this.story.author).subscribe(result => {
      if (result.id) {
        this.userProfile = result;
      }
    });
  }

  public returnDate(date: string): string {
    return date ? date.split('T')[0] : '';
  }
}
