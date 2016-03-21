import {Page, NavController, NavParams} from 'ionic-angular';
import {GroupService} from "../../../providers/groups-service/groups-service";
import {isCheckedDirective} from "../group-detail/toggleItem.directive/toggleItem.directive"
import {Input} from "angular2/core";

/*
 Generated class for the GroupDetailPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Page({
    templateUrl: 'build/pages/groups/group-detail/group-detail.html',
    directives:[isCheckedDirective]
})

export class GroupDetailPage {
    @Input('listItem') item;
    toggleData: any;
    group: any;
    constructor(
        private _nav: NavController,
        private _params: NavParams
    ) {
        this.group = this._params.data;
        this.toggleData = {}
    }
    ngOnInit(){
        this.createToggleObject();
    }
    toggle(event, i){
        //the directive on the toggle item emits a true value if the user is subscribed
        //this changes the 2-way binding on the toggle button via the object
        this.toggleData[i].isEnabled = event;
    }
    createToggleObject(){
        //Create a blank object that is bound to the toggle button
        //loop through all the subclients within a group
        //set items to false on first load
        for(var key in this.group.subclients){

            this.toggleData[key] = {
                isEnabled: false
            };

        }
    }

}
