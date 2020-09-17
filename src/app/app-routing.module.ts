import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GoalComponent} from './components/goal/goal.component';


const routes: Routes = [
  {path: '**', component: GoalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
