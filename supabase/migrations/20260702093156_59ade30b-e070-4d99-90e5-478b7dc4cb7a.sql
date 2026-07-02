
-- contact_messages
DROP POLICY IF EXISTS "Anyone can submit contact" ON public.contact_messages;
CREATE POLICY "Anyone can submit contact"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'novo'
    AND length(btrim(nome)) BETWEEN 2 AND 120
    AND length(btrim(email)) BETWEEN 5 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(telefone)) BETWEEN 6 AND 40
    AND length(btrim(assunto)) BETWEEN 2 AND 200
    AND length(btrim(mensagem)) BETWEEN 2 AND 5000
  );

-- credit_simulations
DROP POLICY IF EXISTS "Anyone can save simulation" ON public.credit_simulations;
CREATE POLICY "Anyone can save simulation"
  ON public.credit_simulations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'simulacao'
    AND tipo_credito IN ('mensal','quinzenal')
    AND montante > 0 AND montante <= 10000000
    AND num_periodos > 0 AND num_periodos <= 120
    AND taxa_juros >= 0 AND taxa_juros <= 5
    AND taxa_preparo >= 0
    AND juros_total >= 0
    AND prestacao_por_periodo >= 0
    AND total_a_pagar >= 0
    AND (email_cliente IS NULL OR email_cliente ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
    AND (nome_cliente IS NULL OR length(btrim(nome_cliente)) <= 120)
    AND (telefone_cliente IS NULL OR length(btrim(telefone_cliente)) <= 40)
  );

-- credit_requests
DROP POLICY IF EXISTS "Anyone can submit credit request" ON public.credit_requests;
CREATE POLICY "Anyone can submit credit request"
  ON public.credit_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'pendente'
    AND length(btrim(nome_completo)) BETWEEN 2 AND 120
    AND length(btrim(email)) BETWEEN 5 AND 200
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(telefone)) BETWEEN 6 AND 40
    AND tipo_credito IN ('mensal','quinzenal')
    AND montante_solicitado > 0 AND montante_solicitado <= 10000000
    AND (finalidade IS NULL OR length(finalidade) <= 500)
    AND (mensagem IS NULL OR length(mensagem) <= 5000)
  );
