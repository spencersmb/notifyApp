import {App, IonicApp, Platform, NavController} from 'ionic-angular';
import {GettingStartedPage} from './pages/getting-started/getting-started';
import {ListPage} from './pages/list/list';
import {LoginPage} from "./pages/login/login";
import {HomePage} from "./pages/home/home";
import {SearchPage} from "./pages/search/search";
import {GroupsPage} from "./pages/groups/groups";
import {SettingsPage} from "./pages/settings/settings";
import {ProfilePage} from "./pages/profile/profile";
import {LoginService} from "./providers/login-service/login-service";
import {GroupService} from "./providers/groups-service/groups-service";
import {NotesService} from "./providers/notes-services/notes-service";


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers:[LoginService, GroupService, NotesService]
})
class MyApp {
  rootPage: any;
  pages: Array<{title: string, component: any}>;
  home: any;
  loginPage: any;

  constructor(
      private app: IonicApp,
      private platform: Platform,
      private _authService: LoginService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Home', component: HomePage },
      { title: 'Find Groups', component: SearchPage },
      { title: 'My Groups', component: GroupsPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Profile', component: ProfilePage }

      //{ title: 'Getting Started', component: GettingStartedPage },
      //{ title: 'List', component: ListPage }
    ];

    //IF user is logged in - go to homepage
    this.rootPage = this.checkAuth() ? HomePage : LoginPage;
    this.loginPage = LoginPage;
  }
  checkAuth(): boolean{
    if(this._authService.isLogged !== null){
      return true;
    } else {
      return false;
    }
  }
  initializeApp() {

    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
  navSignOut(){
    this._authService.signOut();
    let nav = this.app.getComponent('nav');
    nav.setRoot(this.loginPage);
  }
}
