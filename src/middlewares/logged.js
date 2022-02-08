import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Login necessário!'] });
  }

  const token = authorization.split(' ')[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = data;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({ errors: ['Token expirado ou inválido!'] });
  }
};
