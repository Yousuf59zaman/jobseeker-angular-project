import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export type InputType = 'text' | 'password' | 'email' | 'number';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent<T> {
  // @Input() placeholder = '';
  // @Input() label = '';
  // @Input() type: InputType = 'text';
  // @Input() isRequired: boolean = false;
  // @Input() isDisabled: boolean = false;
  // @Input() name = "";
  // @Input() control: FormControl<T> = new FormControl();
}
