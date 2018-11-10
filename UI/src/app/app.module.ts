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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
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

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    StepComponent,
    WorkerComponent,
    AuditorComponent,
    CreateTestDataComponent,
    ClearTestDataComponent,
    CreateProjectComponent,
    AddStepToProjectComponent,
    AddWorkerToStepComponent,
    AddAuditorToStepComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
