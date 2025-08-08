import { QueryInterface } from "../types/global";

const QueryExtractor = (obj: any): QueryInterface => {
    const { page = 1, limit = 10, fields = '' } = obj || {}
    
    const offset = (page - 1) * limit;
    const attributes = fields?.split(',')?.map((field: string) => field.trim());

    return {
        attributes,
        offset: offset || 0,
        limit: limit || 10
    }
}

export default QueryExtractor