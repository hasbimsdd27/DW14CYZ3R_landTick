function Passgenerator() {
  const bcrypt = require("bcrypt");
  let pass = "";
  let hash = bcrypt.hashSync("agus@user.com", 10);
  return hash;
}

console.log(Passgenerator());
