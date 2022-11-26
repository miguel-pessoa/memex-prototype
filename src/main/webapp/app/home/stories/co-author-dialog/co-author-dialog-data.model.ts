import { Story } from '../story/story.model';

export class CoAuthorDialogData {
  story: Story;

  constructor(story: Story) {
    this.story = story;
  }
}
