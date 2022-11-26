import { Component, Input } from '@angular/core';
import { Story } from '../story.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StoriesService } from '../../stories.service';

@Component({
  selector: 'jhi-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.scss'],
})
export class ViewStoryComponent {
  @Input()
  public story: Story = new Story();

  public tags: string[] = [];
  public coAuthors: string[] = [];
  public coAuthorsApproved: string[] = [];
  public selectedMedia: string[] = [];

  constructor(private location: Location, private dialog: MatDialog, private router: Router, private storiesService: StoriesService) {
    if (this.router.getCurrentNavigation()?.extras.state?.story) {
      this.story = this.router.getCurrentNavigation()?.extras.state?.story;
      this.coAuthors = this.story.coAuthors.split(';;');
      this.coAuthorsApproved = this.story.coAuthorsApproved.split(';;');
      this.tags = this.story.tags.split(';;');
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
    }
  }

  public goBack(): void {
    this.location.back();
  }

  public deleteStoryPopup(): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Delete current story?',
          body: 'Your story will be deleted.',
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
          this.storiesService.delete(this.story.id).subscribe(() => {
            console.warn('deleted');
            this.location.back;
          });
        }
      });
  }
}
