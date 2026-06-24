// api/index.js
export default async function handler(req, res) {
  // Import dinâmico do servidor
  const { default: server } = await import('../dist/server/server.js');
  
  // Converte a requisição do Vercel para o formato que o TanStack Start espera
  const result = await server.handle({
    request: req,
    url: req.url,
    headers: req.headers
  });
  
  // Envia a resposta
  res.status(result.status || 200);
  
  if (result.headers) {
    Object.entries(result.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
  }
  
  if (result.body) {
    res.send(result.body);
  } else {
    res.end();
  }
}
