import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';

import { ApiService } from '../../core/services/api.service';
import { PostCheckRequest } from '../../core/models/check.model';

@Component({
  selector: 'app-post-check-form',
  templateUrl: './post-check-form.component.html',
  styleUrls: ['./post-check-form.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, MatFormFieldModule, MatSelectModule, NgFor, NgIf]
})
export class PostCheckFormComponent implements OnInit {
  postCheckForm!: FormGroup;
  isLoading = false;
  batchIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBatchIds();
  }

  initForm(): void {
    this.postCheckForm = this.fb.group({
      selectedBatchId: ['', Validators.required]
    });
  }

  loadBatchIds(): void {
    this.isLoading = true;
    this.apiService.getActiveBatches().subscribe({
      next: (response) => {
        this.batchIds = response.batch_ids || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to load batch IDs. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Error loading batch IDs:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.postCheckForm.invalid) {
      return;
    }

    this.isLoading = true;
    const batchId = this.postCheckForm.value.selectedBatchId;
    
    // Prepare the request payload
    const request: PostCheckRequest = {
      devices: [] // This will be populated by the backend based on the batch ID
    };

    // In a real implementation, you might need to add the batch ID to the request or URL
    this.apiService.createPostCheck(request, batchId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.snackBar.open('Post-check initiated successfully!', 'Close', {
          duration: 3000
        });
        // Navigate to batch details page
        this.router.navigate(['/batch', response.batch_id]);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to initiate post-check. Please try again.', 'Close', {
          duration: 3000
        });
        console.error('Post-check error:', error);
      }
    });
  }
}