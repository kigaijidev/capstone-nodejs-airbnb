export class ResponseBody {
    statusCode: number;
    content: any;
    dateTime: Date;

    constructor(status, data){
        this.statusCode = status,
        this.content = data,
        this.dateTime = new Date()
    }
}