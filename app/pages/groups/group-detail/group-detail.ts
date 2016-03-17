import {Page, NavController, NavParams} from 'ionic-angular';

/*
 Generated class for the GroupDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/group-detail/group-detail.html',
})
export class GroupDetailPage {

    id: number;

    constructor(
        private _nav: NavController,
        private _params: NavParams
    ) {
        this.id = _params.data.id;
    }
}
