export type ProductType = 'course' | 'addon' | 'service';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  features?: string[];
  active: boolean;
}

export interface CourseAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  selected?: boolean;
}

export interface CourseModule {
  number: string;
  title: string;
  description: string;
  topics: string[];
}

export interface SocialCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  activeColor: string;
  badge?: string;
}

export interface SocialSubCategory {
  id: string;
  categoryId: string;
  name: string;
  icon: string;
}

export interface SocialServicePackage {
  id: string;
  categoryId: string;
  subCategoryId?: string;
  name: string;
  quantity: string;
  price: number;
  originalPrice: number;
  badge?: string; // e.g. STARTER, POPULAR, HOT, BEST DEAL, OFFER
  description: string;
  features: string[];
  buttonColor?: 'pink' | 'blue' | 'purple' | 'red';
}

export interface Testimonial {
  id: string;
  name: string;
  city?: string;
  servicePurchased: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: 'course' | 'followers' | 'general';
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productType: ProductType;
  productName: string;
  packageDetails?: string;
  targetUrl?: string; // For social services
  amount: number;
  addons?: { name: string; price: number }[];
  paymentStatus: 'pending' | 'success' | 'failed';
  orderStatus: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentReference?: string;
  createdAt: string;
  processingStartedAt?: string;
  completedAt?: string;
}

export interface ServiceOrderDetails extends Order {
  evidenceList?: OrderEvidence[];
  timeline?: OrderTimelineEvent[];
  communicationLogs?: CommunicationLog[];
  adminNotes?: AdminNote[];
}

export interface OrderEvidence {
  id: string;
  orderId: string;
  evidenceType: 'screenshot' | 'pdf' | 'reference' | 'metric';
  fileUrl?: string;
  note: string;
  uploadedBy: string;
  createdAt: string;
}

export interface OrderTimelineEvent {
  id: string;
  orderId: string;
  status: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface CommunicationLog {
  id: string;
  orderId: string;
  recipientEmail: string;
  messageType: 'order_confirmation' | 'processing_update' | 'completion_update' | 'custom';
  subject: string;
  deliveryStatus: 'sent' | 'delivered' | 'bounced' | 'failed';
  sentAt: string;
}

export interface AdminNote {
  id: string;
  orderId: string;
  adminName: string;
  note: string;
  createdAt: string;
}

export interface CourseAccessInfo {
  orderId: string;
  customerName: string;
  customerEmail: string;
  webinarDate: string;
  webinarTime: string;
  accessLink: string;
  status: 'active' | 'upcoming' | 'completed';
}
