const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 4040;
const app = express();
const authRouter = require('./routes/authorRouter');
const projectRouter = require('./routes/projectRouter');
const reviewRouter = require('./routes/reviewRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const clientRouter = require('./routes/clientRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/author', authRouter);

app.use('/projects', projectRouter);

app.use('/review', reviewRouter);

app.use('/categories', categoryRouter);

app.use('/users', userRouter);

app.use('/client', clientRouter);






app.use((err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }));
        return res.status(400).json({ errors });
    }
    res.status(500).json({ error: err.message || 'An unexpected error occurred' });
});

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
    console.error();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


