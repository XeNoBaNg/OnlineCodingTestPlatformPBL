import bcrypt from 'bcrypt'

const password = "xeno123"
const saltRounds = 10

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error(err)
    } else {
        console.log("Hashed Password:", hash)
    }
});
