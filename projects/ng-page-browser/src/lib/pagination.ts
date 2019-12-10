export class Pagination<T> {

    private collection: T[];

    private limit: number;

    private count: number;

    private totalPages: number;

    private currentPageNumber: number;

    // an array with items of page
    private page: T[];

    constructor(collection: T[], limit: number) {
        this.collection = collection || [];
        this.count = this.collection.length;
        this.limit = Pagination.resolvesLimit(this.count, limit);
        this.totalPages = Pagination.calculatesTotalPages(this.count, limit);
        this.page = [];
    }

    private static calculatesOffset(limit: number, pageNumber: number = 1, count: number): number {
        let totalPages: number;

        let offset: number;

        if (count) {
            limit = Pagination.resolvesLimit(count, limit);
            totalPages = Pagination.calculatesTotalPages(count, limit);
            // cause' of these filters isn't possible the offset exceed maximum
            pageNumber = Pagination.resolvesPageNumber(pageNumber, totalPages);
        } else if (pageNumber < 1) {
            pageNumber = 1;
        }

        offset = limit * (pageNumber - 1);

        if (offset < 0) {
            offset = 0;
        }

        return offset;
    }

    static calculatesTotalPages(count: number, limit?: number): number {
        limit = Pagination.resolvesLimit(count, limit);

        if (limit && count > 0 && limit > 0) {
            return Math.ceil(count / limit);
        }

        return 1;
    }

    private static resolvesLimit(count: number, limit: number): number {
        if (count === 0) {
            return count;
        } else if (limit < 0) {
            return 0;
        }

        return limit;
    }

    private static resolvesPageNumber(pageNumber: number, totalPages: number): number {
        if (pageNumber > totalPages) {
            return totalPages;
        } else if (pageNumber < 1) {
            return 1;
        }

        return pageNumber;
    }

    setLimit(value: number) {
        this.limit = value;
    }

    getPage(pageNumber: number): T[] {
        let offset: number;

        if (!this.currentPageNumber
            || pageNumber !== this.currentPageNumber
        ) {
            this.currentPageNumber = Pagination.resolvesPageNumber(pageNumber, this.totalPages);
            offset = Pagination.calculatesOffset(this.limit, this.currentPageNumber, this.count);
            this.page = this.collection.slice(offset, offset + this.limit);

        }

        return this.page;
    }

}
