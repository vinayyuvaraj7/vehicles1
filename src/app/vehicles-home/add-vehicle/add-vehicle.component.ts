import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { MatDialogRef } from '@angular/material/dialog'
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(public service: VehicleService, public dialogRef: MatDialogRef<AddVehicleComponent>,
    public notificationService: NotificationService) { }

  disableForm : boolean = true;

  ngOnInit(): void {
    this.service.form.get('make')?.disable();
    this.service.form.get('model')?.disable();
    this.service.form.get('bodyStyle')?.disable();
    this.service.getVehicles();
    this.makeList = this.make();
  }


  yearList = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008',
   '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018',
  '2019', '2020', '2021', '2022'];

  makeList:any = [];
  modelList:any = [];

  make(){ 
    return ['AUDI', 'BMW' , 'CADILLAC' , 
    'CHEVROLET' , 'HONDA' , 'HYUNDAI' ,
    'JAGUAR' , 'JEEP' , 'KIA' , 
    'LAMBORGHINI' , 'LAND ROVER' , 'MASERATI' , 
    'MITSUBISHI' , 'NISSAN' ,'TESLA' , 
    'TOYOTA' , 'VOLKSWAGEN' , 'VOLVO'];
}

  model(){ 
    return [{id:'AUDI',value:'Q3'}, {id:'AUDI',value:'Q5'}, {id:'AUDI',value:'Q7'}, {id:'AUDI',value:'A5'}, {id:'AUDI',value:'A7'},
      {id:'BMW',value:'ALPINA B7'}, {id:'BMW',value:'X2'}, {id:'BMW',value:'X3'}, {id:'BMW',value:'X4'}, {id:'BMW',value:'X5'},
    {id:'CADILLAC',value:'CT4'}, {id:'CADILLAC',value:'CT5'}, {id:'CADILLAC',value:'XT4'}, {id:'CADILLAC',value:'XT5'}, {id:'CADILLAC',value:'XT6'},
    {id:'CHEVROLET',value:'EQUINOX'}, {id:'CHEVROLET',value:'BOLT'}, {id:'CHEVROLET',value:'CAMARO'}, {id:'CHEVROLET',value:'MALIBU'}, {id:'CHEVROLET',value:'SPARK'},
    {id:'HONDA',value:'CIVIC'}, {id:'HONDA',value:'HR V'}, {id:'HONDA',value:'INSIGHT'}, {id:'HONDA',value:'ODYSSEY'}, {id:'HONDA',value:'PILOT'},
    {id:'HYUNDAI',value:'ELANTRA'}, {id:'HYUNDAI',value:'KONA'}, {id:'HYUNDAI',value:'PALISADE'}, {id:'HYUNDAI',value:'SANTA CRUZ'}, {id:'HYUNDAI',value:'SONATA'},
    {id:'JAGUAR',value:'F-PACE'}, {id:'JAGUAR',value:'F-TYPE'}, {id:'JAGUAR',value:'I-PACE'}, {id:'JAGUAR',value:'XF'},
    {id:'JEEP',value:'COMPASS'}, {id:'JEEP',value:'WAGONEER'},
    {id:'KIA',value:'CARNIVAL'}, {id:'KIA',value:'K5'}, {id:'KIA',value:'SENTOS'}, {id:'KIA',value:'SOUL'}, {id:'KIA',value:'SPORTAGE'},
    {id:'LAMBORGHINI',value:'URUS'},
    {id:'LAND ROVER',value:'DEFENDER'}, {id:'LAND ROVER',value:'DISCOVERY'}, {id:'LAND ROVER',value:'RANGE ROVER SPORT'},
    {id:'MASERATI',value:'LEVANTE'},
    {id:'MITSUBISHI',value:'ECLIPSE CROSS'}, {id:'MITSUBISHI',value:'MIRAGE'}, {id:'MITSUBISHI',value:'OUTLANDER'},
    {id:'NISSAN',value:'LEAF ELECTRIC'}, {id:'NISSAN',value:'PATH FINDER'},
    {id:'TESLA',value:'MODEL S'}, {id:'TESLA',value:'MODEL X'}, {id:'TESLA',value:'MODEL 3'}, {id:'TESLA',value:'Y'},
    {id:'TOYOTA',value:'CAMRY'}, {id:'TOYOTA',value:'COROLLA'}, {id:'TOYOTA',value:'GR 86'}, {id:'TOYOTA',value:'HIGHLANDER'}, {id:'TOYOTA',value:'SUPRA'},
    {id:'VOLKSWAGEN',value:'PASSAT'}, {id:'VOLKSWAGEN',value:'TAOS'},
    {id:'VOLVO',value:'S60'}, {id:'VOLVO',value:'V60'}];
}

stylesList = ['4D SED GAS', 'AWD 4D GAS', 'SPORT VAN GAS', 'CPE GAS', 'CV GAS', '4DR GAS'];

  selectMake(makeList:any){
    console.log(this.service.form.value['make'])
    if(!this.service.form.get('make')?.hasError('required')){
      this.service.form.get('model')?.enable();
    }
    this.modelList = this.model().filter(e => e.id == this.service.form.value['make']);
  }

  selectYear(){
    if(!this.service.form.get('year')?.hasError('required')){
      this.service.form.get('make')?.enable();
    }
  }

    selectModel(){
    if(!this.service.form.get('model')?.hasError('required')){
      this.service.form.get('bodyStyle')?.enable();
    }
  }

    selectStyle(){
      if(!this.service.form.get('bodyStyle')?.hasError('required')){
        this.disableForm = false;
      }
    }

    onSubmit(){
      if(this.service.form.valid){
        if(!this.service.form.get('$key')?.value){
          this.service.insertVehicle(this.service.form.value);
          this.notificationService.success('Vehicle Details added Successfully!');
        }
        else{
          this.service.updateVehicle(this.service.form.value);
          this.notificationService.success('Vehicle Details updated Successfully!');
        }
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.onClose();
      }
    }

    onClose(){
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();
    }
  
}

