import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Observer} from "rxjs/Observer";
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

    //Observable groups variables
    selectedGroups$:Observable<any>;
    selectedObserver$:Observer<any>;
    groupsdata:any;
    allGroupsData:any;

    constructor( private _http: Http) {
        this.firebaseUrl = 'https://glcsmsdev.firebaseio.com';
        this.data = null;
        this.ref = new Firebase(this.firebaseUrl);

        //Observable groups setup
        //initialize stream1
        this.selectedGroups$ = new Observable(observer =>
            this.selectedObserver$ = observer).share();

        this.groupsdata = [];
    }
    getAllGroupItems():Observable<any>{
        return this._http.get(this.ref + 'notifications.json')
            .map(response => response.json()).map(item => {
                let arr = [];
                let obj = {};
                for(var name in item){
                    obj = {
                        client: name,
                        subclients: []
                    };
                    for( var subitem in item[name]){
                        item[name][subitem]['title'] = subitem;
                        obj['subclients'].push(item[name][subitem]);
                    }
                    arr.push(obj);
                }

                //set cached data
                this.allGroupsData = arr;
                //return full array
                return arr;
            });
    }
    loadSelectedGroups(id){

        new Observable(observer => {
            this.ref.child('members').child(id).child('subscribed').on("value", function(snapshot) {

                observer.next(snapshot.val());

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        })
        .subscribe(
            data => {
                //set cached data
                this.groupsdata = data;
                // Push new group data into the shared Observable stream
                this.selectedObserver$.next(data);
            }
        );
    }
    //old way
    getUserGroups(id){
        console.log('fire getUserGroups');

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
            this.ref.child('notifications')
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
    filterSelectedGroups(data){
        let arr = [];
        let obj = {};

        for(var name in data){
            obj = {
                client: name,
                subclients: []
            };
            let arrLength = data[name].length;

            for( var i = 0; i < arrLength; i++){
                obj['subclients'].push(data[name][i]);
            }
            arr.push(obj);
        }
        return arr;
    }
}

