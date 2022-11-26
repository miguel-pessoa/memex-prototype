import { Component, Input } from '@angular/core';
import { Journey } from '../journey.model';

@Component({
  selector: 'jhi-view-journey',
  templateUrl: './view-journey.component.html',
  styleUrls: ['./view-journey.component.scss'],
})
export class ViewJourneyComponent {
  @Input()
  public journey: Journey = new Journey();
}
