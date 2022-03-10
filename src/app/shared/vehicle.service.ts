import { Injectable } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleList!: AngularFireList<any>;
  constructor(public firebase: AngularFireDatabase) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    year: new FormControl('', Validators.required),
    make: new FormControl({value: '', disabled: true}, Validators.required),
    model: new FormControl({value: '', disabled: true}, Validators.required),
    bodyStyle: new FormControl({value: '', disabled: true}, Validators.required)
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      year: '',
      make: '',
      model: '',
      bodyStyle: ''
    });
  }

  getVehicles(){
    this.vehicleList = this.firebase.list('vehicles');
    return this.vehicleList.snapshotChanges();
  }

  insertVehicle(vehicle:any){
    this.vehicleList.push({
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      bodyStyle: vehicle.bodyStyle
    });
  }

  updateVehicle(vehicle:any){
    this.vehicleList.update(vehicle.$key,{
      year: vehicle.year,
      make: vehicle.make,
      model: vehicle.model,
      bodyStyle: vehicle.bodyStyle
    });
  }

  deleteVehicle($key:string){
    this.vehicleList.remove($key);
  }

  populateForm(employee: any){
    this.form.setValue(employee);
  }

}
