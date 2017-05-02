import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { SessionHandlerService, AuthHttp } from '../../Services/index';
import { LoggerService } from '../../SharedServices/index';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
})
export class MenuComponent implements OnInit, OnDestroy {
    isAuthenticated: boolean = false;
    langSubscribtion: boolean = false;
    private subscribtion: any;
    lang: string;
    mySidenav: any;

    constructor(private _userSession: SessionHandlerService, private router: Router, private _AuthHttp: AuthHttp,
        private _Logger: LoggerService, private translate: TranslateService) {

        this.subscribtion = this._userSession.onAuth.subscribe((result: boolean) => this.isLogedIn(result));
        this.langSubscribtion = translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.lang = event.lang;
        });
    }

    ngOnInit() {
        this.isAuthenticated = this._userSession.isLoggedIn();
        this._Logger.debug('ngOnInit - isAuthenticated: ' + this.isAuthenticated);
        // this.isAuthenticated = this.router.url === '/Login' ? false : true;

        // Get the Sidenav
        this.mySidenav = document.getElementById('mySidenav');
        // Get the DIV with overlay effect
        let overlayBg = document.getElementById('myOverlay');
        $('.navText').hide();
    }

    ngOnDestroy() {
        this._Logger.debug('unsubscribe from login');
        this.subscribtion.unsubscribe();
    }

    isLogedIn(value: boolean) {
        this.isAuthenticated = this._userSession.isLoggedIn();
        this._Logger.debug('menu - isLogedIn - isAuthenticated: ' + this.isAuthenticated);
    }

    changeLanguage(lang: any) {
        this.translate.use(lang);
        this._AuthHttp.SetLanguage(lang);
    }

    myFunc(id: any) {
        let x = document.getElementById(id);
        if (x.className.indexOf('w3-show') === -1) {
            x.className += ' w3-show';
            $('.navText').show();
            $('#main').removeClass('sidenav-margin-close');
            $('#main').addClass('sidenav-margin-open');
            $('#hide_navText_btn').html('<i class="flaticon-more"></i>');
            $('#hide_navText_btn').removeClass('w3-center');

            $('#mySidenav').removeClass('collapse');
            $('#mySidenav').addClass('expand');
        } else {
            x.className = x.className.replace(' w3-show', '');
            $('.navText').hide();
            $('#med').removeClass('w3-show');
            $('#Radio').removeClass('w3-show');
            $('#Report').removeClass('w3-show');
            $('#main').removeClass('sidenav-margin-open');
            $('#main').addClass('sidenav-margin-close');
            $('#hide_navText_btn').html('<i class="flaticon-more-1"></i>');
            $('#hide_navText_btn').addClass('w3-center');

            $('#mySidenav').removeClass('expand');
            $('#mySidenav').addClass('collapse');
        }
    }

    w3_close() {
        let overlayBg = document.getElementById('myOverlay');
        this.mySidenav.style.display = 'none';
        overlayBg.style.display = 'none';

        $('#main').removeClass('sidenav-margin-open');
        $('#main').addClass('sidenav-margin-close');
    }
    /*
        myFunc(id) {
            let x = document.getElementById(id);
            if (x.className.indexOf('w3-show') === -1) {
                x.className += 'w3-show';
                $('.navText').show();
                $('#main').removeClass('sidenav-margin-close');
                $('#main').addClass('sidenav-margin-open');
                $('#hide_navText_btn').html('<i class="flaticon-more"></i>');
                $('#hide_navText_btn').removeClass('w3-center');
            } else {
                x.className = x.className.replace('w3-show', '');
                $('.navText').hide();
                $('#main').removeClass('sidenav-margin-open');
                $('#main').addClass('sidenav-margin-close');
                $('#hide_navText_btn').html('<i class="flaticon-more-1"></i>');
                $('#hide_navText_btn').addClass('w3-center');
            }
        }
    */
    // myFunc_show_hide() {
    //     if ($('.navText').is(":visible")) {
    //         $('.navText').hide();
    //         $('#med').removeClass(" w3-show");
    //         $('#Radio').removeClass(" w3-show");
    //         $('#Report').removeClass(" w3-show");
    //         $('#main').removeClass('sidenav-margin-open');
    //         $('#main').addClass('sidenav-margin-close');
    //         $('#hide_navText_btn').html('<i class="flaticon-more-1"></i>');
    //         $('#hide_navText_btn').addClass(" w3-center");
    //     } else {
    //         $('.navText').show();
    //         $('#main').removeClass('sidenav-margin-close');
    //         $('#main').addClass('sidenav-margin-open');
    //         $('#hide_navText_btn').html('<i class="flaticon-more"></i>');
    //         $('#hide_navText_btn').removeClass(" w3-center");
    //     }
    // }

    // myFunc_hide() {
    //     $('.navText').hide;
    //     if ($('.navText').hasClass('w3-hide')) { } else {
    //         $('.navText').addClass('w3-hide');
    //     }
    //     $('#med').removeClass(' w3-show');
    //     $('#Radio').removeClass(' w3-show');
    //     $('#Report').removeClass(' w3-show');
    //     $('#main').css('margin-left', '60px');
    //     $('#hide_navText_btn').html('<i class="flaticon-more-1"></i>');
    //     $('#hide_navText_btn').addClass(' w3-center');
    // }

    // myFunc_show() {
    //     $('.navText').show();
    //     $('.navText').removeClass('w3-hide');
    //     $('#main').css('margin-left', '170px');
    //     $('#hide_navText_btn').html('<i class="flaticon-more"></i>');
    //     $('#hide_navText_btn').removeClass(' w3-center');
    // }
}
