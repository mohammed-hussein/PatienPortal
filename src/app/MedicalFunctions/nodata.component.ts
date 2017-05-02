import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'no-Records',
    templateUrl: 'nodata.component.html'
})
export class NoRecordsComponent implements OnInit {
    Error_Msg: string = 'No Records Found!';

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.Error_Msg = params['msg'];
        });
    }
}
