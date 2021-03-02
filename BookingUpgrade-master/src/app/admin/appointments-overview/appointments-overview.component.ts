import { appointments } from '../../models/CreateAppointmentDto';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Grid } from 'ag-grid-community';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { BtnCellRenderer } from './btn-cell-renderer.component';
import { UpgradeService } from 'src/app/shared/services/upgrade.service';

@Component({
  selector: 'app-appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})
export class AppointmentsOverviewComponent implements OnInit {
  bookedAppointmentList: any;
  appointmentUrl: string = environment.apiEndpoint + "/api/Appointment/booked"
  private gridApi: any;
  private gridColumnApi: any;
  public rowData: any;
  rowSelection: any;

  upgradeId!: string;
  upgrades: any[] = [];

  rowDataClicked1 = {};
  frameworkComponents: any;


    constructor(
      private httpClient: HttpClient,
      private appointmentService: AppointmentService,
      private upgradeService: UpgradeService
   )
      {
        this.frameworkComponents = {
        buttonRenderer: BtnCellRenderer,
      },
      this.rowSelection = 'multiple';
    }

  columnDefs = [
    { field: 'appointmentDate', headerName: "Date", sortable: true, filter: true, width: 150 },
    { field: 'appointmentTime', headerName: "Time", sortable: true, filter: true , width: 150},
    { field: 'status', cellRenderer: (params: any) => { return this.getAppointmentStatusString(params.value) }, headerName: "Appointment Status", sortable: true, filter: true },

    { field: 'customerName', headerName: "Customer", sortable: true, filter: true, width: 200},
    { field: 'bookedBy', headerName: "Booked By", sortable: true, filter: true },

    { field: 'appointmentId', headerName: "AppointmentId", sortable: true, filter: true },
    { field: 'upgradeVersion', headerName: 'Upgrade Version', sortable: true, filter: true },

    {
      headerName: 'Cancel Appointment',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.cancelBtn.bind(this),
        label: 'Cancel'
      }
    },
    {
      headerName: 'Upgrade Complete ',
      cellRenderer: 'buttonRenderer',
      width: 400,
      cellRendererParams: {
        onClick: this.completeBtn.bind(this),
        label: 'Set Completed'
      }
    },

  ];

  defaultColDef = { resizable: true };

  getAppointmentStatusString(status?: number) {

    if (status == 0)
      return '<b style="background: #0532b2;color: white;padding: 5px;border-radius: 5px;">Invited</b>';
    if (status == 1)
      return '<b style="background: #3f9a39;color: white;padding: 5px;border-radius: 5px;">Booked</b>';
    return '';
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onSelectionChanged(event: any) {
    console.log('event', event);
  }


  ngOnInit(): void {
    this.getBookedAppointments();
    this.getUpgrades();

  }

  getBookedAppointments(){
    this.appointmentService.getBookedAppointments().subscribe((result: any) => {
      this.bookedAppointmentList = result;
      this.rowData = result;
   })
  }




  //Todo, improve
  completeBtn(e: any) {
    this.rowDataClicked1 = e.rowData;
    console.log("from overview", e.rowData.appointmentId)
    this.appointmentService.completeAppointment(e.rowData.appointmentId).subscribe((result: any) => {
      console.log(result);
    //  this.rowData = result;

    this.getBookedAppointments()

    });
  }


  cancelBtn(e: any) {
    this.rowDataClicked1 = e.rowData;
    console.log("from overview", e.rowData.appointmentId)
    this.appointmentService.cancelAppointment(e.rowData.appointmentId).subscribe((result: any) => {
      console.log(result);
    //  this.rowData = result;

    this.getBookedAppointments();

    });



  }
  updateUpgradeVersion() {


    if (!this.upgradeId){
      return;
    }

    let selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length == 0){

      return;
    }

    let customerIds = selectedNodes.map((a: any) => a.data.id)

    let appointmenIds = selectedNodes.map((a: any) => a.data.appointmentId)

    let obj = {
      "appointmentIds": appointmenIds,
      "upgradeId": this.upgradeId
    }

    console.log("obj", obj)



    let obj2 = {
      "appointmentIds": appointmenIds,
      "upgradeId": this.upgradeId
    }

    console.log("obj2", obj2)

    this.appointmentService.updateAppointment(obj).subscribe(() => {
      //this.messageService.add({ severity: 'success', summary: 'Invited successfully' });

      this.getBookedAppointments();
    });
  }

  getUpgrades() {
    this.upgradeService.getUpgrades().subscribe((result: any) => {
      this.upgrades = result;
    })

  }


}


//overdue
