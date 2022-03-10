import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  constructor(public service: VehicleService, public dialog: MatDialog, 
    public notificationService: NotificationService, public dialogService: DialogService) { }
  isDisable:boolean = true;
  listData!: MatTableDataSource<any>;
  displayedColumns: any[] = ['year', 'make', 'model', 'bodyStyle', 'actions'];
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  array:any = [];

  ngOnInit(): void {
    this.service.getVehicles().subscribe(
      list =>{
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(this.array);
        this.listData.sort = this.sort;
        if(this.array.length>=1){
          this.isDisable = false;
        }
        else{
          this.isDisable = true;
        }
      });
    }

    onCreate(){
      if(this.array.length<4){
      this.service.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "35%";
      dialogConfig.height = "90%";
      this.dialog.open(AddVehicleComponent, dialogConfig);
      }
      else{
        this.notificationService.warn('You can only add upto 4 Vehicles!');
      }

  }

    onEdit(row: any){
      this.service.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "35%";
      dialogConfig.height = "90%";
      this.dialog.open(AddVehicleComponent, dialogConfig);
    }

    onDelete($key: any){
      this.dialogService.openConfirmDialog("Are you sure to delete this record?")
      .afterClosed().subscribe(res => {
      if(res){
        this.service.deleteVehicle($key);
        this.notificationService.warn('! Vehicle details removed Successfully');
      }
    });
    }

}
