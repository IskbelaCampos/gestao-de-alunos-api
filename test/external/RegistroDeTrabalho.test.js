import { expect } from 'chai';
import {getToken} from '../helpers/auth.js';
import testeCadastroTrabalhos from '../fixtures/registrarTrabalho.json' with {type:'json'};
import testeErrosCadastroTrabalhos from '../fixtures/errorsRegistrarTrabalho.json' with {type:'json'};
import { limparDadosDoFixture } from '../helpers/limparDadosDeTeste.js';
import { cadastrarAluno, cadastrarDisciplina, cadastrarAlunoDisciplina, cadastrarTrabalho } from '../helpers/cadastros.js';

describe ('Aluno, Autoatendimento', () => {
    beforeEach(async () => {
        await limparDadosDoFixture(testeCadastroTrabalhos);
    });

        testeCadastroTrabalhos.forEach(testeCadastroTrabalho => {
             it(testeCadastroTrabalho.testTitle, async () => {

            const aluno = await cadastrarAluno(testeCadastroTrabalho.dadosAluno);
            const idAluno = aluno.body.id;

            const disciplina = await cadastrarDisciplina(testeCadastroTrabalho.dadosDisciplina);
            const idDisciplina = disciplina.body.id;

            const alunoDisciplina = await cadastrarAlunoDisciplina({
                idDisciplina,
                idAluno
            });

            const loginResposta = await getToken(
                              testeCadastroTrabalho.dadosAluno.email,
                              testeCadastroTrabalho.dadosAluno.senha
            );

            const trabalho = await cadastrarTrabalho(aluno.body.id, loginResposta.body.token,{
                disciplinaId: idDisciplina,
                ...testeCadastroTrabalho.dadosTrabalho});

            expect(trabalho.status).to.equals(testeCadastroTrabalho.statusCodeEsperado)
            expect(trabalho.body.alunoId).to.equals(idAluno)
            expect(trabalho.body.disciplinaId).to.equals(idDisciplina)


            });
        });

        testeErrosCadastroTrabalhos.forEach(testeErrosCadastroTrabalho => {
             it(testeErrosCadastroTrabalho.testTitle, async () => {

            const aluno = await cadastrarAluno(testeErrosCadastroTrabalho.dadosAluno);
            const idAluno = aluno.body.id;

            const disciplina = await cadastrarDisciplina(testeErrosCadastroTrabalho.dadosDisciplina);
            const idDisciplina = disciplina.body.id;

            const alunoDisciplina = await cadastrarAlunoDisciplina({
                idDisciplina,
                idAluno
            });

            const loginResposta = await getToken(
                              testeErrosCadastroTrabalho.dadosAluno.email,
                              testeErrosCadastroTrabalho.dadosAluno.senha
            );

            const trabalho = await cadastrarTrabalho(aluno.body.id, loginResposta.body.token,{
                disciplinaId: idDisciplina,
                ...testeErrosCadastroTrabalho.dadosTrabalho});

            expect(trabalho.status).to.equals(testeErrosCadastroTrabalho.statusCodeEsperado)
            expect(trabalho.body.error).to.equals(testeErrosCadastroTrabalho.errorMessagem)


            });
        });
});
