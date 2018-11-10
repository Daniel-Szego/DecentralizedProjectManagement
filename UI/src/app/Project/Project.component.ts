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
import { ProjectService } from './Project.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-project',
  templateUrl: './Project.component.html',
  styleUrls: ['./Project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  projectId = new FormControl('', Validators.required);
  projectName = new FormControl('', Validators.required);
  startDate = new FormControl('', Validators.required);
  dueDate = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  steps = new FormControl('', Validators.required);

  constructor(public serviceProject: ProjectService, fb: FormBuilder) {
    this.myForm = fb.group({
      projectId: this.projectId,
      projectName: this.projectName,
      startDate: this.startDate,
      dueDate: this.dueDate,
      status: this.status,
      steps: this.steps
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProject.getAll()
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
      $class: 'org.project.basic.Project',
      'projectId': this.projectId.value,
      'projectName': this.projectName.value,
      'startDate': this.startDate.value,
      'dueDate': this.dueDate.value,
      'status': this.status.value,
      'steps': this.steps.value
    };

    this.myForm.setValue({
      'projectId': null,
      'projectName': null,
      'startDate': null,
      'dueDate': null,
      'status': null,
      'steps': null
    });

    return this.serviceProject.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'projectId': null,
        'projectName': null,
        'startDate': null,
        'dueDate': null,
        'status': null,
        'steps': null
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
      $class: 'org.project.basic.Project',
      'projectName': this.projectName.value,
      'startDate': this.startDate.value,
      'dueDate': this.dueDate.value,
      'status': this.status.value,
      'steps': this.steps.value
    };

    return this.serviceProject.updateAsset(form.get('projectId').value, this.asset)
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

    return this.serviceProject.deleteAsset(this.currentId)
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

    return this.serviceProject.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'projectId': null,
        'projectName': null,
        'startDate': null,
        'dueDate': null,
        'status': null,
        'steps': null
      };

      if (result.projectId) {
        formObject.projectId = result.projectId;
      } else {
        formObject.projectId = null;
      }

      if (result.projectName) {
        formObject.projectName = result.projectName;
      } else {
        formObject.projectName = null;
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

      if (result.steps) {
        formObject.steps = result.steps;
      } else {
        formObject.steps = null;
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
      'projectId': null,
      'projectName': null,
      'startDate': null,
      'dueDate': null,
      'status': null,
      'steps': null
      });
  }

}
