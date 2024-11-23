const DELETE = function (req, res) {
    res.json({
        "message": "Post Deleted Successfully", "success": true
    });
}

module.exports = {DELETE};