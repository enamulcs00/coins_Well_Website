import { FormControl } from '@angular/forms';

export function ValidString(control: FormControl) {
    let pattern = /^[a-zA-Z ]*$/gi; // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (!pattern.test(control.value)) {
        return { validString: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}