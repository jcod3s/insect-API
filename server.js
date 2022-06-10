const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 8000;

app.use(express.static('public'))
app.use(cors())

const insects = {
    'mantis': {
        'scientificName': 'Miomantis',
        'order': 'Mantodea',
        'lifeSpan': '4-6 months',
        'climates': 'temperate, tropical',
        'description': 'Mantises have large, triangular heads with a beak-like snout and mandibles. They have two bulbous compound eyes, three small simple eyes, and a pair of antennae. The articulation of the neck is also remarkably flexible; some species of mantis can rotate their heads nearly 180°.[10] The mantis thorax consists of a prothorax, a mesothorax, and a metathorax. In all species apart from the genus Mantoida, the prothorax, which bears the head and forelegs, is much longer than the other two thoracic segments. The prothorax is also flexibly articulated, allowing for a wide range of movements of the head and fore limbs while the remainder of the body remains more or less immobile.[20][21] Mantises also are unique to the Dictyoptera in that they have tympanate hearing, with two tympana in an auditory chamber in their metathorax. Most mantises can only hear ultrasound. Mantises have two spiked, grasping forelegs ("raptorial legs") in which prey items are caught and held securely. In most insect legs, including the posterior four legs of a mantis, the coxa and trochanter combine as an inconspicuous base of the leg; in the raptorial legs, however, the coxa and trochanter combine to form a segment about as long as the femur, which is a spiky part of the grasping apparatus (see illustration). Located at the base of the femur is a set of discoidal spines, usually four in number, but ranging from none to as many as five depending on the species. These spines are preceded by a number of tooth-like tubercles, which, along with a similar series of tubercles along the tibia and the apical claw near its tip, give the foreleg of the mantis its grasp on its prey. The foreleg ends in a delicate tarsus used as a walking appendage, made of four or five segments and ending in a two-toed claw with no arolium.Mantises can be loosely categorized as being macropterous (long-winged), brachypterous (short-winged), micropterous (vestigial-winged), or apterous (wingless). If not wingless, a mantis has two sets of wings: the outer wings, or tegmina, are usually narrow and leathery. They function as camouflage and as a shield for the hindwings, which are clearer and more delicate.[20][24] The abdomen of all mantises consists of 10 tergites, with a corresponding set of nine sternites visible in males and seven visible in females. The abdomen tends to be slimmer in males than females, but ends in a pair of cerci in both sexes.[20]'
    },
    'grasshopper': {
        'scientificName': 'Eyprepocnemis plorans',
        'order': 'Orthoptera',
        'lifeSpan': '1 year',
        'climates': 'Africa, Middle East',
        'description': 'Grasshoppers are plant-eaters, with a few species at times becoming serious pests of cereals, vegetables and pasture, especially when they swarm in the millions as locusts and destroy crops over wide areas. They protect themselves from predators by camouflage; when detected, many species attempt to startle the predator with a brilliantly-coloured wing-flash while jumping and (if adult) launching themselves into the air, usually flying for only a short distance. Other species such as the rainbow grasshopper have warning coloration which deters predators. Grasshoppers are affected by parasites and various diseases, and many predatory creatures feed on both nymphs and adults. The eggs are subject to attack by parasitoids and predators.'
    },
    'spider': {
        'scientificName': 'Miomantis',
        'order': 'Araneae',
        'lifeSpan': '2 years',
        'climates': 'temperate, tropical',
        'description': 'Unlike insects, spiders do not have antennae. In all except the most primitive group, the Mesothelae, spiders have the most centralized nervous systems of all arthropods, as all their ganglia are fused into one mass in the cephalothorax. Unlike most arthropods, spiders have no extensor muscles in their limbs and instead extend them by hydraulic pressure.'
    },
    'unknown': {
        'scientificName': 'unknown',
        'order': 'unknown',
        'lifeSpan': 'unknown',
        'climates': 'unkown',
        'description': 'unknown'
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

//submits new insect data to DB
app.post('/api/addInsectData',(req,res)=> {
    console.log('new insect added to DB')
})

app.listen(process.env.PORT || PORT, (req,res)=> {
    console.log(`server is running on port ${PORT}`)
})