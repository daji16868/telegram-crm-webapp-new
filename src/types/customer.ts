export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes?: string;
  createdAt: string;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  notes?: string;
}