import express from "express";
import {createServer} from "http";
import mongoose from 'mongoose';
import cors from "cors";

import {config} from "dotenv";
import {AuthRouter} from "../routes/auth.route";

const app = express()
export const server = createServer(app)
app.use(express.json());

config();

app.use(cors({
    origin: "*"
}))
// tslint:disable-next-line:no-console
mongoose.connect(process.env.MONGO_URL || '').then(() => console.log('connected to mongodb'))


app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    const figlet = require('figlet');
    figlet('passless auth', {
        font: 'Doh',
    }, (err: any, data: any) => {
        res.send(`<div style='font-size: 10px;margin: auto;
        border: 3px solid #E8E8E8;
        display:flex;
        justify-content: center;
        background-color: #F5F5F5;
        padding: 10px; '><pre>${data} </pre></div>`)
    });

})

app.use("/auth", AuthRouter);
