import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/Rx';
import {GroupService} from "../groups-service/groups-service";
declare var Firebase: any;

/*
 Generated class for the NotesService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class NotesService {
    errorMessage: string;
    data: any;
    ref: any;
    firebaseUrl:string;

    masterStream: any = new Array();
    masterObservable: any;

    notesStream$: Observable<any>;
    notesObserver$: Observer<any>;
    notesData: any;


    constructor(
        private _http: Http,
        private _groupService: GroupService
    ) {
        this.firebaseUrl = 'https://glcsmsdev.firebaseio.com';
        this.data = null;
        this.ref = new Firebase(this.firebaseUrl);
        this.masterObservable = [];


        // Create Observable Stream to output our data
        this.notesStream$ = new Observable(observer =>
            this.notesObserver$ = observer).share();

        this.notesData = [];
    }
    getSingleNote(){

    }
    resetArray(){
        this.notesData = new Array();
    }
    loadSelectedNotes(){

        this.resetArray();
        let groupData = this._groupService.groupsdata;
        let optimizeData = toClientsArray(groupData);
        this.buildObservable(optimizeData)
    }
    selectedObservable(name, subname){

        new Observable(observer => {
            this.ref.child('notifications').child(name).child(subname).child('messages')
                .on("value", function(snapshot) {

                    observer.next(snapshot.val());
                    //console.log(snapshot.val());

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
            })
            .map(item => {
                    let _arr = [];
                    let obj ={};
                    for(var key in item){
                        obj = {
                            id: key,
                            category:subname,
                            client: name,
                            date: item[key].date,
                            message: item[key].message
                        };
                        _arr.push(obj);
                    }
                return _arr;
            }).mergeAll()
            .subscribe(
            data => {

                //push data to cached array
                this.notesData.unshift(data);

                // Push new messages into the shared Observable stream
                this.notesObserver$.next(data);
            },
            error => {

            }
        );
    }
    getGroupNotes(name, subname){
        return new Observable(observer => {
            this.ref.child('notifications').child(name).child(subname).child('messages')
                .on("value", function(snapshot) {

                    //console.log(snapshot.val());
                    observer.next(snapshot.val());


                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                });
        });
    }
    buildObservable(array){

        //reset array before rebuild
        this.masterStream = new Array();

        let clientArrlength = array.length;

        for(var i = 0; i< clientArrlength; i++){
            //build subscriptions array
            let subscriptions = [];
            for(let x =0; x < array[i].subscriptions.length; x++){

                subscriptions.push(array[i].subscriptions[x]);
            }

            //begin building control object
            this.masterObservable[i] = {
                title: array[i].client,
                subscriptions:subscriptions,
                messages:[]
            };

            //get subscription length
            let subscriptionLength = this.masterObservable[i].subscriptions.length;

            //build message object with observables to each message stream to add to masterObject
            for(var k = 0; k < subscriptionLength; k++) {
                let client = this.masterObservable[i].title;
                let item = this.masterObservable[i].subscriptions[k];
                let obj = {item: this.selectedObservable(client, item)};
                //let obj = {item: this.getGroupNotes(client, item)};
                this.masterObservable[i].messages.push(obj);
            }

            //build each stream and push to object to master list
            //for(var j = 0; j < subscriptionLength; j++) {
            //
            //    let subscriberName = this.masterObservable[i].subscriptions[j];
            //    let clientName = this.masterObservable[i].title;
            //
            //    //console.log(this.masterObservable[i]);
            //    this.masterObservable[i].messages[j].item
            //        .subscribe(
            //            //success
            //            item => {
            //                let obj ={};
            //                for(var name in item){
            //                    obj = {
            //                        client: clientName,
            //                        name: subscriberName,
            //                        date: item[name].date,
            //                        message: item[name].message
            //                    };
            //                    this.masterStream.push(obj);
            //                }
            //                console.log(this.masterStream);
            //            },
            //            error => console.log(error)
            //        );
            //}

        }//end for loop
        //console.log(this.masterObservable);

    }

}

function toClientsArray(data){
    let clientArr = [];
    let obj = {};

    for( var subname in data){
        obj = {
            client: subname,
            subscriptions:[]
        };
        //loop through and place names of subscriptions
        //is that enough to continue with the build out of observing function? Test
        for(let i = 0; i < data[subname].length; i++){
            obj['subscriptions'].push(data[subname][i]);
        }
        clientArr.push(obj);
    }
    return clientArr;
}