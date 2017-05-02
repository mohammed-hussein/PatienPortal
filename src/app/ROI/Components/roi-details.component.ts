import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { TranslateService } from '@ngx-translate/core';

import {ROIService} from '../../Services/ROI/roi.service';
import { LoggerService } from '../../SharedServices/index';

declare let jsPDF: any;

@Component({
    moduleId : module.id,
    selector: 'ROI-Details',
    templateUrl: './roi-details.component.html'

})

export class ROIDetailsComponent implements OnInit {

    fileId: string;
    images: string[];
    isLoaded: boolean = false;
    alink: HTMLElement;

    constructor(private _ROIService: ROIService, private route: ActivatedRoute, private location: Location,
                private _Logger: LoggerService, private translate: TranslateService) { }

    ngOnInit(): void {
                this.route.params.subscribe(params => {
                this.fileId = params['id'];
                this._Logger.debug( this.fileId);
                this.fileId = encodeURIComponent(this.fileId);
                this._Logger.debug( this.fileId);
                this.getFile();
                // In a real app: dispatch action to load the details here.
            });
        }

    getFile(): void {
        this._Logger.debug('start load images');
        this._ROIService.getReportFile(this.fileId).then(data => this.images = data)
                                                    .then(() => this.isLoaded = true)
                                                    .then(() => this._Logger.info(this.images))
                                                    .then(() => this._Logger.info(this.isLoaded));
    }

    print() {
        this._Logger.debug('start printing..');
        window.print();
    }

    download() {
        this._Logger.info(this.images.length);
        let doc = new jsPDF();
        doc.setFontSize(20);
        doc.text(75, 10, 'Medical Report');

        for (let l = 0; l < this.images.length; l++) {
            let imgData = 'data:image/jpg;base64,' + this.images[l];
            doc.addImage(imgData, 'JPEG', 15, 20, 180, 160);
            if (l !== (this.images.length - 1)) {
                doc.addPage();
            }
        }
        doc.save('report.pdf');
    }

    downloadasHtml() {
        this._Logger.debug('Start Downloading..');
        let doc = new jsPDF();
        // doc.text('Hello world!', 10, 10);
        // doc.save('a4.pdf');

        let innerContents = document.getElementById('printpage').innerHTML;

        // We'll make our own renderer to skip this editor
        let specialElementHandlers = {'#bypassme': function(element: any, renderer: any){
                                                            return true;
                                                        }};

        // All units are in the set measurement for the document
        // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
        doc.fromHTML(innerContents, 15, 15, {'width': 170, 'elementHandlers': specialElementHandlers});
        doc.output('dataurlnewwindow');
    }

    download3() {
        let innerContents = document.getElementById('printpage').innerHTML;
            let _downloadUrl = URL.createObjectURL(new Blob([innerContents] , {type: 'text/pdf'}));
            this.alink = document.getElementById('link');
            this.alink.attributes['href'] = _downloadUrl;
    }

    printReport() {
        this._Logger.debug('start printing..');

        let innerContents = document.getElementById('printpage').innerHTML;
        let originalContents = document.body.innerHTML;
/**
        document.body.innerHTML = innerContents;
        window.print();
        document.body.innerHTML = originalContents;
*/
        let popupWinindow = window.open('', '_blank',
         'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        let innerHtml = '<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body>' + innerContents + '</html>';
        popupWinindow.document.write(innerHtml);
        this._Logger.debug(innerHtml);
        //popupWinindow.document.close();
        //popupWinindow.focus();
        popupWinindow.print();
        popupWinindow.close();
    }

}
