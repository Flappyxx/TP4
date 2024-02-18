export async function getAuthenticate(req, res) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token){
            const decoded = await req.jwtVerify(token);
            req.headers['role'] = decoded.role
        }
        else{
            throw new Error("No token");
        }
    } catch (err) {
        console.log(err)
        res.code(401).send({...err, message: "Vous ne passerez pas !"})
    }
}