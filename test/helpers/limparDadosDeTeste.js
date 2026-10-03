import Aluno from '../../src/models/aluno.model.js';
import Disciplina from '../../src/models/disciplina.model.js';
import Matricula from '../../src/models/matricula.model.js';
import Trabalho from '../../src/models/trabalho.model.js';

export async function limparDadosDoFixture(testeFixture) {
  const emails = testeFixture.map(
    teste => teste.dadosAluno.email
  );

  const codigos = testeFixture.map(
    teste => teste.dadosDisciplina.codigo
  );

  const alunos = await Aluno.find({
    email: { $in: emails }
  }).select('id');

  const disciplinas = await Disciplina.find({
    codigo: { $in: codigos }
  }).select('id');

  const alunoIds = alunos.map(aluno => aluno.id);
  const disciplinaIds = disciplinas.map(disciplina => disciplina.id);

  await Trabalho.deleteMany({
    $or: [
      { alunoId: { $in: alunoIds } },
      { disciplinaId: { $in: disciplinaIds } }
    ]
  });

  await Matricula.deleteMany({
    $or: [
      { alunoId: { $in: alunoIds } },
      { disciplinaId: { $in: disciplinaIds } }
    ]
  });

  await Aluno.deleteMany({
    email: { $in: emails }
  });

  await Disciplina.deleteMany({
    codigo: { $in: codigos }
  });
}