
export interface User {
  id: string;
  email: string;
  name: string;
  registrationDate: string;
  activePods: number;
  totalPods: number;
  balance: number;
  status: 'online' | 'offline';
}
