import { Directive, Input } from '@angular/core';
import { environment } from '../../../src/environments/environment';

@Directive({
    selector: 'img[src]',
    host: {
        '[src]': 'checkPath(src)',
        '(error)': 'onError()'
    }
})
export class DefaultImage { 
    @Input() src: string;
    public defaultImg: string = environment.homeURL+'assets/images/jpg/no-user.jpg';
    public onError() {
        this.src = this.defaultImg;
    }
    public checkPath(src) {
        return src ? src : this.defaultImg;
    }
}