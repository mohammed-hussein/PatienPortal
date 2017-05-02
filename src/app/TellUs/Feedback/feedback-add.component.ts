import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { TellusService } from '../../Services/tellus.service';
import { IFeedback } from '../../Services/feedback.model';

import { LoggerService } from '../../SharedServices/index';
import { AuthService, ProfileService, SessionHandlerService } from '../../Services/index';

@Component({
    moduleId: module.id,
    selector: 'feedback-add',
    templateUrl: 'feedback-add.component.html'
})
export class AddFeadbackComponent implements OnInit {
    @Input() feedback = new IFeedback();
    isSaved = false;
    type: string;
    // @Input() Feedbacktype: string;

    Buildings: string[];
    selectedBuilding: string;

    Floors: string[];
    selectedFloor: string;

    constructor(private _tellUs: TellusService, private auth: AuthService, private router: Router,
        private _userSession: SessionHandlerService, private _Logger: LoggerService,
        private _ProfileService: ProfileService, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit(): void {
        this.feedback = new IFeedback();
        this.isSaved = false;
        this.feedback.MRN = this._userSession.getUserId();
        this.feedback.Location = '';
        this.feedback.Floor = '';

        // this.feedback.Feedback_Type = this._tellUs.Feedback_Type;
        // alert(this.feedback.Feedback_Type);
        this.route.params.subscribe(params => {
            this.type = params['type'];
            if (this.type) {
                // this.feedback.Feedback_Type = this.type;
                this.feedback.Feedback_Type = this.type;
                let element = document.getElementById('id_Addfeedback');
                element.style.display = 'block';
            }
        });

        this.getProfileData();
        this.getBuildings();

    }

    getProfileData() {
        this._ProfileService.getProfileData()
            .then(data => {
                this._Logger.info(data);

                this.feedback.MRN = data.nid;
                this.feedback.name = data.English_Name;
                this.feedback.Arabic_name = data.Arabic_name;
                this.feedback.mobile = data.mobilenumber;
            })
            .catch(err => this._Logger.Error(err));
    }

    getBuildings(): void {
        this._tellUs.getBuildings().then(buildings => this.Buildings = buildings).then(data => this._Logger.info(this.Buildings));
        // .then(data => this.getFloors(this.Buildings[0]));
    }

    getFloors(buidling: string): void {
        this._tellUs.getFloors(buidling).then(floors => this.Floors = floors).then(data => this._Logger.info(this.Floors));
    }

    onSelectBuilding(building: string): void {
        this._Logger.debug('building: ' + building);
        this.selectedBuilding = building;
        this.getFloors(this.selectedBuilding);
    }

    onSelectFloor(floor: string): void {
        this._Logger.debug('floor: ' + floor);
        this.selectedFloor = floor;
    }

    onSubmit(): void {
        // this.feedback.MRN = 1000;
        this._tellUs.Add(this.feedback).then(result => {
            this.isSaved = result;
        }).catch(r => this.isSaved = false);
        // document.getElementById('id_Addfeedback').style.display='none'
    }

    onClose() {
        // this.feedback = new IFeedback();
        // this.ngOnInit();
        let element = document.getElementById('id_Addfeedback');
        element.style.display = 'none';
        // this.router.navigate(['/Feedbacks'], { relativeTo: this.route });
        this.router.navigate(['/Feedbacks/container']);
    }

    get diagnostic() { return JSON.stringify(this.feedback); }
}
