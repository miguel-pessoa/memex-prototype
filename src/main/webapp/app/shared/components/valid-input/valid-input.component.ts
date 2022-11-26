import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

export type OmniInputSize = 'large' | 'default' | 'dense';
export type OmniInputColor = 'primary' | 'secondary' | 'stroked' | 'alert';
export type OmniInputType = 'text' | 'datepicker' | 'number' | 'currency';

@Component({
  selector: 'jhi-valid-input',
  templateUrl: './valid-input.component.html',
  styleUrls: ['./valid-input.component.scss'],
})
export class ValidInputComponent {
  @Input()
  public appearance: MatFormFieldAppearance = 'outline';

  @Input()
  public max = -1;

  @Input()
  public charCountHint = true;

  @Input()
  public id = '';

  @Input()
  public name = '';

  @Input()
  public model: any = '';

  @Input()
  public disabled = false;

  @Input()
  public readonly = false;

  @Input()
  public size: OmniInputSize = 'default';

  @Input()
  public color: OmniInputColor = 'primary';

  @Input()
  public type: OmniInputType = 'text';

  @Input()
  public datepickerToggle = 'datepicker';

  @Input()
  public customClass = '';

  @Input()
  public label = '';

  @Input()
  public ellipsis = false;

  @Input()
  public align = '';

  @Input()
  public width = '100%';

  @Output() public modelChange: EventEmitter<any> = new EventEmitter();

  @Input()
  public control: FormControl = new FormControl('');

  @Input()
  public isCurrency = false;

  public matcher = new OmniStateMatcher();

  public getColorClass(): string {
    return `mat-${this.color}`;
  }

  public getValueAsNumber(): number {
    return Number(this.control.value.replaceAll(/\s/g, '').replaceAll(',', '.'));
  }

  public updateIfCurrency(): void {
    if (this.isCurrency) {
      let value = this.control.value.replaceAll(/\s/g, '').replaceAll(',', '.');

      if (value.split('.')[1] && value.split('.')[1].length > 2) {
        value = value.split('.')[0].concat('.').concat(value.split('.')[1].slice(0, 2));
      }
      this.control.setValue(value);
    }
  }
}

export class OmniStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control?.invalid && (control.dirty || control.touched));
  }
}
