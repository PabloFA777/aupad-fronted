import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuotaPoliza, EstadoCuota, MetodoPagoCuota } from './cuota-poliza.model';
import { CuotaPolizaService } from './cuota-poliza.service';
import { PolizaService } from '../polizas/poliza.service';
import { Poliza } from '../polizas/poliza.model';

@Component({
  selector: 'app-cuotas-poliza-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cuotas-poliza-form.component.html',
  styleUrl: './cuotas-poliza-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuotasPolizaFormComponent implements OnChanges, OnInit {
  @Input() item: CuotaPoliza | null = null;
  @Output() saved = new EventEmitter<CuotaPoliza>();
  @Output() closed = new EventEmitter<void>();

  form: Partial<CuotaPoliza> = {
    polizaId: 0,
    numeroCuota: 1,
    monto: 0,
    fechaVencimientoCuota: new Date().toISOString().substring(0, 10),
    estado: 'pendiente',
    montoPagado: null,
    fechaPago: null,
    metodoPago: null
  };
  errorMessage: string | null = null;

  polizas: Poliza[] = [];

  readonly estadoOptions: { label: string; value: EstadoCuota }[] = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'Pagada', value: 'pagada' },
    { label: 'Vencida', value: 'vencida' }
  ];

  readonly metodoPagoOptions: { label: string; value: MetodoPagoCuota }[] = [
    { label: 'Transferencia', value: 'transferencia' },
    { label: 'Efectivo', value: 'efectivo' },
    { label: 'Tarjeta', value: 'tarjeta' },
    { label: 'Yape', value: 'yape' },
    { label: 'Plin', value: 'plin' }
  ];

  constructor(
    private cuotaPolizaService: CuotaPolizaService,
    private polizaService: PolizaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.polizaService.obtenerTodos().subscribe({
      next: (data) => { this.polizas = data; this.cdr.markForCheck(); }
    });
  }

  ngOnChanges() {
    this.form = this.item
      ? { ...this.item }
      : {
          polizaId: 0,
          numeroCuota: 1,
          monto: 0,
          fechaVencimientoCuota: new Date().toISOString().substring(0, 10),
          estado: 'pendiente',
          montoPagado: null,
          fechaPago: null,
          metodoPago: null
        };
  }

  save() {
    if (!this.form.polizaId) {
      this.errorMessage = 'Debe seleccionar una póliza.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.cuotaPolizaService.actualizar(this.form.id, this.form as CuotaPoliza).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo actualizar la cuota. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.cuotaPolizaService.crear(this.form as CuotaPoliza).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo crear la cuota. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close() {
    this.closed.emit();
  }
}