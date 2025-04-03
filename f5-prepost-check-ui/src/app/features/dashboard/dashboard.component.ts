import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiService } from '../../core/services/api.service';
import { CheckListResponse } from '../../core/models/check.model';
import { CheckStatus } from '../../core/models/status.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recentChecks: CheckListResponse | null = null;
  activeBatches: any[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Status counts for summary
  statusCounts = {
    completed: 0,
    inProgress: 0,
    failed: 0
  };
  
  // Columns to display in the mat-table
  displayedColumns: string[] = ['batch_id', 'type', 'device_ip', 'status', 'timestamp', 'actions'];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRecentChecks();
    this.loadActiveBatches();
  }

  loadRecentChecks(): void {
    this.isLoading = true;
    this.apiService.getChecks(undefined, undefined, 'last_7_days', undefined, 1)
      .subscribe({
        next: (data) => {
          this.recentChecks = data;
          this.calculateStatusCounts(data);
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load recent checks';
          this.isLoading = false;
          console.error('Error loading recent checks:', err);
        }
      });
  }

  loadActiveBatches(): void {
    this.apiService.getActiveBatches()
      .subscribe({
        next: (data: any) => {  // Add type annotation here
          this.activeBatches = data.batches || [];
          this.isLoading = false;
        },
        error: (err: any) => {  // Add type annotation here
          console.error('Error loading active batches:', err);
          this.activeBatches = [];
          this.isLoading = false;
        }
      });
  }

  calculateStatusCounts(data: CheckListResponse): void {
    this.statusCounts = {
      completed: 0,
      inProgress: 0,
      failed: 0
    };

    data.checks.forEach(check => {
      if (check.status === CheckStatus.COMPLETED) {
        this.statusCounts.completed++;
      } else if (check.status === CheckStatus.IN_PROGRESS || check.status === CheckStatus.INITIATED) {
        this.statusCounts.inProgress++;
      } else if (check.status === CheckStatus.FAILED) {
        this.statusCounts.failed++;
      }
    });
  }

  navigateToNewCheck(): void {
    this.router.navigate(['/new-check']);
  }

  navigateToBatchDetails(batchId: string): void {
    this.router.navigate(['/batch', batchId]);
  }

  navigateToHistory(): void {
    this.router.navigate(['/history']);
  }

  refreshData(): void {
    this.loadRecentChecks();
    this.loadActiveBatches();
  }
}
