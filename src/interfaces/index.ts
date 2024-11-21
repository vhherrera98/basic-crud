export interface ITask {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
  created_on: Date;
}

export interface IResponse {
  status: 'OK' | 'ERROR';
  message: string;
}