exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({
        success: {
            message: "Sign out success",
            sender: 'server',
        }
    })
}