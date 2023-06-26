export interface IUseCasePaginado {
    execute(limit?: number, offset?: number): any;
  }