import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoPoliza, MonedaPoliza, PeriodicidadPago, Poliza } from './poliza.model';
import { PolizaService } from './poliza.service';
import { ClienteService } from '../../../maintenance/pages/clientes/cliente.service';
import { Cliente } from '../../../maintenance/pages/clientes/cliente.model';
import { UsuarioService } from '../../../seguridad/pages/usuarios/usuario.service';
import { Usuario } from '../../../seguridad/pages/usuarios/usuario.model';
import { InsuranceService } from '../insurance/insurance.service';
import { InsuranceModel } from '../insurance/insurance.model';
import { CompaniaSeguroService } from '../../../maintenance/pages/companias-seguro/compania-seguro.service';
import { CompaniaSeguro } from '../../../maintenance/pages/companias-seguro/compania-seguro.model';

@Component({
  selector: 'app-polizas-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './polizas-form.component.html',
  styleUrl: './polizas-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolizasFormComponent implements OnChanges, OnInit {
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

  clientes: Cliente[] = [];
  usuarios: Usuario[] = [];
  seguros: InsuranceModel[] = [];
  companias: CompaniaSeguro[] = [];

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

  constructor(
    private polizaService: PolizaService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private insuranceService: InsuranceService,
    private companiaSeguroService: CompaniaSeguroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.clienteService.obtenerTodos().subscribe({
      next: (data) => { this.clientes = data; this.cdr.markForCheck(); }
    });
    this.usuarioService.obtenerTodos().subscribe({
      next: (data) => { this.usuarios = data; this.cdr.markForCheck(); }
    });
    this.insuranceService.obtenerTodos().subscribe({
      next: (data) => { this.seguros = data; this.cdr.markForCheck(); }
    });
    this.companiaSeguroService.obtenerTodos().subscribe({
      next: (data) => { this.companias = data; this.cdr.markForCheck(); }
    });
  }

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