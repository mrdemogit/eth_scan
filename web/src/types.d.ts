const { AjaxResponse } = require('rxjs/ajax');

declare module 'transactionTypes' {
  export interface TransactionsParamsType {
    address: string;
  }

  export interface TransactionType {
    timeStamp: string;
    from?: string;
    to?: string;
    value: string;
  }

  export interface TransactionsAjaxResponse extends AjaxResponse {
    response: {
      result: TransactionType[];
      message: string;
      status: string;
    };
  }
}
