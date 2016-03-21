import {Page, NavController} from 'ionic-angular';
import {LoginService} from "../../providers/login-service/login-service";

/*
 Generated class for the SettingsPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {

    currentUser:any = '';

    constructor(
        private _nav: NavController,
        private _authService: LoginService
    ) {
        this.currentUser = this._authService.data;
    }
    ngOnInit(){
        //subscribe to user observable
        this._authService.currentUser.subscribe(
            updatedUser => this.currentUser = updatedUser
        );
    }
}
