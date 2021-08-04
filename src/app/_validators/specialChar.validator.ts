import { FormControl } from '@angular/forms';

export function specialChar(control: FormControl) {
    let pattern = new RegExp('(?=.*?[#?!@$%^&*-])'); // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (!pattern.test(control.value)) {
        return { specialChar: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}