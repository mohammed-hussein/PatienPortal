import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { FileInfo } from '../../Services/ROI/fileinfo.model';
import { ROIService } from '../../Services/ROI/roi.service';
import { LoggerService, LoadingService } from '../../SharedServices/index';



@Component({
    moduleId: module.id,
    selector: 'ROI-List',
    templateUrl: './roi-list.component.html'
})

export class ROIListComponent implements OnInit {
    filesInfo: FileInfo[];
    selectedFile: FileInfo;
    isError = false;

    constructor(private _ROIService: ROIService, private _Logger: LoggerService, public _LoadingService: LoadingService,
                private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

    ngOnInit() {
        this.getMedicalReports();
    }

    getMedicalReports(): void {
        this.filesInfo = new Array<FileInfo>();
        this._ROIService.getMedicalReportsSummary().then(data => {
            this.filesInfo = data;
            this._Logger.info(this.filesInfo);
            this.onSelect(this.filesInfo[0]);
        }).catch(() => this.isError = true)
            .then(() => this._Logger.debug('Error found ' + this.isError));
    }

    onSelect(filesInfo: FileInfo): void {
        this.selectedFile = filesInfo;
        if (filesInfo) {
            this.router.navigate(['ROIDetails', filesInfo.FileId], { relativeTo: this.route });
        }
    }

}
