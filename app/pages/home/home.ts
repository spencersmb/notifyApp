import {Page, NavController, Modal} from 'ionic-angular';
import {SearchPage} from "../search/search";
import {NoteDetailPage} from "../note-detail/note-detail";
import {GroupDetailPage} from "../groups/group-detail/group-detail";

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

    constructor(
        private _nav: NavController
    ) {
        this.search = SearchPage;

        this.homeTab = 'notes';

        this.noteDetailPage = NoteDetailPage;

        this.groupDetailPage = GroupDetailPage;
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
