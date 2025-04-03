import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { ApiService } from '../../../core/services/api.service';
import { Device } from '../../../core/models/device.model';
import { PreCheckRequest } from '../../../core/models/check.model';

@Component({
  selector: 'app-pre-check-form',
  templateUrl: './pre-check-form.component.html',
  styleUrls: ['./pre-check-form.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, MatFormFieldModule, MatSelectModule, NgFor, NgIf]
})
export class PreCheckFormComponent implements OnInit {
  preCheckForm!: FormGroup;
  isLoading = false;
  devices: Device[] = [
    // Sample devices for demonstration - in a real app, these would come from an API
    { device_ip: '10.0.0.1', username: '', password: '' },
    { device_ip: '10.0.0.2', username: '', password: '' },
    { device_ip: '10.0.0.3', username: '', password: '' }
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.preCheckForm = this.fb.group({
      selectedDevices: [[], Validators.required],
      commands: this.fb.array([this.createCommandControl()], Validators.required)
    });
  }

  createCommandControl() {
    return this.fb.control('', Validators.required);
  }

  get commandsArray() {
    return this.preCheckForm.get('commands') as FormArray;
  }

  addCommand(): void {
    this.commandsArray.push(this.createCommandControl());
  }

  removeCommand(index: number): void {
    if (this.commandsArray.length > 1) {
      this.commandsArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.preCheckForm.invalid) {
      return;
    }

    this.isLoading = true;
    const formValue = this.preCheckForm.value;
    
    // Prepare the request payload
    const request: PreCheckRequest = {
      devices: formValue.selectedDevices.map((device: Device) => ({
        device_ip: device.device_ip,
        username: device.username,
        password: device.password
      })),
      commands: formValue.commands
    };

    this.apiService.createPreCheck(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.snackBar.open('Pre-check initiated successfully!', 'Close', {
          duration: 3000
        });
        // Navigate to batch details page
        this.router.navigate(['/batch', response.batch_id]);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to initiate pre-check. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Pre-check error:', error);
      }
    });
  }
}