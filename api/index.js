export default function handler(req, res) {
  res.status(200).json({ 
    message: 'API funcionando!',
    url: req.url,
    method: req.method
  });
}
