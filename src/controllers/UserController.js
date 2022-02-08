import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      res.json({ users });
    } catch (e) {
      res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, { attributes: ['id', 'name', 'email'] });

      if (!user) {
        res.status(404).json({
          errors: ['Usuário não existe!'],
        });
        return;
      }

      res.json({ user });
    } catch (e) {
      res.status(400).json({
        errors: ['Erro ao buscar usuário!'],
      });
    }
  }

  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json({ newUser });
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe!'],
        });
      }

      const { id, name, email } = await user.update(req.body);
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe!'],
        });
      }
      req.userId = null;
      req.userEmail = null;
      await user.destroy();
      return res.json({ success: 'Usuário removido com sucesso' });
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao remover usuario'] });
    }
  }
}

export default new UserController();
