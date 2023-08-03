import { ResponseBody } from "./responseBody";

export class PaginationBody extends ResponseBody {
    constructor(status, pageIndex: number, pageSize: number, total: number, keyword, data){
        const pagination = {
            pageIndex,
            pageSize,
            total,
            keyword,
            data
        }
        super(status, pagination);
    }
}