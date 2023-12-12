import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  @Output() querySubmitted = new EventEmitter<string>();

  form = this.fb.group({
    searchTerm: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(private fb: FormBuilder) {}

  submitForm() {
    const searchTerm = this.form.value.searchTerm;

    if (searchTerm && typeof searchTerm === 'string') {
      // Only emit the value if it is a non-null and non-undefined string
      this.querySubmitted.emit(searchTerm);
    }
  }

}
