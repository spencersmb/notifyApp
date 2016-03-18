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
export class NotesService {
    errorMessage: string;
    data: any;
    ref: any;
    firebaseUrl:string;

    constructor( private _http: Http) {
        this.firebaseUrl = 'https://glcsmsdev.firebaseio.com';
        this.data = null;
        this.ref = new Firebase(this.firebaseUrl);
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

}

