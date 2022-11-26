import { Component, Input } from '@angular/core';
import { Journey } from './journey.model';

@Component({
  selector: 'jhi-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss'],
})
export class JourneyComponent {
  @Input()
  public journey: Journey = new Journey();
}
