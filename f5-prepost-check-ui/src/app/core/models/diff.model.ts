export interface DiffResult {
  id: string;
  precheck_id: string;
  postcheck_id: string;
  command: string;
  diff_output: string;
  changes_detected: boolean;
}

export interface CommandDiff {
  command: string;
  precheck_output: string;
  postcheck_output: string;
  diff_output: string;
  changes_detected: boolean;
}