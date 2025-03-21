export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  relatedTo?: {
    type: 'customer' | 'todo' | 'system';
    id?: string;
  };
}