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

/* global getAssetRegistry getFactory emit */

const namespace = "org.project.basic";

/**
 * Sample transaction processor function.
 * @param {org.project.basic.CreateTestData} param The sample transaction instance.
 * @transaction
 */
async function CreateTestDataTransaction(param) { 
    console.log('init test data');

    console.log('Creating a Worker 1');  
    const factory = getFactory(); 
	
  	// adding worker 1
    const workerReg = await getParticipantRegistry(namespace + '.Worker');   
    const worker = await factory.newResource(namespace, 'Worker', "1");
  	worker.firstName = "Chuck";
  	worker.lastName = "Norris";
  	worker.organisationName = "Damage Inc";
  
    await workerReg.add(worker);       

    // adding worker 2
    const worker2 = await factory.newResource(namespace, 'Worker', "2");
  	worker2.firstName = "John";
  	worker2.lastName = "Rambo";
  	worker2.organisationName = "Damage Inc";
  
    await workerReg.add(worker2);       

    // adding auditor 1
    const auditorReg = await getParticipantRegistry(namespace + '.Auditor');   
    const auditor = await factory.newResource(namespace, 'Auditor', "1");
  	auditor.firstName = "Chuck";
  	auditor.lastName = "Norris";
  	auditor.organisationName = "Damage Inc";
  
    await auditorReg.add(auditor);       

    // adding auditor 2
    const auditor2 = await factory.newResource(namespace, 'Auditor', "2");
  	auditor2.firstName = "John";
  	auditor2.lastName = "Rambo";
  	auditor2.organisationName = "Damage Inc";
  
    await auditorReg.add(auditor2);       

    console.log('finishing test data creation');  
}

/**
 * Sample transaction processor function.
 * @param {org.project.basic.ClearTestData} param The sample transaction instance.
 * @transaction
 */
async function ClearTestDataTransaction(param) {  
  
    console.log('clearing test data');

    // deleting assets
    const projectReg = await getAssetRegistry(namespace + '.Project'); 
    let projects = await projectReg.getAll();
    await projectReg.removeAll(projects);

    const stepReg = await getAssetRegistry(namespace + '.Step'); 
    let steps = await stepReg.getAll();
    await stepReg.removeAll(steps);
  
  	// deleting participants
    const workerReg = await getParticipantRegistry(namespace + '.Worker');
    let workers = await workerReg.getAll();
    await workerReg.removeAll(workers);
    
    const auditorReg = await getParticipantRegistry(namespace + '.Auditor');
    let auditors = await auditorReg.getAll();
    await auditorReg.removeAll(auditors);
  
    console.log('clearing test data finished');
}

/**
 * Sample transaction processor function.
 * @param {org.project.basic.CreateProject} param The sample transaction instance.
 * @transaction
 */
async function CreateProjectTransaction(param) {  
  
  const factory = getFactory(); 

  const projectName = param.projectName;
  const startDateString = param.startDateString;
  const dueDateString = param.dueDateString;

  const projectReg = await getAssetRegistry(namespace + '.Project');   

  // getting next id
  let existingProjects = await projectReg.getAll();
  let numberOfProjects = 0;
  
  await existingProjects.forEach(function (room) {
    numberOfProjects ++;
  });
  numberOfProjects ++; 	
  
  const project = await factory.newResource(namespace, 'Project', numberOfProjects.toString());
  project.projectName = projectName;
  project.startDate = new Date(startDateString);
  project.dueDate = new Date(dueDateString);
  project.steps = new Array();
  project.status = "NOTSTARTED";
  
  await projectReg.add(project);      
  
  // emitting ProjectCreated event

  let projectCreatedEvent = factory.newEvent(namespace, 'ProjectCreated');
  projectCreatedEvent.project = project;
  await emit(projectCreatedEvent);  	  
  
}

/**
 * Sample transaction processor function.
 * @param {org.project.basic.AddStepToProject} param The sample transaction instance.
 * @transaction
 */
async function AddStepToProjectTransaction(param) {  
  
  const factory = getFactory(); 

  const project = param.project;
  const stepName = param.stepName;
  const startDateString = param.startDateString;
  const dueDateString = param.dueDateString;

  const stepReg = await getAssetRegistry(namespace + '.Step');   

  // getting next id
  let existingSteps = await stepReg.getAll();
  let numberOfSteps = 0;
  
  await existingSteps.forEach(function (step) {
    numberOfSteps ++;
  });
  numberOfSteps ++; 	  
  
  const step = await factory.newResource(namespace, 'Step', numberOfSteps.toString());
  step.stepName = stepName;
  step.startDate = new Date(startDateString);
  step.dueDate = new Date(dueDateString);
  step.status = "NOTSTARTED";
  step.readyness = 0;
  step.workers = new Array();
  step.auditors = new Array();
    
  await stepReg.add(step);      

  const projReg = await getAssetRegistry(namespace + '.Project');   
  project.steps.push(step);
  
  projReg.update(project);
  
  // emitting ProjectCreated event
  
  let stepCreatedEvent = factory.newEvent(namespace, 'StepCreated');
  stepCreatedEvent.project = project;
  stepCreatedEvent.step = step;
  await emit(stepCreatedEvent);  	  
  
}

/**
 * Sample transaction processor function.
 * @param {org.project.basic.AddWorkerToStep} param The sample transaction instance.
 * @transaction
 */
async function AddWorkerToStepTransaction(param) {  
}

/**
 * Sample transaction processor function.
 * @param {org.project.basic.AddAuditorToStep} param The sample transaction instance.
 * @transaction
 */
async function AddAuditorToStepTransaction(param) { 
}


