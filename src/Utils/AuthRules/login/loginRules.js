// (auth/invalid-email).
// (auth/missing-password).
// (auth/invalid-credential).
import { errorMessages } from '../ErrosMenssages';

export function validarEmail(email = '') {
   if (email.trim() === '')  {
      return errorMessages.missingEmail;
   }

   if(!email.includes('@gmail.com')){
    return errorMessages.invalidEmail
   }

   return '';
}
export function validarSenha(senha = '') {
   if (senha.trim() === '') {
      return errorMessages.missingPassword;
   }

   if (senha.length < 8) {
      return errorMessages.weakPassword;
   }

   return '';
}
