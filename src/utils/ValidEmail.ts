function validEmail(email: string): boolean{
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
  }

  return false;
}

export { validEmail }