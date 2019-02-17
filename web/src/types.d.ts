const { AjaxResponse } = require('rxjs/ajax');

declare module 'transactionTypes' {
  export interface TransactionMapType {
    [hash: string]: TransactionType;
  }

  export interface TransactionGroupType {
    order: string[];
    transactionsMap: TransactionMapType;
  }

  export interface TransactionState extends TransactionGroupType {
    address: string | null;
    isFetching: boolean;
    error: string | null;
  }

  export interface TransactionsParamsType {
    address: string;
    page?: number;
    offset?: number;
  }

  export interface TransactionType {
    timeStamp: string;
    hash: string;
    from?: string;
    to?: string;
    value: string;
  }

  export interface TransactionsAjaxResponse extends AjaxResponse {
    response: TransactionGroupType;
  }
}

declare module 'ethereum-address' {
  export const isAddress: (value: string) => boolean;
}
