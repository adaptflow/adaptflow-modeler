import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { elementDeselected, elementDropped, elementRemoved, elementSelected, updateElementAttributes } from "../actions/element-selection.action";
import { ElementInstanceService } from "../../services/elements/element-instance.service";

@Injectable({
    providedIn: 'root'
})
export class ElementSelectionFacadeService {
    selectedElement$:  Observable<any>;

    constructor(
        private store: Store<any>,
        private elementInstanceService: ElementInstanceService
    ) {
        this.selectedElement$ = this.store.select('elementSelection');
    }

    onDropped(elementId, elementType) {
        this.store.dispatch(elementDropped({
            elementId: elementId,
            attributes: this.elementInstanceService.getInstance(elementType)
        }));
    }

    onSelected(elementId) {
        this.store.dispatch(elementSelected({elementId: elementId}));
    }

    onUpdate(elementId, updatedAttributes) {
        this.store.dispatch(updateElementAttributes({
            elementId: elementId,
            updatedAttributes: updatedAttributes
        }));
    }

    onDeselection() {
        this.store.dispatch(elementDeselected());
    }

    onRemove(elementId) {
        this.store.dispatch(elementRemoved({elementId: elementId}));
    }
}