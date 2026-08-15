import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RolService } from './rol.service';
import { Rol } from './rol.model';

@Component({
  selector: 'app-roles-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css']
})
export class RolesFormComponent implements OnInit {
  rolForm: FormGroup;
  rolId!: number;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.rolForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      activo: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rolId = +params['id'];
      this.isEditMode = !!this.rolId;
      if (this.isEditMode) {
        this.obtenerRol(this.rolId);
      }
    });
  }

  obtenerRol(id: number): void {
    this.rolService.obtenerPorId(id).subscribe(rol => {
      this.rolForm.patchValue(rol);
    });
  }

  guardarRol(): void {
    if (this.rolForm.valid) {
      const rol: Rol = this.rolForm.value;
      if (this.isEditMode) {
        this.rolService.actualizar(this.rolId, rol).subscribe(() => {
          this.router.navigate(['/seguridad/roles']);
        });
      } else {
        this.rolService.crear(rol).subscribe(() => {
          this.router.navigate(['/seguridad/roles']);
        });
      }
    }
  }
}