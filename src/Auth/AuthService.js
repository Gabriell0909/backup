import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

export const requestRecoveryPassword = async (email) => {
   if (!email.trim()) {
      throw new Error('Por favor, insira seu e-mail');
   }

   const actionCodeSettings = {
      url: 'https://economiza-75d55.firebaseapp.com/reset-password',
      handleCodeInApp: true,
      iOS: {
         bundleId: 'com.economiza.app',
      },
      android: {
         packageName: 'com.economiza.app',
      },
   };

   try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      return { sucess: true, message: 'E-mail de recuperação enviado com sucesso!' };
   } catch (error) {
      console.log('Erro no serviço ao enviar e-mail de recuperação:', error);
   }
};
