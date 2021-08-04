import { FormControl } from '@angular/forms';

export function uperCase(control: FormControl) {
    let pattern = new RegExp('([?=.*[A-Z])'); // can change regex with your requirement
    //if validation fails, return error name & value of true
    console.log("control.valid",control.status);
    if (control.value && !pattern.test(control.value)) {
        return { uperCase: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}