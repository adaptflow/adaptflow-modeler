import { createReducer, on } from '@ngrx/store';
import { elementDeselected, elementDropped, elementRemoved, elementSelected, updateElementAttributes } from '../actions/element-selection.action';
import omit from 'lodash/omit'; 

export interface ElementSelectionState {
    elementId: string|null;
    elements: { [key: string]: any };
}
export const initialState: ElementSelectionState = {
    elementId: null,
    elements: {}
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
    }))
);