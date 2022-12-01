
function maskCpfCnpj(cpfCnpj: string): string { //MASCARA PARA CPF E CNPJ	 
  cpfCnpj = cpfCnpj.replace(/\D/g, "");
  cpfCnpj = cpfCnpj.replace(/(\d{1,14})\d*/g, "$1");

  if (cpfCnpj.length < 12) {
    cpfCnpj = cpfCnpj.replace(/\D/g, "");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1.$2");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1.$2");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    cpfCnpj = cpfCnpj.replace(/\D/g, "");
    cpfCnpj = cpfCnpj.replace(/(\d{2})(\d)/, "$1.$2");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1.$2");
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d)/, "$1/$2");
    cpfCnpj = cpfCnpj.replace(/(\d)(\d{2})$/, "$1-$2");
  }

  return cpfCnpj;
}

export { maskCpfCnpj };