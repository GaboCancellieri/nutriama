import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PacientesRoutingModule } from './pacientes.routing';
import { PacientesComponent } from './pacientes.component';
import { PacienteService } from './pacientes.service';
import { PacienteDetalleComponent } from './paciente-detalle/paciente-detalle.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { SeguimientoService } from './seguimiento/seguimiento.service';
import { PlanificacionComponent } from './seguimiento/planificacion/planificacion.component';
import { SeguimientoDetalleComponent } from './seguimiento/seguimiento-detalle/seguimiento-detalle.component';
import { DistribucionAlimentariaComponent } from './seguimiento/distribucion-alimentaria/distribucion-alimentaria.component';

// Ng Prime
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import {PanelModule} from 'primeng/panel';
import {AccordionModule} from 'primeng/accordion';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DataViewModule} from 'primeng/dataview';

@NgModule({
  declarations: [
    PacientesComponent,
    PacienteDetalleComponent,
    SeguimientoComponent,
    SeguimientoDetalleComponent,
    PlanificacionComponent,
    DistribucionAlimentariaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    ToastModule,
    ToggleButtonModule,
    InputNumberModule,
    TooltipModule,
    PanelModule,
    ConfirmDialogModule,
    AccordionModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    PacientesRoutingModule,
    DataViewModule,
  ],
  providers: [
    PacienteService,
    SeguimientoService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [PacientesComponent]
})
export class PacientesModule { }
