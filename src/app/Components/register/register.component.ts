import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIUsersService } from 'src/app/Services/apiusers.service';
import { MatchPassword,PasswordNotIncludeName } from 'src/app/Validators/PasswordValidator';
import { User } from 'src/app/ViewModels/user-view-model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { forbiddenPasswordValidator } from 'src/app/Validators/HardPassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  // id: number,
  // Name: string,
  // Email: string,
  // Phone: string,
  // City: string,
  // Postal: string,
  // street: string,
  // password:string
  User = {} as User;
  RegisterForm:FormGroup;
  constructor(private APIUserServise:APIUsersService,
    private router: Router,
    private formGroup:FormBuilder
    ) {
    this.RegisterForm = formGroup.group({
      Full_Name:['',[Validators.required,Validators.minLength(5)]],
      Email:['',[Validators.required]],//PasswordNameValidator(this.Full_Name?.value)
      password:['',[Validators.minLength(6),Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/i)]],
      confirmPassword:['',[Validators.minLength(6),Validators.required]],
      Mobile_number:formGroup.array([formGroup.control('',[Validators.required])]),//,Validators.pattern('^[+]*[(]{02}[)]{0,1}[-\s\./0-9]*$')
      Address:formGroup.group({
        city:['',[Validators.required]],
        street:['',[Validators.required]],
        postalCode:['',[Validators.required]]
      }),
      Delivery:[''],
      SpecificDay: [''], 
    },{validators: [MatchPassword,PasswordNotIncludeName]});
  }

  get Full_Name(){
    return this.RegisterForm.controls['Full_Name'];
  }
  get Email(){
    return this.RegisterForm.controls['Email'];
  }
  get password(){
    return this.RegisterForm.controls['password'];
  }
  get confirmPassword(){
    return this.RegisterForm.controls['confirmPassword'];
  }
  get Mobile_number(){
    return this.RegisterForm.controls['Mobile_number'] as FormArray;
  }
  get Address(){
    return this.RegisterForm.controls['Address'];
  }
  get street(){
    let varb = this.RegisterForm.controls['Address'] as FormGroup;
    //console.log(varb.controls['street']);
    return varb.controls['street'];
  }
  get city(){
    let varb = this.RegisterForm.controls['Address'] as FormGroup;
    //console.log(varb.controls['city']);
    return varb.controls['city'];
  }
  get postalCode(){
    let varb = this.RegisterForm.controls['Address'] as FormGroup;
    //console.log(varb.controls['postalCode']);
    return varb.controls['postalCode'];
  }
  get Delivery(){
    return this.RegisterForm.controls['Delivery'];
  }
  get SpecificDay(){
    return this.RegisterForm.controls['SpecificDay'];
  }
  ngOnInit(): void {
  }
  
  DeliveryValidaiton(){
    if (this.Delivery.value == "SpecificDays")
      this.RegisterForm.controls['SpecificDay'].setValidators([Validators.required]);
    else
      this.RegisterForm.controls['SpecificDay'].clearValidators();

      this.RegisterForm.controls['SpecificDay'].updateValueAndValidity();
  }

  AddUser(){
    console.log(this.User);
    // this.User.Name=this.Full_Name.value
    // this.User.Email=this.Email.value
    // this.User.City=this.city.value
    // this.User.Phone=this.Mobile_number.value
    // this.User.PostalCode=this.postalCode.value
    // this.User.street=this.street.value    
    // this.User.password=this.password.value
    this.User=this.RegisterForm.value;
    let obj=
    {
      password: this.User.password,
      Email: this.User.Email,
      Address: {
        City: this.User.Address.city,
        postalCode: this.User.Address.postalCode,
        street: this.User.Address.street
      },
      Mobile_number: this.User.Mobile_number,
      Full_Name: this.User.Full_Name
    }
    console.log(obj);
    console.log(this.User);
    console.log(this.User.Mobile_number);
    console.log(obj.Mobile_number);
    this.APIUserServise.addUser(this.User).subscribe(user=>{
      console.log("Done Save User");
      this.router.navigate(['/'])
    })
  }
  
  NewPhone(){
    this.Mobile_number.push(this.formGroup.control('',[Validators.required]));
  }

  DeletePhone(index:number){
    this.Mobile_number.removeAt(index);
  }

  Submit(){
    this.AddUser();
  }

}
