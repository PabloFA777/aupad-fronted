import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentoPoliza } from './documento-poliza.model';
import { DocumentoPolizaService } from './documento-poliza.service';
import { Poliza } from '../polizas/poliza.model';
import { PolizaService } from '../polizas/poliza.service';
import { DocumentType } from '../../../../core/models/document-type.model';
import { TipoDocumentoService } from '../../../../core/services/tipo-documento.service';

@Component({
  selector: 'app-documentos-poliza-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './documentos-poliza-form.component.html',
  styleUrl: './documentos-poliza-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentosPolizaFormComponent implements OnInit, OnChanges {
  @Input() item: DocumentoPoliza | null = null;
  @Output() saved = new EventEmitter<DocumentoPoliza>();
  @Output() closed = new EventEmitter<void>();

  readonly polizas = signal<Poliza[]>([]);
  readonly tiposDocumento = signal<DocumentType[]>([]);

  form: Partial<DocumentoPoliza> = {
    polizaId: 0,
    tipoDocumentoId: 0,
    nombreArchivo: '',
    urlArchivo: '',
    activo: true
  };
  errorMessage: string | null = null;

  constructor(
    private documentoPolizaService: DocumentoPolizaService,
    private polizaService: PolizaService,
    private tipoDocumentoService: TipoDocumentoService,
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

    this.tipoDocumentoService.obtenerTodos().subscribe({
      next: (data) => {
        this.tiposDocumento.set(data);
        if (!this.form.tipoDocumentoId && data.length > 0) {
          this.form.tipoDocumentoId = data[0].id;
        }
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error al cargar tipos de documento', err)
    });
  }

  ngOnChanges(): void {
    this.form = this.item
      ? { ...this.item }
      : {
          polizaId: this.polizas().length > 0 ? this.polizas()[0].id : 0,
          tipoDocumentoId: this.tiposDocumento().length > 0 ? this.tiposDocumento()[0].id : 0,
          nombreArchivo: '',
          urlArchivo: '',
          activo: true
        };
  }

  save(): void {
    if (!this.form.polizaId || !this.form.tipoDocumentoId || !this.form.nombreArchivo?.trim() || !this.form.urlArchivo?.trim()) {
      this.errorMessage = 'Póliza, Tipo de documento, Nombre de archivo y URL son obligatorios.';
      this.cdr.markForCheck();
      return;
    }

    this.errorMessage = null;

    if (this.form.id) {
      this.documentoPolizaService.actualizar(this.form.id, this.form as DocumentoPoliza).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo actualizar el documento. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    } else {
      this.documentoPolizaService.crear(this.form as DocumentoPoliza).subscribe({
        next: (res) => this.saved.emit(res),
        error: (err) => {
          this.errorMessage = 'No se pudo crear el documento. Intenta nuevamente.';
          this.cdr.markForCheck();
        }
      });
    }
  }

  close(): void {
    this.closed.emit();
  }
}
