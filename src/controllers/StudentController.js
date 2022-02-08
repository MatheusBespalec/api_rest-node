import Student from '../models/Student';
import StudentPhoto from '../models/StudentPhoto';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'name', 'email', 'height'],
        order: [['id', 'DESC'], [StudentPhoto, 'id', 'DESC']],
        include: {
          model: StudentPhoto,
          attributes: ['filename'],
        },
      });
      return res.json({ students });
    } catch (e) {
      return res.status(400).json({ errors: ['Erro ao buscar alunos'] });
    }
  }

  async show(req, res) {
    try {
      const student = await Student.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'height'],
        include: {
          model: StudentPhoto,
          attributes: ['filename'],
        },
      });

      if (!student) {
        res.status(400).json({ errors: ['Este aluno não existe'] });
        return;
      }

      res.json({ student });
    } catch (e) {
      res.status(400).json({ errors: ['Erro ao buscar aluno'] });
    }
  }

  async store(req, res) {
    try {
      const newStudent = await Student.create(req.body);
      res.json({ newStudent });
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        res.status(400).json({ errors: ['Este aluno não existe'] });
        return;
      }

      const {
        id, name, email, age, height,
      } = await student.update(req.body);
      res.json({
        id, name, email, age, height,
      });
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        res.status(400).json({ errors: ['Este aluno não existe'] });
        return;
      }
      await student.destroy();
      res.json({ message: ['O aluno foi removido com sucesso'] });
    } catch (e) {
      res.status(400).json({ errors: ['Erro ao remover aluno'] });
    }
  }
}

export default new StudentController();
