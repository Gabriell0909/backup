import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import App from '../Config/FirebaseConfig.js';

const auth = getAuth(App);

export const CadastrarUsuario = async (email, senha) => {
   try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const usuario = userCredential.user;

      console.log('Usuário registrado com sucesso', usuario.uid);
      return usuario;
   } catch (error) {
      console.log('Erro ao cadastrar o usuário', error.message);
      throw error;
   }
};
