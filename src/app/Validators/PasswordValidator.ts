import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** A hero's name can't match the hero's alter ego */
export const MatchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const Full_Name = control.get('Full_Name');
    // const p=(password?.value);
    // console.log(p.includes(Full_Name?.value));
    //!((password?.value).includes(Full_Name?.value))     
    //console.log((password?.value).Include(Full_Name?.value))
    return (password && confirmPassword) && (password?.value == confirmPassword?.value) ?  null:{ Mismatch: true };
};

export const PasswordNotIncludeName: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const Full_Name = control.get('Full_Name');
  // const p=(password?.value);
  // console.log(p.includes(Full_Name?.value));
  //!((password?.value).includes(Full_Name?.value))     
  //console.log((password?.value).Include(Full_Name?.value))
  return (password && Full_Name) && !((password?.value).includes(Full_Name?.value)) ?  null:{ IncludeName: true };
};