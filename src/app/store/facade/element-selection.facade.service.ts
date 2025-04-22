import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { filter, map, Observable, tap } from "rxjs";
import { elementDeselected, elementDropped, elementImport, elementRemoved, elementSelected, initialStateAction, updateElementAttributes, updateGeneralProperties } from "../actions/element-selection.action";
import { ElementInstanceService } from "../../services/elements/element-instance.service";

@Injectable({
    providedIn: 'root'
})
export class ElementSelectionFacadeService {
    selectedElement$:  Observable<any>;
    generalProperties$: Observable<any>;

    constructor(
        private store: Store<any>,
        private elementInstanceService: ElementInstanceService
    ) {
        this.selectedElement$ = this.store.select('elementSelection').pipe(filter(state => !!state));
        this.generalProperties$ = this.store.select('elementSelection').pipe(
            filter(state => !!state && !!state.generalProperties && state.updateByForm==null),
            map(state=> state.generalProperties));
    }

    onInitialState() {
        this.store.dispatch(initialStateAction());
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

    onElementImport(elementId, attributes) {
        this.store.dispatch(elementImport({
            elementId: elementId,
            attributes: attributes
        }));
    }

    onGeneralPropertiesUpdate(generalProperties, formName) {
        this.store.dispatch(updateGeneralProperties({
            generalProperties: generalProperties,
            updateByForm: formName
        }));
    }
}