import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.project.basic{
   export enum Status {
      NOTSTARTED,
      STARTED,
      FINISHED,
   }
   export class Project extends Asset {
      projectId: string;
      projectName: string;
      startDate: Date;
      dueDate: Date;
      status: Status;
      steps: Step[];
   }
   export class Step extends Asset {
      stepId: string;
      stepName: string;
      startDate: Date;
      dueDate: Date;
      status: Status;
      readyness: number;
      previousStep: Step;
      workers: Worker[];
      auditors: Auditor[];
   }
   export abstract class ProjectPartcipants extends Participant {
      participantId: string;
      firstName: string;
      lastName: string;
      organisationName: string;
   }
   export class Worker extends ProjectPartcipants {
   }
   export class Auditor extends ProjectPartcipants {
   }
   export class CreateTestData extends Transaction {
   }
   export class ClearTestData extends Transaction {
   }
   export class CreateProject extends Transaction {
      projectName: string;
      startDateString: string;
      dueDateString: string;
   }
   export class AddStepToProject extends Transaction {
      project: Project;
      stepName: string;
      startDateString: string;
      dueDateString: string;
   }
   export class AddWorkerToStep extends Transaction {
      worker: Worker;
      step: Step;
   }
   export class AddAuditorToStep extends Transaction {
      auditor: Auditor;
      step: Step;
   }
   export class ProjectCreated extends Event {
      project: Project;
   }
   export class StepCreated extends Event {
      project: Project;
      step: Step;
   }
   export class WorkerAdded extends Event {
      worker: Worker;
      step: Step;
   }
   export class AuditorAdded extends Event {
      auditor: Auditor;
      step: Step;
   }
// }
