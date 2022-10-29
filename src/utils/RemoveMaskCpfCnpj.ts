function removeMaskCpfCnpj(cpf_cnpj: string): string {
  return cpf_cnpj.replace(/\.|-|\//g, "");
}

export { removeMaskCpfCnpj };