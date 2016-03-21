import {Page, NavController, Modal, Platform} from 'ionic-angular';
import {SearchPage} from "../search/search";
import {NoteDetailPage} from "../note-detail/note-detail";
import {GroupDetailPage} from "../groups/group-detail/group-detail";
import {GroupService} from "../../providers/groups-service/groups-service";
import {NotesService} from "../../providers/notes-services/notes-service";
import {LoginService} from "../../providers/login-service/login-service";
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

export class HomePage{
    onPageWillEnter() {
        // THERE IT IS!!!
    }
    search: any;
    homeTab: string;
    //create interface for notes
    notes: any;
    noteDetailPage: any;
    groupDetailPage: any;

    groupData$: string[];
    notesData$: any;

    ref: any;
    firebaseUrl:string;

    date:number;
    today: number;

    notes$: any;
    notes2$: Observable<any>;
    notes3$: Observable<any>;

    masterStream: any;
    userPipe:Observable<any>;
    notesMerged: any;
    mergedArray: any;

    //User
    currentUser:any = '';

    constructor(
        private platform: Platform,
        private _nav: NavController,
        private _groupsService: GroupService,
        private _notesService: NotesService,
        private _authService: LoginService
    ) {
        this.firebaseUrl = 'https://glcsmsdev.firebaseio.com';
        this.ref = new Firebase(this.firebaseUrl);

        this.search = SearchPage;

        this.homeTab = 'notes';

        this.noteDetailPage = NoteDetailPage;

        this.groupDetailPage = GroupDetailPage;



        //this.date = 1458450331864;
        //console.log(this.today);
        //this.today = this.date.getTime();
        //console.log(this.today);

        //console.log(this.date.toLocaleTimeString());
        //console.log(this.date.getTime());
        //console.log(this.date.toTimeString());



        //set data to cached version - this is first empty but cached async
        this.currentUser = this._authService.userData;
        this.groupData$ = this._groupsService.filterSelectedGroups(this._groupsService.groupsdata);
        this.notesData$ = this._notesService.notesData;


    }
    ngOnInit(){
        /*
         Unsubscribe:

         When adding unsubscribe feature we will need to be able to reset this main stream of notes - and also limit to 10

         */
        this.platform.ready().then(() => {

            //subscribe to userObject in Login Service
            this._authService.currentUser.subscribe(
                updatedUser => this.currentUser = updatedUser
            );

            //subscribe to notes stream
            this._notesService.notesStream$.subscribe(
                newNote => {

                    this.notesData$.unshift(newNote);

                },
                error => {
                    console.log(error);
                }

            );

            //subscribe to selected groups in groups service
            //we initialize this stream in apps.ts or after user login
            this._groupsService.selectedGroups$.subscribe(
                updatedGroups => {

                    this.resetNotes();

                    //on response initialize notes stream
                    this._notesService.loadSelectedNotes();

                    return this.groupData$ = this._groupsService.filterSelectedGroups(updatedGroups);
                }
            );




        });

        //subscribe user to their groups and messages feedd
        //this.results$ = this._groupsService.getUserGroups(1112223333)
        //    .subscribe(
        //        //success
        //        data => {
        //            let _arry = toClientsArray(data);
        //            this.groupData$ = toArray(data);
        //            //console.log(_arry);
        //        },
        //        error => console.log(error)
        //    );

        //async pipe example
        //this.userPipe = this._groupsService.getUserPipes(1112223333)
        //.map(item => {
        //    let arr = [];
        //    for(name in item){
        //        arr.push(item[name]);
        //    }
        //    return arr;
        //});


        //merged stream example and async pipe example
        //this.notes$ = this._notesService.getGroupNotes('Alpha, LLC', 'Construction');
        //this.notes2$ = this._notesService.getGroupNotes('Bikini Car Wash', 'Car wash');
        //this.notes3$ = this._notesService.getGroupNotes('Puppies, LLC', 'Puppy Training');
        //let source = this.notes$.merge(this.notes2$, this.notes3$);
        //this.mergedArray = [];
        //let arr = [];
        //this.notesMerged = source
        //.map(item => {
        //
        //    let obj ={};
        //    for(var name in item){
        //        obj = {date: item[name].date, message: item[name].message}
        //        arr.push(obj);
        //    }
        //    //arr.push(obj);
        //    return arr;
        //});

    }
    resetNotes(): void{
        this.notesData$ = [];
    }
    navSearch(): void{
        this._nav.setRoot(this.search);
    }
    navNote(note): void{
        this._nav.push(this.noteDetailPage , {
            client: note.client,
            category: note.category,
            date: note.date,
            message: note.message
        });
    }
    navGroup(group): void{
        console.log(group);
        this._nav.push(this.groupDetailPage ,{
            name: group.client,
            subclients: group.subclients
        });
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
