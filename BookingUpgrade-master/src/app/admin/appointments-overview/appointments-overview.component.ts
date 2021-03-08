import { appointments } from './../../models/CreateAppointmentDto';
import { HelpersService } from './../../shared/services/helpers.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { BtnCellRenderer } from './btn-cell-renderer.component';
import { UpgradeService } from 'src/app/shared/services/upgrade.service';



interface activeAppointment {
  appointmentDate: Date;
  appointmentId: string;
  appointmentTime: string;
  bookedBy: null | string;
  customerId: string;
  customerName: string;
  herId: number;
  status: number;
  upgradeVersion: number;
  upgradeVersionId: string;
  day: string;
  };

@Component({
  selector: 'app-appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})

export class AppointmentsOverviewComponent implements OnInit {
  appointmentList!: activeAppointment[];
  appointmentUrl: string = environment.apiEndpoint + "/api/Appointment/booked"
  private gridApi: any;
  private gridColumnApi: any;
  rowSelection: any;

  upgradeId!: string;
  upgrades: any[] = [];

  rowDataClicked1 = {};
  frameworkComponents: any;


    constructor(
      private appointmentService: AppointmentService,
      private upgradeService: UpgradeService,
      private helpersService: HelpersService,
   )
      {
        this.frameworkComponents = {
        buttonRenderer: BtnCellRenderer,
      },
      this.rowSelection = 'multiple';
    }

  columnDefs = [
    { field: 'appointmentDate', headerName: "Date", sortable: true, filter: true, width: 150 },
    { field: 'day', headerName: "Day", filter: true , width: 100},
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
    this.getActiveAppointments();
    this.getUpgrades();

  }

  getActiveAppointments(){
    this.appointmentService.getActiveAppointments().subscribe((result: any) => {
      this.appointmentList = result;
      for (let index = 0; index < this.appointmentList.length; index++) {
        const element = this.appointmentList[index];
        this.appointmentList[index].day = this.helpersService.getDayName(element.appointmentDate) || '';

      }
      console.log(this.appointmentList)
      console.log(this.appointmentList[1].upgradeVersion)
   })
  }




  //Todo, improve
  completeBtn(e: any) {
    this.rowDataClicked1 = e.rowData;
    console.log("from overview", e.rowData.appointmentId)
    this.appointmentService.completeAppointment(e.rowData.appointmentId).subscribe((result: any) => {
      console.log(result);
    //  this.rowData = result;

    this.getActiveAppointments()

    });
  }


  cancelBtn(e: any) {
    this.rowDataClicked1 = e.rowData;
    console.log("from overview", e.rowData.appointmentId)
    this.appointmentService.cancelAppointment(e.rowData.appointmentId).subscribe((result: any) => {
      console.log(result);
    //  this.rowData = result;

    this.getActiveAppointments();

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

    this.appointmentService.updateAppointmentUpgrade(obj).subscribe(() => {
      //this.messageService.add({ severity: 'success', summary: 'Invited successfully' });

      this.getActiveAppointments();
    });
  }

  getUpgrades() {
    this.upgradeService.getUpgrades().subscribe((result: any) => {
      this.upgrades = result;
    })

  }


}


//overdue
