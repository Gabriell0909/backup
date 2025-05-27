import { app } from '../Config/FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const FazerLogin = async (email, senha) => {
   const auth = getAuth(app);

   try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const usuario = userCredential.user;

      console.log('Deu bom familia 🙂👍');
      return usuario;
   } catch (error) {
      console.log('Erro ao cadastrar', error.message);
      throw error;
   }
};
