import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Organizer',
        loadComponent: () => import('./components/landing/landing.component').then(c => c.LandingComponent)
    },
    {
        path: ':username',
        loadComponent: () => import('./components/layout/layout.component').then(c => c.LayoutComponent),
        children: [
            {
                path: '',
                title: 'Organizer',
                loadComponent: () => import('./components/layout/components/main/main.component').then(c => c.MainComponent)
            },
            {
                path: 'profile',
                title: 'Profile',
                loadComponent: () => import('./components/layout/components/profile/profile.component').then(c => c.ProfileComponent)
            }
        ]
    },
    {
        path: '**',
        title: '404',
        loadComponent: () => import('./components/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
];
