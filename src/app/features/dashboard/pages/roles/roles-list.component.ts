import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RolService } from './rol.service';
import { Rol } from './rol.model';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {
  roles: Rol[] = [];

  constructor(private rolService: RolService) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles(): void {
    this.rolService.obtenerTodos().subscribe(roles => {
      this.roles = roles;
    });
  }

  eliminarRol(id: number): void {
    this.rolService.eliminar(id).subscribe(() => {
      this.obtenerRoles();
    });
  }
}