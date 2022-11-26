import { Route } from '@angular/router';
import { AddStoryComponent } from './add-story/add-story.component';
import { AuthorGraphComponent } from './author-graph/author-graph.component';
import { GraphComponent } from './story-graph/story-graph.component';
import { ViewStoryComponent } from './story/view-story/view-story.component';

export const STORY_ROUTES: Route[] = [
  {
    path: 'story/:id',
    component: ViewStoryComponent,
    data: {
      pageTitle: 'stories.title',
    },
  },
  {
    path: 'add-story',
    component: AddStoryComponent,
    data: {
      pageTitle: 'stories.add.title',
    },
  },
  {
    path: 'story-graph',
    component: GraphComponent,
    data: {
      pageTitle: 'stories.add.title',
    },
  },
  {
    path: 'author-graph',
    component: AuthorGraphComponent,
    data: {
      pageTitle: 'stories.add.title',
    },
  },
];
