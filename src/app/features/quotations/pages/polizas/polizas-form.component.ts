import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoPoliza, MonedaPoliza, PeriodicidadPago, Poliza } from './poliza.model';
import { PolizaService } from './poliza.service';

@Component({
  selector: 'app-polizas-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './polizas-form.component.html',
  styleUrl: './polizas-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolizasFormComponent implements OnChanges {
  @Input() item: Poliza | null = null;
  @Output() saved = new EventEmitter<Poliza>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<Poliza> = {
    clienteId: 1,
    usuarioId: 1,
    seguroId: 1,
    companiaId: 1,
    numeroPoliza: '',
    fechaInicio: new Date().toISOString().substring(0, 10),
    fechaVencimiento: new Date(Date.now() + 365 * 86400000).toISOString().substring(0, 10),
    vigenciaMeses: 12,
    cobertura: '',
    sumaAsegurada: 0,
    periodicidadPago: 'anual',
    moneda: 'Soles',
    primaNeta: 0,
    comisionPorcentaje: 0,
    cuotasPendientes: 0,
    cuotasPagadas: 0,
    estado: 'vigente'
  };
  errorMessage: string | null = null;

  readonly periodicidadOptions: { label: string; value: PeriodicidadPago }[] = [
    { label: 'Anual', value: 'anual' },
    { label: 'Mensual', value: 'mensual' }
  ];

  readonly monedaOptions: { label: string; value: MonedaPoliza }[] = [
    { label: 'Soles (S/)', value: 'Soles' },
    { label: 'Dólares ($)', value: 'Dolares' }
  ];

  readonly estadoOptions: { label: string; value: EstadoPoliza }[] = [
    { label: 'Vigente', value: 'vigente' },
    { label: 'Vencida', value: 'vencida' },
    { label: 'Anulada', value: 'anulada' },
    { label: 'Renovada', value: 'renovada' }
  ];

  constructor(private polizaService: PolizaService, private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.form = this.item
      ? { ...this.item }
      : {
          clienteId: 1,
          usuarioId: 1,
          seguroId: 1,
          companiaId: 1,
          numeroPoliza: '',
          fechaInicio: new Date().toISOString().substring(0, 10),
          fechaVencimiento: new Date(Date.now() + 365 * 86400000).toISOString().substring(0, 10),
          vigenciaMeses: 12,
          cobertura: '',
          sumaAsegurada: 0,
          periodicidadPago: 'anual',
          moneda: 'Soles',
          primaNeta: 0,
          comisionPorcentaje: 0,
          cuotasPendientes: 0,
          cuotasPagadas: 0,
          estado: 'vigente'
        };
  }

  save() {
    if (!this.form.numeroPoliza?.trim()) {
      this.errorMessage = 'El número de póliza es obligatorio.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.polizaService.actualizar(this.form.id, this.form as Poliza).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo actualizar la póliza. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.polizaService.crear(this.form as Poliza).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo crear la póliza. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close() {
    this.closed.emit();
  }
}
