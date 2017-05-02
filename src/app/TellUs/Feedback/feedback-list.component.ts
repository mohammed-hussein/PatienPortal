import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { TellusService } from '../../Services/tellus.service';
import { IFeedback } from '../../Services/feedback.model';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'tellus-listfeedback',
    templateUrl: './feedback-list.component.html'
})

export class FeedbacklistComponent implements OnInit {
    Feedbacks: IFeedback[];
    selectedFeedback: IFeedback;
    showData: boolean = true;

    constructor(private _tellus: TellusService, private _Logger: LoggerService,
                private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit(): void {
        this.GetFeedbacks();
    }

    GetFeedbacks(): void {
        let status = 'new';
        this._tellus.getFeedbackItems(status).then(data => {
            this.showData = true;
            this.Feedbacks = data;
            this._Logger.info(this.Feedbacks);
            this.onSelect(this.Feedbacks[0]);
        }).catch(error => this.handleNoData(error));
    };

    onSelect(feedback: IFeedback): void {
        this.selectedFeedback = feedback;
        this._tellus.selectedFeedback = new IFeedback();
        this._tellus.selectedFeedback = feedback;
        if (feedback) {
            this.router.navigate(['details', feedback.RefNo], { relativeTo: this.route });
        }
    }

    handleNoData(ERR: any) {
        if (ERR.status === 404) {
            this.showData = false;
            let error = JSON.parse(ERR._body);
            error = error['Message'];
            this.router.navigate(['nodata', error], { relativeTo: this.route });
        } else {
            this._Logger.Error(ERR);
        }
    }

    openAdd() {
        // let element = document.getElementById('id_Addfeedback');
        // element.style.display = 'block';
        this.router.navigate(['add', 'Idea'], { relativeTo: this.route });
    }

}
