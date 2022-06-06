const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 8000;

app.use(express.static('public'))
app.use(cors())

const insects = {
    'mantis': {
        'lifeExpectancy': 1,
        'countriesFound': 51,
        'specialTraits': 'arms',
        'scientificName': 'scaggly waggly'
    },
    'grass hopper': {
        'lifeExpectancy': 1,
        'countriesFound': 89,
        'specialTraits': 'legs',
        'scientificName': 'schmoopy magoo'
    },
    'spider': {
        'lifeExpectancy': 6,
        'countriesFound': 38,
        'specialTraits': 'legs',
        'scientificName': 'ren de fartz'
    },
    'unknown': {
        'lifeExpectancy': 'unknown',
        'countriesFound': 'unknown',
        'specialTraits': 'unknown',
        'scientificName': 'unknown'
    }
}

app.get('/',(req,res) => {
    res.sendFile(__dirname+'/index.html')
})


app.get('/api/:insectName',(req,res)=> {
    const insectName = req.params.insectName.toLowerCase();
    if (insects[insectName]){
        res.json(insects[insectName])
    } else {
        res.json(insects['unknown'])
    }
    //res.json(insects);
})

app.listen(process.env.PORT || PORT, (req,res)=> {
    console.log(`server is running on port ${PORT}`)
})