import {Page, NavController} from 'ionic-angular';
import {ControlGroup, FormBuilder, AbstractControl, Validators, Control} from 'angular2/common';
import {HomePage} from "../home/home";
import {ValidationService} from "../../providers/login-service/validation-service";
import {LoginService} from "../../providers/login-service/login-service";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/login/login.html',
    providers:[ValidationService]
})
export class LoginPage {
    myForm:ControlGroup;
    error: boolean = false;
    errorMessage: string;
    emailControl: AbstractControl;
    home:any;
    loginPage:any;

    constructor(
        private _nav: NavController,
        private _fb: FormBuilder,
        public _authService: LoginService
    ) {
        this.home = HomePage;
        this.loginPage = LoginPage;
        this.errorMessage = null;

    }
    ngOnInit(){
        //Initialize Form
        this.myForm = this._fb.group({
            email: ['', Validators.compose([
                Validators.required,
                ValidationService.emailValidator,
            ])],
            password: ['', Validators.required]
        });

        this.emailControl = this.myForm.controls['email'];


    }
    onSubmit(): void{
        this._authService.firebaseRef.authWithPassword(this.myForm.value
            ,function(error, authData){
                if(error) {
                    this.errorMessage = error;
                }else {
                    this._authService.isLogged = authData;
                    console.log('signed in!');
                    this._nav.setRoot(this.home);

                    //store token in localstorage
                    //localStorage.setItem('token', authData.token);
                    //console.log(authData);

                    //after complete authenticate and emit event
                    //this._authService.isAuthenticated();
                    //this._authService.loggedEvent('login');
                }
            }.bind(this)
        );

    }
}
