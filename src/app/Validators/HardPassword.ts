import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenPasswordValidator (control: AbstractControl): ValidationErrors | null {
    const forbidden = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/i.test(control.value);
    return forbidden ? {forbiddenPassword: {value: control.value}} : null;
};