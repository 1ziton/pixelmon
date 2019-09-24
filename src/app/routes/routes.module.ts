import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Route, ExtraOptions } from '@angular/router';
import { environment } from '../../environments/environment';
import { LayoutComponent } from '../layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './404/404.component';
import { HomeComponent } from './home/home.component';

const COMPONENTS = [HomeComponent, NotFoundComponent];

const routes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'zh', pathMatch: 'full' },
      { path: 'zh', component: HomeComponent, data: { titleI18n: 'slogan' } },
      { path: 'en', component: HomeComponent, data: { titleI18n: 'slogan' } },
      // #region region routers
      { path: 'docs', loadChildren: () => import('./gen/docs/docs.module').then(m => m.DocsModule) },
      {
        path: 'components',
        loadChildren: () => import('./gen/components/components.module').then(m => m.ComponentsModule),
      },
      { path: 'theme', loadChildren: () => import('./gen/theme/theme.module').then(m => m.ThemeModule) },
      { path: 'cache', loadChildren: () => import('./gen/cache/cache.module').then(m => m.CacheModule) },
      { path: 'acl', loadChildren: () => import('./gen/acl/acl.module').then(m => m.AclModule) },
      { path: 'mock', loadChildren: () => import('./gen/mock/mock.module').then(m => m.MockModule) },
      { path: 'util', loadChildren: () => import('./gen/util/util.module').then(m => m.UtilModule) },
      { path: 'chart', loadChildren: () => import('./gen/chart/chart.module').then(m => m.ChartModule) },
      { path: 'ggeditor', loadChildren: () => import('./gen/ggeditor/ggeditor.module').then(m => m.GgeditorModule) },
      {
        path: 'materials',
        loadChildren: () => import('./materials/materials.module').then(m => m.MaterialsModule),
      },
      // #endregion
    ],
  },
  {
    path: 'dev',
    loadChildren: () => import('./dev/dev.module').then(m => m.DevTestModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

// Using HTML anchor link #id in Angular, 不起作用这里
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  // ...any other options you'd like to use
};

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(
      routes,
      environment.production
        ? { preloadingStrategy: PreloadAllModules, useHash: true, ...routerOptions }
        : { useHash: true, ...routerOptions },
    ),
  ],
  declarations: [...COMPONENTS],
})
export class RoutesModule {}
