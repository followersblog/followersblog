-- ==============================================================================
-- FOLLOWERS.BLOG — COMPLETE PRODUCTION DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS (Profiles linked to Supabase Auth or direct checkout customers)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'moderator')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS (Courses, Add-ons, Social Media Packages)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('course', 'addon', 'service')),
  category TEXT,
  sub_category TEXT,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  badge TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('course', 'addon', 'service')),
  product_name TEXT NOT NULL,
  package_details TEXT,
  target_url TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed', 'refunded')),
  order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'processing', 'completed', 'cancelled')),
  payment_gateway TEXT DEFAULT 'cashfree',
  payment_reference TEXT,
  payment_order_id TEXT,
  processing_started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ORDER ITEMS (Add-ons or breakdown)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT,
  item_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. COURSE ACCESS (For Course Purchases & Live Webinar Scheduling)
CREATE TABLE IF NOT EXISTS public.course_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE UNIQUE,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  webinar_date TEXT DEFAULT 'Upcoming Sunday',
  webinar_time TEXT DEFAULT '4:00 PM - 7:00 PM IST',
  access_link TEXT DEFAULT 'https://meet.google.com/followers-blog-live-class',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'upcoming', 'completed', 'revoked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SERVICE ORDERS (Dedicated Internal Management for Social Growth Services)
CREATE TABLE IF NOT EXISTS public.service_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  target TEXT NOT NULL,
  quantity TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled', 'refunded')),
  processing_started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ORDER EVIDENCE / DELIVERY PROOFS (Private Admin Delivery Audit & Dispute Proofs)
CREATE TABLE IF NOT EXISTS public.order_evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('screenshot', 'pdf', 'reference', 'metric')),
  file_reference TEXT,
  note TEXT NOT NULL,
  uploaded_by TEXT DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. COMMUNICATION LOGS (Transactional Notifications Audit)
CREATE TABLE IF NOT EXISTS public.communication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('order_confirmation', 'processing_update', 'completion_update', 'custom')),
  subject TEXT NOT NULL,
  delivery_status TEXT DEFAULT 'sent' CHECK (delivery_status IN ('sent', 'delivered', 'bounced', 'failed')),
  provider_message_id TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  delivered_at TIMESTAMPTZ
);

-- 10. ADMIN NOTES (Private Internal Logs — Never Exposed to Customers)
CREATE TABLE IF NOT EXISTS public.admin_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  admin_name TEXT DEFAULT 'Admin',
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR FAST QUERYING
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_product_type ON public.orders(product_type);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_orders_status ON public.service_orders(status);
CREATE INDEX IF NOT EXISTS idx_order_evidence_order_id ON public.order_evidence(order_id);
CREATE INDEX IF NOT EXISTS idx_communication_logs_order_id ON public.communication_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_order_id ON public.admin_notes(order_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;

-- Public can read active products
CREATE POLICY "Public can view active products" ON public.products
  FOR SELECT USING (active = true);

-- Customers can view their own orders via email or auth uid
CREATE POLICY "Users can view their own orders" ON public.orders
  FOR SELECT USING (
    auth.uid() = user_id OR
    customer_email = current_setting('request.jwt.claims', true)::json->>'email'
  );

-- Service role / Admin bypass for full CRUD
CREATE POLICY "Service role full access on profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Service role full access on products" ON public.products FOR ALL USING (true);
CREATE POLICY "Service role full access on orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Service role full access on order_items" ON public.order_items FOR ALL USING (true);
CREATE POLICY "Service role full access on course_access" ON public.course_access FOR ALL USING (true);
CREATE POLICY "Service role full access on service_orders" ON public.service_orders FOR ALL USING (true);
CREATE POLICY "Service role full access on order_evidence" ON public.order_evidence FOR ALL USING (true);
CREATE POLICY "Service role full access on communication_logs" ON public.communication_logs FOR ALL USING (true);
CREATE POLICY "Service role full access on admin_notes" ON public.admin_notes FOR ALL USING (true);
