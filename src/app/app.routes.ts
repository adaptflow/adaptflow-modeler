import { Routes } from '@angular/router';
import { ModelerComponent } from './containers/modeler/modeler.component';
import { provideState } from '@ngrx/store';
import { elementSelectionReducer } from './store/reducers/element-selection.reducer';
import { WorkspaceComponent } from './containers/workspace/workspace.component';
import { ConfigurationsComponent } from './containers/configurations/configurations.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        providers: []
    },
    {
        path: 'modeler',
        component: ModelerComponent,
        canActivate: [authGuard],
        providers: [
            provideState({
                name:'elementSelection', reducer: elementSelectionReducer
            })
        ]
    },
    {
        path: 'workspace',
        component: WorkspaceComponent,
        canActivate: [authGuard],
        providers: []
    },
    {
        path: 'configurations',
        component: ConfigurationsComponent,
        canActivate: [authGuard],
        providers: []
    },
    {
     path: '',
     redirectTo: '/modeler',
     pathMatch: 'full'
   }
];
