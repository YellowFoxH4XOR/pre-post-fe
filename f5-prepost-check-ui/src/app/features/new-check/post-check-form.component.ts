import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-post-check-form',
  templateUrl: './post-check-form.component.html',
  styleUrls: ['./post-check-form.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class PostCheckFormComponent implements OnInit {
  batchIds: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  someMethod(ids: any[]): void {
    this.apiService.getBatchIds().subscribe({
      next: (ids: any[]) => {
        this.batchIds = ids;
      },
      error: (error: any) => {
        console.error('Error fetching batch IDs:', error);
      }
    });
  }

  anotherMethod(response: any): void {
    this.apiService.getBatchIds().subscribe({
      next: (ids: any[]) => {
        this.batchIds = ids;
      },
      error: (error: any) => {
        console.error('Error fetching batch IDs:', error);
      }
    });
  }

  handleError(error: any): void {
    this.apiService.getBatchIds().subscribe({
      next: (ids: any[]) => {
        this.batchIds = ids;
      },
      error: (error: any) => {
        console.error('Error fetching batch IDs:', error);
      }
    });
  }
}