import multer from 'multer';
import Student from '../models/Student';
import StudentPhoto from '../models/StudentPhoto';
import multerConfig from '../config/multer';

class PhotoController {
  async store(req, res) {
    const upload = multer(multerConfig).single('photo');
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ errors: err.code });
      }

      try {
        const { student_id } = req.body;
        const { filename } = req.file;

        const student = await Student.findByPk(student_id);

        if (!student) {
          return res.status(400).json({ errors: ['Este aluno não está cadastrado!'] });
        }
        await StudentPhoto.create({ filename, student_id });

        return res.json({ success: 'A foto do aluno foi atualizada!' });
      } catch (e) {
        return res.status(400).json({ errors: ['Erro ao cadastrar a foto do aluno!'] });
      }
    });
  }
}

export default new PhotoController();
