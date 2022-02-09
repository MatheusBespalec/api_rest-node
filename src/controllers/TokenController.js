import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({ errors: ['Credenciais inválidas!'] });
    }

    const user = await User.findOne({ where: { email } });

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ errors: ['Credenciais inválidas!'] });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    return res.json({ token, user: { id, name: user.name, email } });
  }
}

export default new TokenController();
