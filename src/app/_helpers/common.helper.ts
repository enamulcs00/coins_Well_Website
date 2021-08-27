import { AbstractControl } from '@angular/forms';
import { Notify } from 'notiflix';
export const loadImage = (files) => {
    return new Promise((resolve, reject) => {
        var mimeType = files.type;
        if (mimeType.match(/image\/*/) == null) {
            Notify.failure("Only valid image format is allowed.");
            reject(null);
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = (_event) => {
            resolve(reader.result);
        }
    })
}


export const showErrors = (formControl: AbstractControl) => {
    if (formControl.errors != null) {
        let error;
        Object.keys(formControl.errors).splice(0,1).forEach(key => {
            error = key;
        })
        return error;
    }
    return false;
}