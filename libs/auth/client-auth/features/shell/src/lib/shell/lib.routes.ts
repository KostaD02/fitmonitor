import { Routes } from '@angular/router';
import { AuthGuards } from '@monotor/data-access';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    canActivate: [AuthGuards.canActivateUnauthenticated],
    loadComponent: () =>
      import('@monotor/auth/client-auth/features/auth').then(
        (m) => m.AuthComponent,
      ),
  },
];
