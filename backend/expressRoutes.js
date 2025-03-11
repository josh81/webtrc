
const app = require('./server').app;
const jwt = require('jsonwebtoken');
const linkSecret = "ijr2iq34rfeiadsfkjq3ew";
const { v4: uuidv4 } = require('uuid');

const professionalAppointments = [{
    professionalsFullName: "Peter Chan, J.D.",
    apptDate: Date.now() + 500000,
    uuid:1,
    clientName: "Jim Jones",
},{
    professionalsFullName: "Peter Chan, J.D.",
    apptDate: Date.now() - 2000000,
    uuid:2,// uuid:uuidv4(),
    clientName: "Akash Patel",
},{
    professionalsFullName: "Peter Chan, J.D.",
    apptDate: Date.now() + 10000000,
    uuid:3,//uuid:uuidv4(),
    clientName: "Mike Williams",
}];

app.set('professionalAppointments',professionalAppointments)

app.get('/user-link',(req,res)=>{

    const apptData = professionalAppointments[0];

    
    professionalAppointments.push(apptData);

    const token = jwt.sign(apptData, linkSecret);
    res.send('https://www.clyksnkutz.com/join-video?token='+token);
    // res.json("This is a test route");
})

app.post('/validate-link', (req,res)=>{
    const token = req.body.token;
    const decodedData = jwt.verify(token, linkSecret);
    res.json(decodedData)

})

app.get('/pro-link',(req, res)=>{
    const userData = {
        fullName: "Peter Chan, J.D.",
        proId: 1234,
    }
    const token = jwt.sign(userData,linkSecret);
    res.send(`<a href="https://www.clyksnkutz.com/dashboard?token=${token}" target="_blank">Link Here</a>`);
})
