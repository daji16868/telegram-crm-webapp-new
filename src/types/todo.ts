export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  createdAt: string;
}

export interface TodoFormData {
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}