import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
declare var Firebase: any;

/*
 Generated class for the LoginService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LoginService {
    isLogged: boolean;
    errorMessage: string;
    data: any;
    firebaseRef: any;
    firebaseUrl:string;

    constructor( private _http: Http) {
        this.firebaseUrl = 'https://glcsmsdev.firebaseio.com/';
        this.data = null;
        this.firebaseRef = new Firebase(this.firebaseUrl);
        this.isLogged = this.firebaseRef.getAuth();
    }
    signOut(){
        //let firebase know we are signed out
        this.firebaseRef.unauth();

        //global change
        this.isLogged = null;

        console.log(`Signed Out ${this.isLogged}`);
    }
    load() {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            this._http.get('path/to/data.json')
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.data = data;
                    resolve(this.data);
                });
        });
    }
}

