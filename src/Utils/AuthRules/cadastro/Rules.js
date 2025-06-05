import { errorMessages } from '../ErrosMenssages';

export function validarEmail(email) {
  if (email.trim() === '') {
    return errorMessages.missingEmail || 'Informe seu e‑mail.';
  }
  if (!email.includes('@') || !email.includes('.')) {
    return errorMessages.invalidEmail;
  }
  if(email){

  }
  return '';
}

export function validarSenha(senha) {
  if (senha.trim() === '') {
    return errorMessages.missingPassword;
  }
  if (senha.length < 6) {
    return errorMessages.weakPassword;
  }
  return '';
}

export function validarSenhaConfirmada(senha, senhaConfirmada) {
  if (senhaConfirmada.trim() === '') {
    return errorMessages.missingPasswordConfirm || 'Repita sua senha.';
  }
  if (senha !== senhaConfirmada) {
    return errorMessages.passwordsDontMatch;
  }
  return '';
}
