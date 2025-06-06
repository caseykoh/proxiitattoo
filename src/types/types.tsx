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
  size: string;
  image: FlashImage;
  title: string;
  createdAt: string;
}

export interface FlashImage {
  alt: string;
  url: string;
}
