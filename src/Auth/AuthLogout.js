import { signOut } from 'firebase/auth';
import { auth } from '../Config/FirebaseConfig';

export const Deslogar = async () => {
   try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso');
      return true
   } catch (error) {
      console.error('Erro ao deslogar', error);
      return false
    }
};
