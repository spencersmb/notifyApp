import {Directive, Renderer, EventEmitter, Output, Input} from "angular2/core";
import {ElementRef} from "angular2/core";
import {GroupService} from "../../../../providers/groups-service/groups-service";
import {NavParams} from 'ionic-angular';

@Directive({
    selector: '[isChecked]'
})

export class isCheckedDirective{

    @Input('isChecked') subitem;
    @Output() toggle = new EventEmitter<any>();

    selectedGroups: any;
    group:any;

    constructor(
        private _renderer: Renderer,
        private _elRef: ElementRef,
        private _groupService: GroupService,
        private _params: NavParams
    ){
        this.group = this._params.data;
        this.selectedGroups = this._groupService.filterSelectedGroups(this._groupService.groupsdata);
    }
    ngOnInit(){
        this.isToggled();
    }
    matchToggleLabel(item){
        //filter the selected items against the labels of the toggle buttons
        //if its true - it will add it and emit to the toggle button to change or not
        let selectedGroupslength = this.selectedGroups.length;
        let selectedItem = [];

        for(var i = 0; i < selectedGroupslength; i++){
            if( this.selectedGroups[i].client === this.group.name){
                selectedItem = this.selectedGroups[i].subclients.filter(subitem => subitem === item );
            }
        }

        return selectedItem;
    }
    isToggled(){
        //pass in toggle label from @input
        let needle = this.matchToggleLabel(this.subitem);

        if(needle.length){
            //if it is a match emit it to ion-toggle
            this.toggle.emit(true);
        }else{
            this.toggle.emit(false);
        }
    }
}