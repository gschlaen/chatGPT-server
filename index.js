import { ChatGPTAPIBrowser } from 'chatgpt'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL,
    password: process.env.OPENAI_PASSWORD
});

await api.initSession();

app.post('/', async (req, res) => {
    console.log(req.body);
    const { message, conversationId, parentMessageId } = req.body;
    
    try {
        const response = await api.sendMessage(message, {
            conversationId: conversationId, 
            parentMessageId: parentMessageId
        })
        
        console.log(`response: ${response['conversationId']}`);
        res.json(response)
        
    } catch (e) {
        res.json({error: e.toString()});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
});


    
    
    

