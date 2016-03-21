import {Page, NavController} from 'ionic-angular';
import {LoginService} from "../../providers/login-service/login-service";

/*
 Generated class for the ProfilePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {

    user: any;

    constructor(
        private _nav: NavController,
        private _authService: LoginService
    ) {
        this.user = this._authService.userData;
    }
    ngOnInit(){
        //subscribe to userObject in Login Service
        this._authService.currentUser.subscribe(
            updatedUser => this.user = updatedUser
        );
    }
}
