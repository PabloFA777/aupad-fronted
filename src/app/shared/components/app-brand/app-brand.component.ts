import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-brand.component.html',
  styleUrl: './app-brand.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBrandComponent {
  @Input() title = 'AUPAD';
  @Input() subtitle = 'Back Office';
  @Input() compact = false;
}
