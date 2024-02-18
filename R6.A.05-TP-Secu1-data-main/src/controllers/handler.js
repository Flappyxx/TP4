export const getAuthHandler = function (req, res) {

    const role = req.headers['role']

    console.log(role)

    if(role === "admin"){
        res.send({message: "Full access"})
    }

    else if(role === "utilisateur"){
        res.send({message: "Limited access"})
    }

    else {
        res.send({message: "role invalide ???? comment t'as fait frère ???"})
    }

}

export const getHomeHandler = (req, res) => {
    return res.send({'hello': 'world'})
}