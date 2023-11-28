
# Table Helper Service


The Table Helper Service provides a service that can be used for sending lazy load requests to back-end and receive response back. Table sorting and filtering are also handled on back-end.


## Installation


To use the Table Helper Service, you need to install it as a dependency in your Angular project. Run the following command in your project's root directory:

`npm install table-helper --save`

This will install the library and save it as a dependency in your project's `package.json` file.


## Using the service


After installing the library, you need to import the Table Helper Service in your table component:

`import { TableHelperService } from  'table-helper';`

Afterwards, it should be added to the constructor in the following way:

`private  tableHelperService: TableHelperService`

And then, in the method that is used for the lazy load, it should be used in the following way:

    this.tableHelperService.sendRequest(event, this.loadDataService).subscribe({
        next: result => {
		   // result handling goes here
	    },
		error: err => {
			// error handling goest here
		}
    });

As it can be seen in the example above, `sendRequest` accepts two parameters:

 - event - from PrimeNg and is of type `TableLazyLoadEvent` and imported in the following way `import { TableLazyLoadEvent } from 'primeng/table';`
 - this.loadDataService - where the request is called

`this.loadDataService` should be defined in the following way:

    loadDataService(tableSendDataParams: TableSendDataParams) {
	    const sendDataParams = {
		    ...tableSendDataParams
		    // any additional params go here
		}
		// include the request in the return by passing the sendDataParams to it
	    return;
    }

**NOTE**: `TableSendDataParams` has the following definition:

    interface TableSendDataParams {
	    filter?: string[];
	    sort?: string[];
	    page?: number;
	    size?: number;
    }

In addition, `this.loadDataService = this.loadDataService.bind(this);` should also be added to the `ngOnInit`.
