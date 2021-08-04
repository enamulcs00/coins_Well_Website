import { FormControl } from '@angular/forms';

export function oneDigit(control: FormControl) {
    let pattern = new RegExp('(?=.*?[0-9])'); // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (!pattern.test(control.value)) {
        return { oneDigit: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}