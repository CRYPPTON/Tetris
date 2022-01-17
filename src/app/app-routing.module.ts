import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteName } from '@app-enums';

const routes: Routes = [
  {
    path: RouteName.game,
    loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule),
  },
  {
    path: '', redirectTo: RouteName.game, pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
