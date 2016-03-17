import {Page, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {

    home:any;

    constructor(
        private _nav: NavController
    ) {
        this.home = HomePage;
    }
    onSubmit(): void{
        console.log('submit');
        this._nav.setRoot(this.home);
    }
}
