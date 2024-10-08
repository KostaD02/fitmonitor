import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'monotor-notfound',
  standalone: true,
  imports: [RouterLink, NzResultModule, NzButtonModule, NzLayoutModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent {}
