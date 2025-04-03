import { CheckStatus } from './status.model';

export interface Device {
  device_ip: string;
  username: string;
  password: string;
  hostname?: string;
  last_check_status?: CheckStatus;
  last_checked?: Date;
}