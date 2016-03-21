import {Page, NavController} from 'ionic-angular';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {GroupDetailPage} from "../groups/group-detail/group-detail";
import {GroupService} from "../../providers/groups-service/groups-service";

/*
 Generated class for the GroupsPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/groups/groups.html',
})
export class GroupsPage {

    results$: Observable<any>;
    groupDetailPage: any;

    constructor(
        private _nav: NavController,
        private _groupService: GroupService
    ) {
        this.groupDetailPage = GroupDetailPage;
    }
    ngOnInit(){
        this.results$ = this._groupService.getAllGroupItems();

    }
}
