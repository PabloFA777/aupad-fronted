import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppBrandComponent } from '../../../../shared/components/app-brand/app-brand.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AppBrandComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {}
