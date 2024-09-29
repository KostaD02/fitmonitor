import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { LanguageService } from '@fitmonitor/client-services';
import { API_CONFIG } from '@fitmonitor/consts';
import { UserLoginData } from '@fitmonitor/interfaces';
import { TranslateModule } from '@ngx-translate/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'fitmonitor-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzAlertModule,
    NzButtonModule,
    TranslateModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  @Output() formSubmit = new EventEmitter<UserLoginData>();

  private readonly fb = inject(FormBuilder);
  private readonly languageService = inject(LanguageService);
  private readonly notificationService = inject(NzNotificationService);

  readonly form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(API_CONFIG.MIN_PASSWORD_LENGTH),
      Validators.maxLength(API_CONFIG.MAX_PASSWORD_LENGTH),
    ]),
  });

  readonly formItems = Object.keys(this.form.controls).map((key) => {
    return {
      name: key,
      label: `auth.${key}.label`,
      invalid: `auth.${key}.invalid`,
      placeholder: `auth.${key}.placeholder`,
      icon: key === 'password' ? 'lock' : 'user',
      type:
        key === 'password' ? 'password' : key === 'email' ? 'email' : 'text',
    };
  });

  onSubmit() {
    if (this.form.invalid) {
      this.notificationService.error(
        this.languageService.translate('general.error'),
        this.languageService.translate('auth.invalid-form-data'),
      );
      return;
    }
    this.formSubmit.emit(this.form.value as UserLoginData);
    this.form.reset();
  }
}
