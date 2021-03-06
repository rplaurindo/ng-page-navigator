import {
    Component,
    AfterViewInit
} from '@angular/core';

import { NgPageNavigator } from '../../projects/ng-page-navigator/src/public_api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
    title = 'app';

    currentPageNumber: number;
    enablePageNumberInputBox: boolean;

    private _pagination: NgPageNavigator.Pagination;

    constructor() {
        this.currentPageNumber = 1;
        this.enablePageNumberInputBox = true;

        const
            interval: NodeJS.Timer = setInterval(
                () => {
                    this._pagination.totalPages = 1110;
                    console.log('function called after interval');
                    clearInterval(interval);
                }, 2000
            );

        let
            count: number = 0;
    }

    ngAfterViewInit() {
    }

    onChangePage(pageNumber: number) {
        this._pagination.totalPages = 11110;
        this.currentPageNumber = pageNumber;
    }

    onInitPagination(pagination: NgPageNavigator.Pagination) {
        this._pagination = pagination;
    }

}
