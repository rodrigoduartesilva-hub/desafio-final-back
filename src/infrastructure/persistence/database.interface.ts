export interface IDatabase {
    list(type: any, where?: any): any[],
    create(type: any, data: any, where?: any): any,
    read(type: any, dataId: number): any,
    update(type: any, data: any): any,
    delete(type: any, dataId: any): any
}