import {Page, NavController, Modal} from 'ionic-angular';
import {SearchPage} from "../search/search";
import {NoteDetailPage} from "../note-detail/note-detail";
import {GroupDetailPage} from "../groups/group-detail/group-detail";
import {GroupService} from "../../providers/groups-service/groups-service";
import {NotesService} from "../../providers/notes-services/notes-service";
import {ArrayObservable} from "../../../node_modules/rxjs/observable/fromArray";
declare var Firebase: any;
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
/*
 Generated class for the HomePage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

    search: any;
    homeTab: string;
    //create interface for notes
    notes: any;
    noteDetailPage: any;
    groupDetailPage: any;
    selectedGroups:any;

    groupData$: string[];
    notesData$: any;

    ref: any;
    firebaseUrl:string;
    
    date: Date;
    today: number;

    results$: any;
    notes$: any;
    notes2$: Observable<any>;
    notes3$: Observable<any>;

    masterStream: any;
    userPipe:Observable<any>;
    notesMerged: any;
    mergedArray: any;

    constructor(
        private _nav: NavController,
        private _groupsService: GroupService,
        private _notesService: NotesService
    ) {
        this.firebaseUrl = 'https://glcsmsdev.firebaseio.com';
        this.ref = new Firebase(this.firebaseUrl);

        this.search = SearchPage;

        this.homeTab = 'notes';

        this.noteDetailPage = NoteDetailPage;

        this.groupDetailPage = GroupDetailPage;
        
        //this.date = new Date();
        //this.today = this.date.getTime();

        //console.log(this.date.toLocaleTimeString());
        this.notesData$ = [];
        //console.log(this.date.getTime());
        //console.log(this.date.toTimeString());


    }
    ngOnInit(){
        this.results$ = this._groupsService.getUserGroups(1112223333)
            .subscribe(
                //success
                data => {
                    console.log(data);
                    let _arry = toClientsArray(data);
                    this.groupData$ = toArray(data);
                    //console.log(_arry);

                    this._notesService.buildObservable(_arry);

                    this.masterStream = this._notesService.masterStream;
                },
                error => console.log(error)
            );
        this.userPipe = this._groupsService.getUserPipes(1112223333)
        .map(item => {
            let arr = [];
            for(name in item){
                arr.push(item[name]);
            }
            return arr;
        });


        //this.notes$ = this._notesService.getGroupNotes('Alpha, LLC', 'Construction');
            //.subscribe(
            //        //success
            //        data => {
            //            //console.log(data);
            //            this.notesData$ = toNotesArray(data, 'Bikini Car Wash');
            //            //this.notesData$ = toArray(data);
            //        },
            //        error => console.log(error)
            //    );

        //merged stream example and async pipe example
        this.notes$ = this._notesService.getGroupNotes('Alpha, LLC', 'Construction');
        this.notes2$ = this._notesService.getGroupNotes('Bikini Car Wash', 'Car wash');
        this.notes3$ = this._notesService.getGroupNotes('Puppies, LLC', 'Puppy Training');
        let source = this.notes$.merge(this.notes2$, this.notes3$);
        this.mergedArray = [];
        let arr = [];
        this.notesMerged = source
        .map(item => {

            let obj ={};
            for(var name in item){
                obj = {date: item[name].date, message: item[name].message}
                arr.push(obj);
            }
            //arr.push(obj);
            return arr;
        });

    }
    //Need get notes and Groups crud services
    navSearch(): void{
        this._nav.setRoot(this.search);
    }
    navNote(note): void{
        this._nav.push(this.noteDetailPage);
    }
    navGroup(group): void{
        this._nav.push(this.groupDetailPage);
    }

}
function toArray(data){
    let _arr = [];
    for( var subname in data){
        _arr.push(subname);
    }
    return _arr;
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
function toNotesArray(data, name){
    let _arr = [];
    let obj = {};

    for( var key in data){
        console.log();
        obj = {
            name: name,
            date: data[key].date,
            message: data[key].message
        };
        _arr.push(obj);
    }
    return _arr;
}
