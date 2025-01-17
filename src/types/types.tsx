export interface Booking {
  id: string;
  full_name: string;
  email: string;
  description: string;
  // preferredDate: string;
  // status: "pending";
  createdAt: string;
}

export interface Flash {
  id: string;
  price: string;
  dimensions: string;
  isActive: boolean;
  mainImageUrl: string;
  extraImageUrls: string[];
  title: string;
  createdAt: string;
}
