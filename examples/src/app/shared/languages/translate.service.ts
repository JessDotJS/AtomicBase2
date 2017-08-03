import {Injectable, Inject} from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token

@Injectable()
export class TranslateService {
    private _currentLang: string;

    public get currentLang() {
        return this._currentLang;
    }

    // inject our translations
    constructor(@Inject(TRANSLATIONS) private _translations: any) {
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
    }

    private translate(key: string): string {
        // private perform translation
        const translation = key;

        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }

        return translation;
    }

    public instant(key: string) {
        // call translation
        return this.translate(key);
    }

    public getDefaultLanguage(): any {
        const longLang: string = navigator.language;
        const fields: any[] =  longLang.split('-');
        return TranslateService.buildLanguage(fields[0]);
    }

    public static buildLanguage(shortName: string): any {
        switch (shortName) {
            case 'en': {
                return {
                    display: 'English',
                    value: 'en'
                };
            }
            case 'es': {
                return {
                    display: 'Español',
                    value: 'es'
                };
            }
            default: {
                return {
                    display: 'English',
                    value: 'en'
                };
            }
        }
    }
}
