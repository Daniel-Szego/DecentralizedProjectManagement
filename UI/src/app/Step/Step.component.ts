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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StepService } from './Step.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-step',
  templateUrl: './Step.component.html',
  styleUrls: ['./Step.component.css'],
  providers: [StepService]
})
export class StepComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  stepId = new FormControl('', Validators.required);
  stepName = new FormControl('', Validators.required);
  startDate = new FormControl('', Validators.required);
  dueDate = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  readyness = new FormControl('', Validators.required);
  previousStep = new FormControl('', Validators.required);
  workers = new FormControl('', Validators.required);
  auditors = new FormControl('', Validators.required);

  constructor(public serviceStep: StepService, fb: FormBuilder) {
    this.myForm = fb.group({
      stepId: this.stepId,
      stepName: this.stepName,
      startDate: this.startDate,
      dueDate: this.dueDate,
      status: this.status,
      readyness: this.readyness,
      previousStep: this.previousStep,
      workers: this.workers,
      auditors: this.auditors
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceStep.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.project.basic.Step',
      'stepId': this.stepId.value,
      'stepName': this.stepName.value,
      'startDate': this.startDate.value,
      'dueDate': this.dueDate.value,
      'status': this.status.value,
      'readyness': this.readyness.value,
      'previousStep': this.previousStep.value,
      'workers': this.workers.value,
      'auditors': this.auditors.value
    };

    this.myForm.setValue({
      'stepId': null,
      'stepName': null,
      'startDate': null,
      'dueDate': null,
      'status': null,
      'readyness': null,
      'previousStep': null,
      'workers': null,
      'auditors': null
    });

    return this.serviceStep.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'stepId': null,
        'stepName': null,
        'startDate': null,
        'dueDate': null,
        'status': null,
        'readyness': null,
        'previousStep': null,
        'workers': null,
        'auditors': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.project.basic.Step',
      'stepName': this.stepName.value,
      'startDate': this.startDate.value,
      'dueDate': this.dueDate.value,
      'status': this.status.value,
      'readyness': this.readyness.value,
      'previousStep': this.previousStep.value,
      'workers': this.workers.value,
      'auditors': this.auditors.value
    };

    return this.serviceStep.updateAsset(form.get('stepId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceStep.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceStep.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'stepId': null,
        'stepName': null,
        'startDate': null,
        'dueDate': null,
        'status': null,
        'readyness': null,
        'previousStep': null,
        'workers': null,
        'auditors': null
      };

      if (result.stepId) {
        formObject.stepId = result.stepId;
      } else {
        formObject.stepId = null;
      }

      if (result.stepName) {
        formObject.stepName = result.stepName;
      } else {
        formObject.stepName = null;
      }

      if (result.startDate) {
        formObject.startDate = result.startDate;
      } else {
        formObject.startDate = null;
      }

      if (result.dueDate) {
        formObject.dueDate = result.dueDate;
      } else {
        formObject.dueDate = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.readyness) {
        formObject.readyness = result.readyness;
      } else {
        formObject.readyness = null;
      }

      if (result.previousStep) {
        formObject.previousStep = result.previousStep;
      } else {
        formObject.previousStep = null;
      }

      if (result.workers) {
        formObject.workers = result.workers;
      } else {
        formObject.workers = null;
      }

      if (result.auditors) {
        formObject.auditors = result.auditors;
      } else {
        formObject.auditors = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'stepId': null,
      'stepName': null,
      'startDate': null,
      'dueDate': null,
      'status': null,
      'readyness': null,
      'previousStep': null,
      'workers': null,
      'auditors': null
      });
  }

}
