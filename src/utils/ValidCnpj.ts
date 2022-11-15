import { removeMaskCpfCnpj } from "./RemoveMaskCpfCnpj";

function validCnpj(cnpj: string): boolean {
  const cnpj_without_mask = removeMaskCpfCnpj(cnpj);

  if (cnpj_without_mask.length == 14) {
    return true;
  }

  return false;
}

export { validCnpj };