export interface Manufacturer {
  manufacturerId: number;
  manufacturerName: string;
  description?: string;
  categoryName?: string;
  productName?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
}
