import { FormControl } from '@angular/forms';

export function removeSpaces(control: FormControl) {
    let pattern =/^\S*$/gi; // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (!pattern.test(control.value)) {
        return { removeSpaces: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}