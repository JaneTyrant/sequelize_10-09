module.exports = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).send({ errors: [{ message: err.message || 'Server Error!' }] }); // если 500 ошибка, то это всё, мы приехали
};