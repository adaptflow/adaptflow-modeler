import { createReducer, on } from '@ngrx/store';
import { elementDeselected, elementDropped, elementImport, elementRemoved, elementSelected, updateElementAttributes, updateGeneralProperties } from '../actions/element-selection.action';
import omit from 'lodash/omit'; 

export interface ElementSelectionState {
    elementId: string|null;
    elements: { [key: string]: any };
    generalProperties:  { [key: string]: any };
    updateByForm: string|null;
}
export const initialState: ElementSelectionState = {
    elementId: null,
    elements: {},
    generalProperties: {},
    updateByForm: null
};

export const elementSelectionReducer = createReducer(
    initialState,
    on(elementDropped, (state, newState) => ({
        ...state,
        selectedElementId: newState.elementId,
        elements: {
        ...state.elements,
        [newState.elementId]: newState.attributes
        }
    })),
    on(elementImport, (state, element) => ({
        ...state,
        elements: {
            ...state.elements,
            [element.elementId]: element.attributes
        }
    })),
    on(elementSelected, (state, { elementId }) => ({
        ...state,
        selectedElementId: elementId,
    })),
    on(updateElementAttributes, (state, { elementId, updatedAttributes }) => ({
        ...state,
        elements: {
          ...state.elements,
          [elementId]: updatedAttributes
        }
    })),
    on(elementDeselected, (state) => ({
        ...state,
        selectedElementId: undefined
    })),
    on(elementRemoved, (state, { elementId }) => ({
        ...state,
        elements: omit(state.elements, [elementId]) // Omit the specified key
    })),
    on(updateGeneralProperties, (state, { generalProperties, updateByForm }) => ({
        ...state,
        generalProperties: generalProperties,
        updateByForm: updateByForm
    }))
);