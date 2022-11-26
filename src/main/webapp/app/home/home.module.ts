import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { StoriesComponent } from './stories/stories.component';
import { StoryComponent } from './stories/story/story.component';
import { STORY_ROUTES } from './stories/stories.route';
import { ViewStoryComponent } from './stories/story/view-story/view-story.component';
import { AddStoryComponent } from './stories/add-story/add-story.component';
import { JourneysComponent } from './journeys/journeys.component';
import { JourneyComponent } from './journeys/journey/journey.component';
import { ViewJourneyComponent } from './journeys/journey/view-journey/view-journey.component';
import { AddJourneyComponent } from './journeys/add-journey/add-journey.component';
import { JOURNEY_ROUTES } from './journeys/journeys.route';
import { GraphComponent } from './stories/story-graph/story-graph.component';
import { AuthorGraphComponent } from './stories/author-graph/author-graph.component';
import { UserProfileComponent } from './stories/user-profile/user-profile.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE, ...STORY_ROUTES, ...JOURNEY_ROUTES])],
  declarations: [
    HomeComponent,
    StoriesComponent,
    StoryComponent,
    ViewStoryComponent,
    AddStoryComponent,
    JourneysComponent,
    JourneyComponent,
    ViewJourneyComponent,
    AddJourneyComponent,
    GraphComponent,
    AuthorGraphComponent,
    UserProfileComponent,
  ],
  exports: [UserProfileComponent],
})
export class HomeModule {}
