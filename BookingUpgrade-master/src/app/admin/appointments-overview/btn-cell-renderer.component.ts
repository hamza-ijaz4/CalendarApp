import { Component, OnDestroy } from "@angular/core";
import { ICellRendererAngularComp } from  'ag-grid-angular';
import { ICellRendererParams } from "ag-grid-community";


@Component({
  selector: "btn-cell-renderer",
  template: `
 <button type="button" (click)="onClick($event)">{{label}}</button>
  `
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
  }
  refresh(params: ICellRendererParams): boolean {
    throw new Error("Method not implemented.");
  }

  params: any;
  label!: string;

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }


  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);
      console.log(params)
    }
  }
}
