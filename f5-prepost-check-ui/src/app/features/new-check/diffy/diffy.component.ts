import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { CommandDiff } from '../../../core/models/diff.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-diffy',
  templateUrl: './diffy.component.html',
  styleUrls: ['./diffy.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ]
})
export class DiffyComponent implements OnInit {
  diffForm!: FormGroup;
  loading = false;
  diffResults: CommandDiff[] = [];
  errorMessage = '';
  showResults = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.diffForm = this.fb.group({
      deviceIp: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.diffForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.showResults = false;

    // In a real implementation, this would call the API service to fetch the diff
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      // Simulate API response
      this.diffResults = [
        {
          command: 'show version',
          precheck_output: 'Version: 15.1.0\nBuild: 0.0.23\nEdition: Point Release 1',
          postcheck_output: 'Version: 15.1.0\nBuild: 0.0.24\nEdition: Point Release 2',
          diff_output: '- Version: 15.1.0\n- Build: 0.0.23\n- Edition: Point Release 1\n+ Version: 15.1.0\n+ Build: 0.0.24\n+ Edition: Point Release 2',
          changes_detected: true
        },
        {
          command: 'show running-config',
          precheck_output: 'interface GigabitEthernet1/0/1\n description WAN\n ip address 192.168.1.1 255.255.255.0',
          postcheck_output: 'interface GigabitEthernet1/0/1\n description WAN-UPDATED\n ip address 192.168.1.1 255.255.255.0',
          diff_output: ' interface GigabitEthernet1/0/1\n- description WAN\n+ description WAN-UPDATED\n ip address 192.168.1.1 255.255.255.0',
          changes_detected: true
        }
      ];
      
      this.loading = false;
      this.showResults = true;
    }, 1500);
  }

  resetForm(): void {
    this.diffForm.reset();
    this.showResults = false;
    this.diffResults = [];
    this.errorMessage = '';
  }

  // Helper method to determine CSS class for diff lines
  getDiffLineClass(line: string): string {
    if (line.startsWith('+')) {
      return 'added';
    } else if (line.startsWith('-')) {
      return 'removed';
    }
    return '';
  }
}