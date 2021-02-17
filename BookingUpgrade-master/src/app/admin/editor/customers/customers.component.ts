import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomerService } from 'src/app/shared/services/customer-service.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  @Input() upgradeId!: string;

  upgrades: any[] = [];
  items: any[] = [];

  selected: boolean = false;
  constructor(private _customer: CustomerService, private messageService: MessageService) { }


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
    if (!this.upgradeId)
      return;

    let herIds = this.items.filter(a => a.isSelected).map(a => a.herId);

    let obj = {
      "herIds": herIds,
      "upgradeId": this.upgradeId
    }

    this._customer.saveAppointments(obj).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Invited successfully' });
      this.getCustomers();
    });
  }

}

