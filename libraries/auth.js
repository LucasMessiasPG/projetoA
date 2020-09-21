
import bcrypt from "bcrypt";
const saltRounds = 10;


export const encrypt = function(value, cb){
  if(typeof value != "string" || value.length < 3) return cb(new Error("value encrypt is not a valid string"));
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) return cb(err);
    bcrypt.hash(value, salt, function(err, hash) {
      if (err) return cb(err);
      cb(null, hash);
    });
  });
};

export const compareHash = async function(value, encryptedHash) {
  return bcrypt.compare(value, encryptedHash)
}