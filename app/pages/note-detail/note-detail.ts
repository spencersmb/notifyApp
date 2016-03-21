import {Page, NavController, NavParams} from 'ionic-angular';
import {NotesService} from "../../providers/notes-services/notes-service";

/*
 Generated class for the NoteDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/note-detail/note-detail.html',
})
export class NoteDetailPage {
    note: any;
    constructor(
        private _nav: NavController,
        private _params: NavParams,
        private _noteService: NotesService
    ) {
        this.note = this._params.data;
    }
    ngOnInit(){

    }
}
