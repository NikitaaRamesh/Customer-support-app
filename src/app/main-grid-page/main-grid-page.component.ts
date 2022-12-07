import { Component, enableProdMode, OnInit , ViewEncapsulation} from '@angular/core';
import { Column, GridOption, Formatters } from './../modules/angular-slickgrid'

const ITEMSNo = 995;

@Component({
  templateUrl: './main-grid-page.component.html',
  encapsulation: ViewEncapsulation.None
})

export class MainGridPageComponent implements OnInit {
  title = 'Grid data';
  subTitle = `
  Hope the data works
  `;

  columnDefinitions_1: Column[] = [];
  gridOptions_1!: GridOption;
  dataset_1!: any[];


  ngOnInit() {
    this.columnDefinitions_1 = [
      { id: 's-no', name: 'S_No', field: 'sNo', sortable: true },
      { id: 'username', name: 'Username', field: 'username', sortable: true },
      { id: 'date-created', name: 'Date Created', field: 'dateCreated', formatter: Formatters.dateIso },
      { id: 'organization-name', name: 'Organization name', field: 'organizationName', sortable: true },
      { id: 'unit-name', name: 'Unit name', field: 'unitName', sortable: true },
      { id: 'uuid', name: 'UUID', field: 'uuid', sortable: true },
      { id: 'last-login-date', name: 'Last Login date', field: 'lastLoginDate', formatter: Formatters.dateIso }
    ];
    this.gridOptions_1 = {
      autoResize: {
        applyResizeToContainer: true,
        calculateAvailableSizeBy: 'window',
        bottomPadding: 20,
        minHeight: 180,
        minWidth: 300,
        rightPadding: 0
      },
      enableSorting: true,
      autoFitColumnsOnFirstLoad: true,
    };

    this.dataset_1 = this.mockDataItems(ITEMSNo);

  }
  mockDataItems(count: number) {
    const mockDatasetItems = [];
    for (let j = 0; j < count; j++) {
      const randYear = 2000 + Math.floor(Math.random() * 10);
      const randMonth = Math.floor(Math.random() * 11);
      const randDay = Math.floor((Math.random() * 29));

      mockDatasetItems[j] = {
        sNo: j,
        username: 'User ' + j,
        dateCreated: new Date(randYear, randMonth + 1, randDay),
        organizationName: 'Organization ' + j,
        unitName: 'Unit ' + j,
        uuid: 'UU' + Math.round(Math.random() * 10000000),
        lastLoginDate: new Date(randYear + 1, randMonth + 1, randDay)
      };
    }

    return mockDatasetItems;
  }
}
