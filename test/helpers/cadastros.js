import { api } from './api.js';
import { tokenAdmin } from './auth.js';

export async function cadastrarAluno(dadosAluno) {
  return api()
    .post('/api/admin/alunos')
    .set('Content-Type', 'application/json')
    .set('Authorization', await tokenAdmin())
    .send(dadosAluno);
}

export async function cadastrarDisciplina(dadosDisciplina) {
  return api()
    .post('/api/admin/disciplinas')
    .set('Content-Type', 'application/json')
    .set('Authorization', await tokenAdmin())
    .send(dadosDisciplina);
}

export async function cadastrarAlunoDisciplina({idDisciplina, idAluno}){
    return api()
    .post(`/api/admin/disciplinas/${idDisciplina}/matriculas`)
    .set('Content-Type', 'application/json')
    .set('Authorization', await tokenAdmin())
    .send({ alunoId: idAluno })
}

export async function cadastrarTrabalho(idAluno, tokenAluno, dadosTrabalho) {
  return api()
    .post(`/api/alunos/${idAluno}/trabalhos`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${tokenAluno}`)
    .send(dadosTrabalho);
}