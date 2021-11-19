import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadDocumentsComponent } from './components/load-documents/load-documents.component';

const routes: Routes = [
  {path: 'docs/:type', component:LoadDocumentsComponent},
  {path : '', component: LoadDocumentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
