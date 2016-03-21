import {Page, NavController} from 'ionic-angular';
import {GroupDetailPage} from "../groups/group-detail/group-detail";
import {GroupService} from "../../providers/groups-service/groups-service";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
/*
 Generated class for the SearchPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

interface ISearch{
    id: number;
    tag: string;
    title: string;
}
@Page({
    templateUrl: 'build/pages/search/search.html',
})

export class SearchPage {

    results$: Observable<any>;
    groupDetailPage: any;

    constructor(
        private _nav: NavController,
        private _groupService: GroupService
    ) {
        this.groupDetailPage = GroupDetailPage;
        this.results$ = this._groupService.allGroupsData;
    }
    ngOnInit(){
        this.results$ = this._groupService.getAllGroupItems();

    }
    navGroupDetail(result): void{
        console.log(result);
        this._nav.push(this.groupDetailPage, {
            name: result.client,
            subclients: result.subclients
        });
    }
}
