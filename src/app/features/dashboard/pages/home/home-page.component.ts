import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  template: `
    <h2>Inicio</h2>
    <p>Selecciona una opción del menú para comenzar.</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {}
