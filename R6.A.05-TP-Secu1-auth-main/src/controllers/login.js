import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const {email, password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    }
    else{
        let random = Math.random();
        let role = random > 0.5 ? "admin" : "utilisateur"

        user = {email, password: hashedPassword, role};
        users.push(user);
        res.status(200).send({
            message: "Utilisateur enregistré",
            user
        })
    }

}

export const loginUser = async function (req, res) {
    let {email,password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")
    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    email = user.email
    let role = user.role
    if (user) {
        const token = await res.jwtSign({email, role});

        res.status(200).send({
            message: "Connexion réussie",
            token
        })
    }
}