import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log('Decoded Token:', req.user)
        next()
    } catch (error) {
        console.error('JWT Verification Error:', error.message)
        res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}

export default authenticate
