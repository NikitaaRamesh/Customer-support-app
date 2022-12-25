import { Component, OnInit } from '@angular/core';
import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface formDataInterface {

  "email": string;
  
  [key: string]: string;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading:boolean = false;
  
  email:string = '';
  
  password:string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {}

  onSignup(form: NgForm){
    if (form.valid) {
     this.isLoading = true;
     var poolData = {
       UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
       ClientId: environment.cognitoAppClientId // Your client id here
     };
     var userPool = new CognitoUserPool(poolData);
     var attributeList = [];
     let formData:formDataInterface = {
       
       "email": this.email,
       
     }

     for (let key  in formData) {
       let attrData = {
         Name: key,
         Value: formData[key]
       }
       let attribute = new CognitoUserAttribute(attrData);
       attributeList.push(attribute)
     }
     userPool.signUp(this.email, this.password, attributeList, [], (
       err,
       result
     ) => {
       this.isLoading = false;
       if (err) {
         alert(err.message || JSON.stringify(err));
         return;
       }
       this.router.navigate(['/login-page']);
     });
    }
 }
}
