import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SystemConfigModel } from './system-config.model';
import { SystemConfigService } from './system-config.service';

@Component({
  selector: 'app-system-config-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './system-config-form.component.html',
  styleUrl: './system-config-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemConfigFormComponent implements OnChanges {
  @Input() item: SystemConfigModel | null = null;
  @Output() saved = new EventEmitter<SystemConfigModel>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<SystemConfigModel> = { clave: '', valor: '', descripcion: '' };
  errorMessage: string | null = null;

  constructor(private systemConfigService: SystemConfigService, private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.form = this.item
      ? { ...this.item }
      : { clave: '', valor: '', descripcion: '' };
  }

  save() {
    if (!this.form.clave?.trim() || !this.form.valor?.trim()) {
      this.errorMessage = 'La clave y el valor son obligatorios.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.systemConfigService.actualizar(this.form.id, this.form as SystemConfigModel).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo actualizar la configuración. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.systemConfigService.crear(this.form as SystemConfigModel).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo crear la configuración. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close() {
    this.closed.emit();
  }
}
