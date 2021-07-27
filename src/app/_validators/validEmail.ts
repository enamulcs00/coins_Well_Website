import { FormControl } from '@angular/forms';

export function validEmail(control: FormControl) {
    let pattern = /^^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi; // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (!pattern.test(control.value)) {
        return { validEmail: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}