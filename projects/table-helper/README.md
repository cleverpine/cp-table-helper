
# Table Helper

The Table Helper acts as a bridge between a PrimeNG table and a back-end service, simplifying the process of mapping and sending lazy load events for data retrieval on the front-end. It keeps the code clean and easy to maintain by handling the complex mapping details. This service extracts relevant information from the event, such as filtering criteria, sorting preferences, and pagination details. The data is then transformed into a format suitable for a back-end request. The transformed parameters are passed to the provided `loadDataService` method for actual data retrieval from the back-end.


## Table of contents

- [Installation](#installation)
- [Using the Service](#using-the-service)
- [How to Use with Shared Table Component](#how-to-use-with-shared-table-component)


## Installation


To use the Table Helper Service, you need to install it as a dependency in your Angular project. Run the following command in your project's root directory:

`npm install table-helper --save`

This will install the library and save it as a dependency in your project's `package.json` file.


## Using the service


After installing the library, you need to import the Table Helper Service in your table component:

    import { TableHelperService } from  'table-helper';
    
    // ...

    constructor(private tableHelperService: TableHelperService) {}

#### Lazy load & PrimeNg

In order to be able to use the service, lazy load functionality should be included in the table. It is used in cases when we need to load small chunks of data by invoking callbacks everytime for `paging`, `sorting` and `filtering` occurs. For more information on lazy load, open the following link https://primeng.org/table#lazy-load.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**1. Define a request method**

Before proceeding to how to use the service for lazy loading data, we should define a method that will handle the request to the back-end in the following way:

    loadDataService(tableSendDataParams: TableSendDataParams) {
      const sendDataParams = {
        ...tableSendDataParams
        // add any extra parameters specific to your use case
      }
      
      // Adjust this line according to your use case
      return this.aircraftService.getAircrafts(sendDataParams);
    }

**NOTE**: `TableSendDataParams` has the following definition:

    interface TableSendDataParams {
      filter?: string[];
      sort?: string[];
      page?: number;
      size?: number;
    }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2. Using the service**

In order to be able to use the service, `onLazyLoad` event should be binded to the table:

    <table [lazy]="true" (onLazyLoad)="loadData($event)">
      <!-- Table content goes here -->
    </table>

Then, the `loadData` should be implemented in the following way:

    loadData(event: TableLazyLoadEvent) {
      if (!this.loadDataService) {
        return;
      }
      
      this.tableHelperService.sendRequest(event, this.loadDataService).subscribe({
        next: result => {
          // handle result
        },
        error: err => {
          // handle error
        }
      });
    }

As it can be seen in the example above, `sendRequest` accepts two parameters:

 - event - represents the `TableLazyLoadEvent` that is emitted when the `onLazyLoad` event occurs in PrimeNG table
 - this.loadDataService - refers to the method defined earlier (`loadDataService`) that handles back-end request


## How to use with shared table component

When integrating the Table Helper Service with a shared table component, follow these steps:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**1. Define `loadDataService`**

`loadDataService` method implementation is the same as shown in the previous section. However, the only difference is that it has to be defined in the component where the shared table component is used. In addition, ensure to bind `this` to `loadDataService` in `ngOnInit` in the following way: `this.loadDataService = this.loadDataService.bind(this);`:

    ngOnInit() {
      this.loadDataService = this.loadDataService.bind(this);
    }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2. Pass `loadDataService` to shared table component**

In the shared table component, you need to receive the loadDataService method as an input. This input property is used later in the loadData method, which is bound to the onLazyLoad event in the table. Add the following input property to your shared table component:


    `@Input() loadDataService!: (params: TableSendDataParams) => Observable<any>;`

This is the `loadDataService` parameter that is passed to the service (see `loadData` method).
