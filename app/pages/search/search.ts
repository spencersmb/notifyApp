import {Page, NavController} from 'ionic-angular';
import {GroupDetailPage} from "../groups/group-detail/group-detail";

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

    results: ISearch[];
    groupDetailPage: any;

    constructor(
        private _nav: NavController
    ) {
        this.results = [
            {
                id: 23,
                tag: 'Services',
                title: 'Rural Metro Ambulance'
            }
        ];
        this.groupDetailPage = GroupDetailPage;
    }
    navGroupDetail(result): void{
        this._nav.push(this.groupDetailPage, {
            id: result.id
        });
    }
}
