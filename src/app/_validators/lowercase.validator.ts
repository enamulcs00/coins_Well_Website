import { FormControl } from '@angular/forms';

export function lowerCase(control: FormControl) {
    let pattern = new RegExp('([?=.*[a-z])');
    //if validation fails, return error name & value of true
    if (!pattern.test(control.value)) {
        return { lowerCase: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}