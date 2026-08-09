import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SystemConfigModel } from '../../../../core/models/system-config.model';

@Component({
  selector: 'app-system-config-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './system-config-form.component.html',
  styleUrl: './system-config-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemConfigFormComponent {
  @Input() item: SystemConfigModel | null = null;
  @Output() saved = new EventEmitter<SystemConfigModel>();
  @Output() closed = new EventEmitter<void>();

  form: SystemConfigModel = { id: 0, clave: '', valor: '', descripcion: '' };

  ngOnChanges() {
    this.form = this.item ? { ...this.item } : { id: 0, clave: '', valor: '', descripcion: '' };
  }

  save() {
    if (!this.form.clave.trim() || !this.form.valor.trim()) {
      return;
    }

    this.saved.emit({ ...this.form, id: this.form.id || Date.now() });
  }

  close() {
    this.closed.emit();
  }
}
