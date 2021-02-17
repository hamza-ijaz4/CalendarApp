import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/shared/services/customer-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @Input() upgradeId!: string;
  selectedIndex: number | undefined;

  upgrades: any[] = [];
  items: any[] = [];

  selected: boolean = false;
  constructor(private _customer: CustomerService,) { }


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.upgradeId.currentValue) {
      if (this.upgradeId) {
        this.getCustomers();
      }
    }
  }


  getCustomers() {
    if (!this.upgradeId)
      return;
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
    this._customer.saveAppointments(obj).subscribe(() => {
      alert('saved');
    });
  }

  public setRow(_index: number) {
    this.selectedIndex = _index;
  }

}

