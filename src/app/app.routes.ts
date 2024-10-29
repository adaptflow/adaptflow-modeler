import { Routes } from '@angular/router';
import { ModelerComponent } from './containers/modeler/modeler.component';
import { provideState } from '@ngrx/store';
import { elementSelectionReducer } from './store/reducers/element-selection.reducer';
import { WorkspaceComponent } from './containers/workspace/workspace.component';
import { ConfigurationsComponent } from './containers/configurations/configurations.component';

export const routes: Routes = [
    {
        path: 'modeler',
        component: ModelerComponent,
        providers: [
            provideState({
                name:'elementSelection', reducer: elementSelectionReducer
            })
        ]
    },
    {
        path: 'workspace',
        component: WorkspaceComponent,
        providers: []
    },
    {
        path: 'configurations',
        component: ConfigurationsComponent,
        providers: []
    }
];
