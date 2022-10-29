import { removeMaskCpfCnpj } from "./RemoveMaskCpfCnpj";

function validCpfCnpj(cpf_cnpj: string): boolean {
  const cpf_cnpj_without_mask = removeMaskCpfCnpj(cpf_cnpj);

  if (cpf_cnpj_without_mask.length == 11) {
    return true;
  } else if (cpf_cnpj_without_mask.length == 14){
    return true;
  }

  return false;
}

export { validCpfCnpj };