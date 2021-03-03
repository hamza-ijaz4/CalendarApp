import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/shared/services/customer-service.service';
import { UpgradeService } from 'src/app/shared/services/upgrade.service';

@Component({
  selector: 'app-upgrade-log',
  templateUrl: './upgrade-log.component.html',
  styleUrls: ['./upgrade-log.component.css']
})
export class UpgradeLogComponent implements OnInit {

  @Input() upgradeId!: string;

  upgrades: any[] = [];
  items: any[] = [];
  rowData: any;
  frameworkComponents: any;
  rowSelection: any;
  gridApi: any;

  rowDataClicked1 = {};

  selected: boolean = false;
  constructor(private upgradeService: UpgradeService, private customerService: CustomerService, private messageService: MessageService) {
    this.rowSelection = 'multiple';
  }


  ngOnInit(): void {
    this.getCustomers();
  }

  columnDefs = [

    { field: 'name', headerName: "Customer name", sortable: true, filter: true },
    { field: 'herId', headerName: "Her Id", sortable: true, filter: true },
    // { field: 'AppointmentDate', headerName: "Her Id", sortable: true, filter: true },
    { field: 'passedDate', headerName: "Date passed", sortable: true, filter: true },
    { field: 'upgradeVersion', headerName: "Upgrade version", sortable: true, filter: true },
    { field: 'status', cellRenderer: (params: any) => { return this.getAppointmentStatusString(params.value) }, headerName: "Status", sortable: true, filter: true }

  ];

  getAppointmentStatusString(status?: number) {

    if (status == 2)
      return '<b style="background: #ac209b;color: white;padding: 5px;border-radius: 5px;">Completed</b>';
    if (status == 3)
      return '<b style="background: red;color: white;padding: 5px;border-radius: 5px;">Cancelled</b>';
    return '';
  }

  hasAppointment(value: any) {
    if (value)
      return 'Yes'
    return 'No'
  }


  getUpgrades() {
    this.upgradeService.getUpgrades().subscribe((result: any) => {
      this.upgrades = result;
    })
  }

  onBtnClick1(e: any) {
    this.rowDataClicked1 = e.rowData;
    console.log(e)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.upgradeId.currentValue) {
      if (this.upgradeId) {
        //this.getCustomers();
      }
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }


  getCustomers() {
    // 2: for completed appointments
    this.customerService.getCustomers(2).subscribe((result: any) => {
      this.items = result;
      this.rowData = result
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
      this.getCustomers();
    });
  }

  onSelectionChanged(event: any) {
    console.log('event', event);
  }

}

