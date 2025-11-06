export interface Customer {
  customerId: number;
  customerName: string;
  contactPerson: string;
  phoneNo: string;
  email: string;
  website?: string;
  address: string;
  gstNumber?: string;
  createdAt: string;
  isActive: boolean;
}
