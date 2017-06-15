// Core imports
import {
    Component,
    OnInit,
    ViewChild,
    HostListener,
    ElementRef,
    Inject } from '@angular/core';

// Router imports
import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';

// Other
import { appAnimations } from './shared/animations/app.animations';
import { TranslateService } from './shared/languages';
import {
    MdSnackBar,
    MdSidenav } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import {
    PageScrollService,
    PageScrollInstance } from 'ng2-page-scroll';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [ appAnimations.favPanelAnimation() ]
})

export class AppComponent implements OnInit {

    public favState: string = 'inactive';
    public selectedLanguage: any;
    public supportedLangs: any;
    public loading: boolean;


    @ViewChild('sidenav') public _sidenav: MdSidenav;
    @ViewChild('container')
    private container: ElementRef;

    constructor(private _translate: TranslateService,
                private _snackBar: MdSnackBar,
                private _pageScrollService: PageScrollService,
                @Inject(DOCUMENT) private document: any,
                private _router: Router) {
        /*
         * Router states subscriber
         * */
        _router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationStart) {
                this.loading = true;
            }
            if (event instanceof NavigationEnd) {
                this.loading = false;
            }
            if (event instanceof NavigationCancel) {
                this.loading = false;
            }
            if (event instanceof NavigationError) {
                this.loading = false;
            }
        });
    }


    /*
     * Scroll Listener
     * */

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        const number = this.document.body.scrollTop;
        if (number > 50) { this.favState = 'active'; } else { this.favState = 'inactive'; }
    }


    /*
     * Language Related
     * */
    ngOnInit() {
        // Translations
        this.supportedLangs = [
            { display: 'English', value: 'en' },
            { display: 'Español', value: 'es' }
        ];

        let locale = localStorage.getItem('localeId');
        if (!locale) {
            locale = this._translate.getDefaultLanguage().value;
        }

        this.selectedLanguage = TranslateService.buildLanguage(locale);
        this._translate.use(locale);
    }

    selectLang(lang: string) {
        // set current lang;
        this.selectedLanguage = TranslateService.buildLanguage(lang);
        localStorage.setItem('localeId', lang);

        this._snackBar.open(this.selectedLanguage.display + this._translate.instant('INTRO_CONTROLLER_IS_LOADING'), 'Ok', {
            duration: 2000
        });
        setTimeout(function() {
            location.reload(true);
        }, 3000);
    }



    /*
     * Scroll
     * */

    scrollToTop(): void {
        const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#inner-app-scroll-container');
        this._pageScrollService.start(pageScrollInstance);
    }
}
