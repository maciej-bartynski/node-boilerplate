exports.signUpValidator = (req, res, next) => {
    req.check("name", "Name is required")
        .notEmpty();

    req.check("email", "Email is required")
        .notEmpty()
        .isLength({
            min: 5,
            max: 32
        })
        .withMessage('Provide appropratie e-mail format, e.g. name@domain.com, at least 5 char long and max 32')
        .matches(/.+\@.+\..+/)
        .withMessage('E-mail must contain \'@\'')

    req.check("password", "Password is required")
        .notEmpty()
        .isLength({
            min: 6,
            max: 32
        })
        .withMessage('Provide passwort at least 6 char long and max 32')
        .matches(/\d/)
        .withMessage('Password must contain at least 1 digit');

    const errors = req.validationErrors();

    if (errors) {
        let messages = ''
        errors.forEach((err, id)=>{
            messages += id + ': ' + err.msg + ' | '
        })
        return res.status(400).json({ 
            error: {
                message: messages,
                sender: 'server - sign up validator',
                errors
            }
        });
    }

    next();
}