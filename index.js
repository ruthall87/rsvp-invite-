
const express= require('express') ;
const mongoose= require('mongoose');
const dotenv =require( 'dotenv');
const bodyParser = require('body-parser');
dotenv.config();

mongoose.connect(
    process.env.CONNECT,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('connected')
);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

const responseSchema = new mongoose.Schema({
    name: String,
    email: String,
    guest: Number,
    attending: Boolean,
});

const Response = mongoose.model('Responses', responseSchema);
app.use(express.json());
app.use(
    express.urlencoded({
        extended:true,
    })
);

app.set('view engine', 'pug');
app.get('/', (req,res)=> {
    res.render('index');
});

app.post('/reply', async (req, res) => {
    const replyTo = new Response({
        name: req.body.name,
        email: req.body.email,
        guest: req.body.guests,
        attending: req.body.attending,
    });

    res.render('reply');
    try {
        const savedReply = await replyTo.save();
        res.json(savedReply);
    }catch (err) {
        res.json(err);
    }
});
app.get('/guests', (req, res) => {
    Response.find({}, function(err, response){
        if(err) return console.error(err);
        else res.render('guests', {responses: response});
    });
});


app.listen(3000);




