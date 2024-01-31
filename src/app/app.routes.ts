import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Organizer',
        loadComponent: () => import('./components/landing/landing.component').then(c => c.LandingComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./components/home/components/main/main.component').then(c => c.MainComponent)
            },
            {
                path: 'profile',
                loadChildren: () => import('./components/home/components/profile/profile.component').then(c => c.ProfileComponent)
            }
        ]
    },
    {
        path: '**',
        title: '404',
        loadComponent: () => import('./components/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
];
