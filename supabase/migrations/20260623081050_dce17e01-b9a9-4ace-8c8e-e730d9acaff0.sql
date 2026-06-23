
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nome text NOT NULL,
  email text NOT NULL,
  telefone text NOT NULL,
  assunto text NOT NULL,
  mensagem text NOT NULL,
  status text NOT NULL DEFAULT 'novo'
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.credit_simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  tipo_credito text NOT NULL,
  montante numeric NOT NULL,
  num_periodos integer NOT NULL,
  taxa_juros numeric NOT NULL,
  taxa_preparo numeric NOT NULL,
  juros_total numeric NOT NULL,
  prestacao_por_periodo numeric NOT NULL,
  total_a_pagar numeric NOT NULL,
  nome_cliente text,
  telefone_cliente text,
  email_cliente text,
  status text NOT NULL DEFAULT 'simulacao'
);
GRANT INSERT ON public.credit_simulations TO anon, authenticated;
GRANT ALL ON public.credit_simulations TO service_role;
ALTER TABLE public.credit_simulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can save simulation" ON public.credit_simulations FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.credit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nome_completo text NOT NULL,
  email text NOT NULL,
  telefone text NOT NULL,
  tipo_credito text NOT NULL,
  montante_solicitado numeric NOT NULL,
  finalidade text,
  mensagem text,
  simulation_id uuid REFERENCES public.credit_simulations(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'pendente'
);
GRANT INSERT ON public.credit_requests TO anon, authenticated;
GRANT ALL ON public.credit_requests TO service_role;
ALTER TABLE public.credit_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit credit request" ON public.credit_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
