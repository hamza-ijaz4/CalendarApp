import { appointments } from '../../models/CreateAppointmentDto';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Grid } from 'ag-grid-community';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { BtnCellRenderer } from './btn-cell-renderer.component';

@Component({
  selector: 'app-appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})
export class AppointmentsOverviewComponent implements OnInit {
  bookedAppointmentList: any;
  appointmentUrl: string = environment.apiEndpoint + "/api/Appointment/booked"
  private gridApi : any;
  private gridColumnApi: any;
  public rowData: any;
  private defaultColDef: any;

  rowDataClicked1 = {};
  frameworkComponents: any;


    columnDefs = [

      { field: 'startTime', headerName:"Date Time" , sortable: true, filter: true},
      { field: 'customer', headerName:"Customer", sortable: true, filter: true},
      { field: 'bookedBy', headerName:"Booked By" , sortable: true, filter: true},

      { field: 'upgradeVersion', headerName:'Upgrade Version', sortable: true, filter: true},
      { field: 'upgradeId', sortable: true, filter: true },
      { field: 'status', sortable: true, filter: true},
      {
        headerName: 'Complete Upgrade',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick1.bind(this),
          label: 'Set Completed'
        }
      },

    ];



  constructor(private httpClient: HttpClient, private appointmentService: AppointmentService,
    ) {
      this.frameworkComponents = {
        buttonRenderer: BtnCellRenderer,
      }
    }


  ngOnInit(): void {
    //this.httpClient.get(this.appointmentUrl).subscribe(() => {
      this.appointmentService.getBookedAppointments().subscribe((result: any) => {
        this.bookedAppointmentList = result;
        console.log(result);
        this.rowData = result;

    })

    }

    onBtnClick1(e: any) {
      this.rowDataClicked1 = e.rowData;
      console.log(e)
    }

}
