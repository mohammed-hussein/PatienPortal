import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import {TellusService} from '../../Services/tellus.service';
import {IFeedback} from '../../Services/feedback.model';
import { LoggerService } from '../../SharedServices/index';

@Component({
    moduleId: module.id,
    selector: 'tellus-details',
    templateUrl: 'feedback-details.component.html'
})
export class FeedbackDetailsComponent implements OnInit {
    feedback: IFeedback;

    constructor(private route: ActivatedRoute, private _tellus: TellusService,
                private router: Router, private _Logger: LoggerService, private translate: TranslateService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.getFeedback();
        });
    }

    getFeedback() {
        this.feedback = new IFeedback();
        this._Logger.info(this._tellus.selectedFeedback);
        if (this._tellus.selectedFeedback) {
            this.feedback = this._tellus.selectedFeedback;
        }else {
            this.router.navigate(['Feedbacks']);
        }
    }
}
