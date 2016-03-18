import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
declare var Firebase: any;

/*
 Generated class for the GroupService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GroupService {
    errorMessage: string;
    data: any;
    ref: any;
    firebaseUrl:string;

    constructor( private _http: Http) {
        this.firebaseUrl = 'https://glcsmsdev.firebaseio.com';
        this.data = null;
        this.ref = new Firebase(this.firebaseUrl);
    }
    getAllGroups(){

    }
    getUserGroups(id){

        return new Observable(observer => {
            this.ref.child('members').child(id).child('subscribed')
                .on("value", function(snapshot) {

                    //console.log(snapshot.val());
                    observer.next(snapshot.val());


                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
        });
    }
    //pipe example
    getUserPipes(id){

        return new Observable(observer => {
            this.ref.child('members').child(id).child('subscribed')
                .on("value", function(snapshot) {

                    observer.next(snapshot.val());

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
        });
    }
    getSubscriptions(groupName){
        return new Observable(observer => {
            this.ref.child('notifications').child(groupName)
                .on("value", function(snapshot) {

                    //console.log(snapshot.val());
                    observer.next(snapshot.val());

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
        });
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

