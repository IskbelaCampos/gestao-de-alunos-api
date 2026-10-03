import {api} from './api.js';
import 'dotenv/config';

let tokenInCache = null

export async function tokenAdmin(){
    if (!tokenInCache){
    const loginReposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            'email': process.env.ADMIN_EMAIL,
            'senha': process.env.ADMIN_PASSWORD
        });
    tokenInCache = loginReposta.body.token
    }
    return `Bearer ${tokenInCache}`;

}

export async function getToken(emailUser, passUser){
    const loginReposta = await api()
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            'email': emailUser,
            'senha': passUser
        });
    return loginReposta;
}
