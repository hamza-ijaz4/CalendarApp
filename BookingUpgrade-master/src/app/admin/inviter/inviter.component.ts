import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CustomerService } from 'src/app/shared/services/customer-service.service';

import { MessageService } from 'primeng/api';
import { UpgradeService } from 'src/app/shared/services/upgrade.service';

@Component({
  selector: 'app-inviter',
  templateUrl: './inviter.component.html',
  styleUrls: ['./inviter.component.css']
})
export class InviterComponent implements OnInit {

  upgradeId!: string;
  upgrades: any[] = [];
  items: any[] = [];
  rowData: any;
  frameworkComponents: any;
  rowSelection: any;
  gridApi: any;

  rowDataClicked1 = {};

  selected: boolean = false;
  constructor(
    private upgradeService: UpgradeService,
    private customerService: CustomerService,
    private messageService: MessageService)
    {
    this.rowSelection = 'multiple';
    }


  ngOnInit(): void {

    console.log("upgradeId: ", this.upgradeId)
    this.getUpgrades();
    this.getCustomers();
  }


  columnDefs = [

    { field: 'herId', headerName: "Her Id", sortable: true, filter: true },
    { field: 'name', headerName: "Customer name", sortable: true, filter: true },
    { field: 'currentVersion', headerName: "Current Version", sortable: true, filter: true },
    { field: 'status', cellRenderer: (params: any) => { return this.getAppointmentStatusString(params.value) }, headerName: "Appointment Status", sortable: true, filter: true },
    { field: 'upcommingUpgrade', headerName: "Planed Upgrade", sortable: true, filter: true },
    { field: 'upgradeVersionId',headerName: "Planed UpgradeId", sortable: true, filter: true },
    { field: 'appointmentId', headerName: "AppointmentId", minWidth: 300, sortable: true, filter: true },
    //{ field: 'gotAppointment', cellRenderer: (params: any) => { return this.hasAppointment(params.value) }, headerName: 'Has Appointment', sortable: true, },

  ];

  defaultColDef = { resizable: true };

  getAppointmentStatusString(status?: number) {

    if (status == 0)
      return '<b style="background: #0532b2;color: white;padding: 5px;border-radius: 5px;">Invited</b>';
    if (status == 1)
      return '<b style="background: #3f9a39;color: white;padding: 5px;border-radius: 5px;">Booked</b>';
    return '';
  }

  hasAppointment(value: any) {
    if (value)
      return 'Yes'
    return 'No'
  }

  isRowSelectable = function (rowData:any) {

     return !rowData.data.gotAppointment;
  };

  getUpgrades() {
    this.upgradeService.getUpgrades().subscribe((result: any) => {
      this.upgrades = result;
    })

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("change triggered");
    if (changes.upgradeId.currentValue) {
      if (this.upgradeId) {

      }
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }


  getCustomers() {
    console.log("getCustomer")
    this.customerService.getCustomers().subscribe((result: any) => {
      this.items = result;
      this.rowData = result

      console.log(this.rowData)
    })
  }

  setClasses() {
    let classes = {
      day: true,
      selected: this.selected
    }
    return classes;
  }



  save() {
    if (!this.upgradeId)
      return;



    let selectedNodes = this.gridApi.getSelectedNodes();
    if (selectedNodes.length == 0)
      return;

    let customerIds = selectedNodes.map((a: any) => a.data.id)

    let obj = {
      "customerIds": customerIds,
      "upgradeId": this.upgradeId
    }

    this.customerService.saveAppointments(obj).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Invited successfully' });
      console.log("invite sent")
      this.getCustomers();
    });
  }

  onSelectionChanged(event: any) {
    console.log('event', event);
  }

}
