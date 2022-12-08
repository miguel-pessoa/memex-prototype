import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoAuthorDialogData } from './co-author-dialog-data.model';

@Component({
  templateUrl: './co-author-dialog.component.html',
  styleUrls: ['./co-author-dialog.component.scss'],
})
export class CoAuthorDialogComponent implements AfterViewInit {
  @ViewChild('top') top!: ElementRef;

  public tags: string[] = [];
  public coAuthors: string[] = [];
  public coAuthorsApproved: string[] = [];
  public selectedMedia: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: CoAuthorDialogData, public dialog: MatDialogRef<CoAuthorDialogComponent>) {
    this.coAuthors = data.story.coAuthors ? data.story.coAuthors.split(';;') : [];
    this.coAuthorsApproved = data.story.coAuthorsApproved ? data.story.coAuthorsApproved.split(';;') : [];
    this.tags = data.story.tags ? data.story.tags.split(';;') : [];
    if (data.story.addCoverImage1) {
      this.selectedMedia.push(data.story.addCoverImage1);
    }
    if (data.story.addCoverImage2) {
      this.selectedMedia.push(data.story.addCoverImage2);
    }
    if (data.story.addCoverImage3) {
      this.selectedMedia.push(data.story.addCoverImage3);
    }
    if (data.story.addCoverImage4) {
      this.selectedMedia.push(data.story.addCoverImage4);
    }
    if (data.story.addCoverImage5) {
      this.selectedMedia.push(data.story.addCoverImage5);
    }
    if (data.story.addCoverImage6) {
      this.selectedMedia.push(data.story.addCoverImage6);
    }
    if (data.story.addCoverImage7) {
      this.selectedMedia.push(data.story.addCoverImage7);
    }
    if (data.story.addCoverImage8) {
      this.selectedMedia.push(data.story.addCoverImage8);
    }
    if (data.story.addCoverImage9) {
      this.selectedMedia.push(data.story.addCoverImage9);
    }
    if (data.story.addCoverImage10) {
      this.selectedMedia.push(data.story.addCoverImage10);
    }
  }
  ngAfterViewInit(): void {
    this.top.nativeElement.scrollIntoView({ block: 'start' });
  }

  public closeDialog(): void {
    this.dialog.close();
  }

  public okButton(): void {
    this.dialog.close(true);
  }
}
