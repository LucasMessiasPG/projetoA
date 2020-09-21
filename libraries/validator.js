export const isValidEmail = function(email){
  if(typeof email != "string") return false;
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
}

export const isValidName = function(name){
  return typeof name == "string" && name.length >= 3;
}