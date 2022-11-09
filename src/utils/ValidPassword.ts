interface PasswordValid {
  valid: boolean;
  messages?: string[];
}

function validPassword(password: string): PasswordValid {
  let passwordValid: PasswordValid = {
    valid: true,
    messages: []
  };

  if (!password) {
    passwordValid.messages.push("É necessário informar a senha.");
    passwordValid.valid = false;

    return passwordValid;
  }

  if (password.length < 8) {
    passwordValid.messages.push("É necessário que tenha no mínimo 8 caracteres.");
  }

  if (!/[a-z]/.test(password)) {
    passwordValid.messages.push("É necessário que tenha pelo menos uma letra minúscula!");
  }

  if (!/[A-Z]/.test(password)) {
    passwordValid.messages.push("É necessário que tenha pelo menos uma letra maiúscula!");
  }

  if (!/[0-9]/.test(password)) {
    passwordValid.messages.push("É necessário que tenha pelo menos um digito!");
  }

  if (!/[!@#\$%\^\&*\)\(+=._-]/.test(password)) {
    passwordValid.messages.push("É necessário que tenha pelo menos um caracter especial!");
  }

  passwordValid.valid = passwordValid.messages.length > 0 ? false : true;

  return passwordValid;
}

export { validPassword }