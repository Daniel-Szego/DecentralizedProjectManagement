/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ProjectComponent } from './Project/Project.component';
import { StepComponent } from './Step/Step.component';

import { WorkerComponent } from './Worker/Worker.component';
import { AuditorComponent } from './Auditor/Auditor.component';

import { CreateTestDataComponent } from './CreateTestData/CreateTestData.component';
import { ClearTestDataComponent } from './ClearTestData/ClearTestData.component';
import { CreateProjectComponent } from './CreateProject/CreateProject.component';
import { AddStepToProjectComponent } from './AddStepToProject/AddStepToProject.component';
import { AddWorkerToStepComponent } from './AddWorkerToStep/AddWorkerToStep.component';
import { AddAuditorToStepComponent } from './AddAuditorToStep/AddAuditorToStep.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Project', component: ProjectComponent },
  { path: 'Step', component: StepComponent },
  { path: 'Worker', component: WorkerComponent },
  { path: 'Auditor', component: AuditorComponent },
  { path: 'CreateTestData', component: CreateTestDataComponent },
  { path: 'ClearTestData', component: ClearTestDataComponent },
  { path: 'CreateProject', component: CreateProjectComponent },
  { path: 'AddStepToProject', component: AddStepToProjectComponent },
  { path: 'AddWorkerToStep', component: AddWorkerToStepComponent },
  { path: 'AddAuditorToStep', component: AddAuditorToStepComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
