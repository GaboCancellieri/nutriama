import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacientesComponent } from './pacientes.component';
import { PacienteDetalleComponent } from './paciente-detalle/paciente-detalle.component';
import { SeguimientoDetalleComponent } from './seguimiento/seguimiento-detalle/seguimiento-detalle.component';

const routes: Routes = [
  { path: 'seguimiento/:id', component: SeguimientoDetalleComponent },
  { path: 'paciente/:id', component: PacienteDetalleComponent },
  { path: '', component: PacientesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
