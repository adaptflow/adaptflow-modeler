import { createAction, props } from '@ngrx/store';


export const elementDropped = createAction(
    '[Canvas] Element Dropped',
    props<{elementId: string; attributes: any}>()
);

export const elementImport = createAction(
    '[Canvas] Element Imported',
    props<{elementId: string; attributes: any}>()
);

export const elementSelected = createAction(
    '[Canvas] Element Selected',
    props<{elementId: string}>()
);

export const updateElementAttributes = createAction(
    '[Element Properties] Update Element Properties',
    props<{ elementId: string; updatedAttributes: any }>()
);
export const elementDeselected = createAction(
    '[Canvas] Element Deselected'
);
export const elementRemoved = createAction(
    '[Canvas] Element Deselected',
    props<{elementId: string}>()
);
export const updateGeneralProperties = createAction(
    '[Element Properties] Update General Properties',
    props<{ generalProperties: any, updateByForm: string }>()
);