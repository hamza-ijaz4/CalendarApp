import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer-service.service';
import { UpgradeService } from 'src/app/services/upgrade.service';
import { EventBusService } from 'src/app/services/event-bus-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  upgradeId!: string;
  selectedIndex: number | undefined;

  upgrades: any[] = [];
  items: any[] = [];

  selected: boolean = false;
  constructor(private _customer: CustomerService,
    private upgradeService: UpgradeService,
    private _httpClient: HttpClient,
    private eventbus: EventBusService,
    private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.eventbus.on('getTimeSlots', ((event: any) => {
      this.upgradeId = event;
      this.getCustomers();
    }));

    this._activatedRoute.queryParams
      .subscribe(params => {
        if (params.upgradeId) {
          this.upgradeId = params.upgradeId;
          this.getCustomers();
        }
      });
  }


  getCustomers() {
    this._customer.getCustomers(this.upgradeId).subscribe((result: any) => {
      this.items = result;
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
    if (!this.upgradeId || !this.selectedIndex)
      return;

    let customer = this.items[this.selectedIndex || 0];

    let obj = {
      "herId": customer.herId,
      "upgradeId": this.upgradeId
    }

    return;
    // needs to do that part
    this._customer.saveAppointments(obj).subscribe(result => {
      alert('saved');
    });
  }

  public setRow(_index: number) {
    this.selectedIndex = _index;
  }

}

