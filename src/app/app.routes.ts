import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { AtsScoreComponent } from './pages/ats-score/ats-score.component';
import { JDScoreComponent } from './pages/jd-score/jd-score.component';
import { FormatScoreComponent } from './pages/format-score/format-score.component';
import { OverallScoreComponent } from './pages/overall-score/overall-score.component';
import { AtsDashboardContentComponent } from './pages/ats-score/dashboard/ats-dashboard-content/ats-dashboard-content.component';
import { JdScoreDashboardContentComponent } from './pages/jd-score/dashboard/jd-score-dashboard-content/jd-score-dashboard-content.component';
import { FormatScoreDashboardComponent } from './pages/format-score/dashboard/dashboard.component';
import { FormatRouteGaurd } from './guards/format-router.guards';
import { OverallRouterGuard } from './guards/overall-router.guards';
import { JDRouterGuard } from './guards/jd-router.guards';
import { ATSRouterGuard } from './guards/ats-router.guards';

export const ROUTE_PATHS = {
  ATS: 'ats',
  JD: 'jd',
  FORMAT: 'format',
  OVERALL: 'overall'
};

export const routes: Routes = [
  { 
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home',
    
  },
  { 
    path: ROUTE_PATHS.ATS,
    loadComponent: () => import('./pages/ats-score/ats-score.component').then(m => m.AtsScoreComponent),
    title: 'ATS Score',
    canActivate:[ATSRouterGuard]

  },
  { 
    path: ROUTE_PATHS.JD,
    loadComponent: () => import('./pages/jd-score/jd-score.component').then(m => m.JDScoreComponent),
    title: 'JD Score',
    canActivate:[JDRouterGuard]

  },
  { 
    path: ROUTE_PATHS.FORMAT,
    loadComponent: () => import('./pages/format-score/format-score.component').then(m => m.FormatScoreComponent),
    title: 'Format Score',
    canActivate:[FormatRouteGaurd]
  },
  { 
    path: ROUTE_PATHS.OVERALL,
    loadComponent: () => import('./pages/overall-score/overall-score.component').then(m => m.OverallScoreComponent),
    title: 'Overall Score',
    canActivate:[OverallRouterGuard]


  },
  { 
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{enableViewTransitions: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }