const express = require('express');
const app = express();
const port = 3000;
const characters = require('./harrypotter.json');
//In-built middleware coming from express
app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Hello Harry Potter Characters")
})

app.get('/characters', (req,res)=>{
    res.send(characters)
})

app.get('/characters/:id', (req, res)=>{
    const id=parseInt(req.params.id);
    const character=characters.find((character)=>character.id===id)
    if(character==undefined){
        res.status(404).send("The character does not exist")
    }else{
        res.send(character)
    }
})

//Creating a request (creating a Harry Potter character)
//Math.max analyses the data, the ... operater presents all the data within one set/record/tree etc.
/*We create the const ids first to simply take the id of the character, 
and then we are analysing the Id's using the math.max operater and presenting 
all the data with the ...ids operate*/ 

const ids=characters.map((character)=>(character.id))
let maxId=Math.max(...ids)

app.post('/characters',(req,res)=>{
    const character=characters.find((character)=>character.name.toLowerCase()==req.body.name.toLowerCase())
    console.log(req.body)
    if(character!=undefined){
        res.status(409).send("The character already exists");
    }
    else{
        maxId+=1;//this is equal to maxId = maxId+1
        req.body.id=maxId;
        characters.push(req.body)
        res.status(201).send(req.body)
    }
})


app.delete("/characters/:name",(req,res)=>{
    const name=req.params.name.toLowerCase();
    const characterIndex=characters.findIndex((character)=>character.name.toLowerCase()==name)
    console.log(characterIndex)
    if(characterIndex==-1){
        res.status(404).send("The character does not exist")
    }
    else{
        characters.splice(characterIndex,1)
        res.sendStatus(204)
    }
})


app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})


