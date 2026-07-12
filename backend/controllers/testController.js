const home = (req, res) => {
    res.send("Server is working from routes");
};

const testPost = (req, res) => {
    res.json({
        success: true,
        body: req.body
    });
};

module.exports = {
    home,
    testPost
};