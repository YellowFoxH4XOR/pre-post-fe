import { CheckStatus } from './status.model';

export interface DeviceCheck {
  device_ip: string;
  precheck_id?: string;
  postcheck_id?: string;
  status: CheckStatus;
}

export interface PreCheckRequest {
  devices: {
    device_ip: string;
    username: string;
    password: string;
  }[];
  commands: string[];
}

export interface PreCheckResponse {
  batch_id: string;
  checks: DeviceCheck[];
  timestamp: Date;
  message: string;
}

export interface PostCheckRequest {
  devices: {
    device_ip: string;
    username: string;
    password: string;
  }[];
}

export interface PostCheckResponse {
  batch_id: string;
  checks: DeviceCheck[];
  timestamp: Date;
  message: string;
}

export interface CheckListResponse {
  checks: {
    check_id: string;
    batch_id: string;
    type: string;
    device_ip: string;
    status: CheckStatus;
    timestamp: Date;
  }[];
  total: number;
  page: number;
}

export interface CommandOutput {
  command: string;
  output: string;
  execution_order: number;
}