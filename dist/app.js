import express from 'express';
import BasicModel from './models/basic-model.js';
import asyncWrapper from './middlewares/async-wrapper.js';
import errorHandler from './middlewares/error-handler.js';
const start = () => {
    try {
        const app = express();
        app.get('/', asyncWrapper(async (req, res) => {
            const result = await BasicModel.findBy(['user_id', 'username', 'created_at'], 'users', {
                username: 'john_doe',
            });
            res.send(result);
        }));
        app.use(errorHandler);
        app.listen(5500);
    }
    catch (error) {
        console.log('Error: ', error);
    }
};
start();
