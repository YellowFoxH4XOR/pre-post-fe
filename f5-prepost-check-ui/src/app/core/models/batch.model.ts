import { CheckStatus, BatchStatus } from './status.model';
import { DeviceCheck } from './check.model';

export interface Batch {
  batch_id: string;
  created_at: Date;
  status: BatchStatus;
  total_devices: number;
  completed_devices: number;
  created_by: string;
  checks?: DeviceCheck[];
  timestamp?: Date;
  message?: string;
}

export interface BatchStatusResponse {
  batch_id: string;
  total_devices: number;
  completed_devices: number;
  status: BatchStatus;
  devices: {
    device_ip: string;
    precheck_id: string;
    postcheck_id: string;
    status: CheckStatus;
    progress: number;
  }[];
}

export interface BatchDiffResponse {
  batch_id: string;
  devices: {
    device_ip: string;
    precheck_id: string;
    postcheck_id: string;
    status: string;
    summary: {
      total_commands: number;
      commands_with_changes: number;
      timestamp: Date;
    }
  }[];
  overall_status: string;
}