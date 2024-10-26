import { Routes } from '@angular/router';
import { ModelerComponent } from './containers/modeler/modeler.component';
import { provideState } from '@ngrx/store';
import { elementSelectionReducer } from './store/reducers/element-selection.reducer';

export const routes: Routes = [
    {
        path: 'modeler',
        component: ModelerComponent,
        providers: [
            provideState({
                name:'elementSelection', reducer: elementSelectionReducer
            })
        ]
    }
];
