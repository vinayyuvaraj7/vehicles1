import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { VehiclesHomeComponent } from './vehicles-home/vehicles-home.component';
import { VehicleService } from './shared/vehicle.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NotificationService } from './shared/notification.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddVehicleComponent } from './vehicles-home/add-vehicle/add-vehicle.component';
import { VehiclesListComponent } from './vehicles-home/vehicles-list/vehicles-list.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    VehiclesHomeComponent,
    AddVehicleComponent,
    VehiclesListComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [VehicleService, NotificationService, VehiclesListComponent],
  bootstrap: [AppComponent],
  entryComponents: [VehiclesHomeComponent]
})
export class AppModule { }
