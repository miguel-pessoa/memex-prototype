import { Story } from 'app/home/stories/story/story.model';

export class Journey {
  id = -1;
  title = 'The title of the story';
  description = '';
  coverImage = '';
  date = '22/10/2022';
  published = false;
  progress = 0;
  stories: Story[] = [];
}
