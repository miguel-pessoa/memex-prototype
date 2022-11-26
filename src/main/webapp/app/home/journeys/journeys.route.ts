import { Route } from '@angular/router';
import { AddJourneyComponent } from './add-journey/add-journey.component';
import { ViewJourneyComponent } from './journey/view-journey/view-journey.component';
import { JourneysComponent } from './journeys.component';

export const JOURNEY_ROUTES: Route[] = [
  {
    path: 'journeys',
    component: JourneysComponent,
    data: {
      pageTitle: 'journeys.title',
    },
  },
  {
    path: 'journey/:id',
    component: ViewJourneyComponent,
    data: {
      pageTitle: 'journeys.title',
    },
  },
  {
    path: 'add-journey',
    component: AddJourneyComponent,
    data: {
      pageTitle: 'journeys.add.title',
    },
  },
];
