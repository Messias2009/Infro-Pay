-- Migration: Admin RLS Policies and Admin Role Provisioning
-- Target Admin User ID: rsKuyZLn7gbRulIKz5WpxpgqJDo2

-- 1. Ensure helper function recognizes admin by UUID or role
CREATE OR REPLACE FUNCTION public.is_admin_user(_user_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT (
    _user_id = 'rsKuyZLn7gbRulIKz5WpxpgqJDo2'::UUID OR
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = 'admin')
  );
$$;

-- 2. Update PROFILES RLS Policies
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile or admin" ON public.profiles;

CREATE POLICY "Users can view own profile or admin" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    auth.uid() = id OR
    public.is_admin_user(auth.uid()) OR
    public.has_role(auth.uid(), 'admin')
  );

-- 3. Update PRODUCTS RLS Policies
DROP POLICY IF EXISTS "Published products are public" ON public.products;
DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
DROP POLICY IF EXISTS "Products view policy" ON public.products;

CREATE POLICY "Products view policy" ON public.products
  FOR SELECT TO authenticated, anon
  USING (
    status = 'publicado' OR
    (auth.uid() IS NOT NULL AND (
      auth.uid() = producer_id OR
      public.is_admin_user(auth.uid()) OR
      public.has_role(auth.uid(), 'admin')
    ))
  );

-- 4. Update SALES RLS Policies
DROP POLICY IF EXISTS "Producers can view own sales" ON public.sales;
DROP POLICY IF EXISTS "Buyers can view own purchases" ON public.sales;
DROP POLICY IF EXISTS "Sales view policy" ON public.sales;

CREATE POLICY "Sales view policy" ON public.sales
  FOR SELECT TO authenticated
  USING (
    auth.uid() = producer_id OR
    auth.uid() = buyer_id OR
    (affiliate_id IS NOT NULL AND auth.uid() = affiliate_id) OR
    public.is_admin_user(auth.uid()) OR
    public.has_role(auth.uid(), 'admin')
  );

-- 5. Update WALLETS RLS Policies
DROP POLICY IF EXISTS "Users can view own wallet" ON public.wallets;
CREATE POLICY "Users can view own wallet" ON public.wallets
  FOR SELECT TO authenticated
  USING (
    auth.uid() = producer_id OR
    public.is_admin_user(auth.uid()) OR
    public.has_role(auth.uid(), 'admin')
  );

-- 6. Update WITHDRAWALS RLS Policies
DROP POLICY IF EXISTS "Users can view own withdrawals" ON public.withdrawals;
CREATE POLICY "Users can view own withdrawals" ON public.withdrawals
  FOR SELECT TO authenticated
  USING (
    auth.uid() = producer_id OR
    public.is_admin_user(auth.uid()) OR
    public.has_role(auth.uid(), 'admin')
  );
