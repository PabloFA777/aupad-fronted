import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BeneficiarioPoliza, EstadoBeneficiario } from './beneficiario-poliza.model';
import { BeneficiarioPolizaService } from './beneficiario-poliza.service';
import { Poliza } from '../polizas/poliza.model';
import { PolizaService } from '../polizas/poliza.service';

@Component({
  selector: 'app-beneficiarios-poliza-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './beneficiarios-poliza-form.component.html',
  styleUrl: './beneficiarios-poliza-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficiariosPolizaFormComponent implements OnInit, OnChanges {
  @Input() item: BeneficiarioPoliza | null = null;
  @Output() saved = new EventEmitter<BeneficiarioPoliza>();
  @Output() closed = new EventEmitter<void>();

  readonly polizas = signal<Poliza[]>([]);

  form: Partial<BeneficiarioPoliza> = {
    polizaId: 0,
    dni: '',
    nombres: '',
    cargo: '',
    remuneracion: 0,
    mes: new Date().getMonth() + 1,
    anio: new Date().getFullYear(),
    estado: 'Activo'
  };
  errorMessage: string | null = null;

  readonly estadoOptions: { label: string; value: EstadoBeneficiario }[] = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Retirado', value: 'Retirado' }
  ];

  constructor(
    private beneficiarioPolizaService: BeneficiarioPolizaService,
    private polizaService: PolizaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.polizaService.obtenerTodos().subscribe({
      next: (data) => {
        this.polizas.set(data);
        if (!this.form.polizaId && data.length > 0) {
          this.form.polizaId = data[0].id;
        }
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al cargar pólizas', err)
    });
  }

  ngOnChanges(): void {
    this.form = this.item
      ? { ...this.item }
      : {
          polizaId: this.polizas().length > 0 ? this.polizas()[0].id : 0,
          dni: '',
          nombres: '',
          cargo: '',
          remuneracion: 0,
          mes: new Date().getMonth() + 1,
          anio: new Date().getFullYear(),
          estado: 'Activo'
        };
  }

  save(): void {
    if (!this.form.polizaId || !this.form.dni?.trim() || !this.form.nombres?.trim()) {
      this.errorMessage = 'Póliza, DNI y Nombres son obligatorios.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.beneficiarioPolizaService.actualizar(this.form.id, this.form as BeneficiarioPoliza).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo actualizar el beneficiario. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.beneficiarioPolizaService.crear(this.form as BeneficiarioPoliza).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo crear el beneficiario. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close(): void {
    this.closed.emit();
  }
}
