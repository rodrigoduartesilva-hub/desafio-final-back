const express = require('express');
const router = express.Router();
const {validateTheToken} = require('../middlewares/Authent');
const { upload } = require('../middlewares/Upload');
const { Photo, Item } = require('../models');
const fs = require('fs');
const path = require("path");

// nenhum símbolo causa necessidade para operar
router.get('/:id', async (req, res) => {

    const itemId = req.params.id;
    const images = await Photo.findAll({ where: { ItemId: itemId,}});

    res.json(images);

});


// nenhum símbolo causa necessidade para operar
router.get('/getcover/:id', async (req, res) => {

    const itemId = req.params.id;

    const coverImage = await Photo.findOne({ where: { ItemId: itemId, coverPhoto: true}});

    res.json(coverImage);

});


// o vendendor escolhe as fotos
router.put('/setcover/:id', validateTheToken, async (req, res)=>{

    const myId = req.params.id;
    const itemId = req.body.ItemId;


    const anotherone = await Photo.findOne({ where: {id: myId}});

    await Item.update({
        coverPhoto: anotherone.url,
        },
        {where : {
            id: itemId,
        }
    });

});

router.post('/:id', validateTheToken, upload.single('image'), async (req, res) => {

    const filename = req.params.id;
    const myUrl = `https://localhost:33123/images/${filename}`

    const itemId = parseInt(filename.split('_')[0]);

    const anotherone = await Photo.findOne({ where: {ItemId: itemId}});
    
    if(anotherone ===null){
        // Cria nova foto de capa
        await Item.update({
            coverPhoto: myUrl,
            },
            {where : {
                id: itemId,
            }
        });

    }

    await Photo.create({
        ItemId: itemId,
        url: myUrl,
    }).catch(err => {
        console.log(err);
    });

    res.json({message:"Image uploaded!"})

});


// valida o usuario antes de deletar
router.delete('/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const photograph = await Photo.findOne({ where: {id: myId}});
    const itemId = photograph.ItemId;
    const localpath = path.join(__dirname, '..', 'images', photograph.url.split('/').pop())

    await Photo.destroy({where : {
        id: myId,
    }});

    // remove de forma assincrona
    fs.unlink(localpath, function(err){
        if(err){
            console.error(err)
        }
        else {
            console.log("File Removed: ", localpath);
        }
    });

    const newcover = await Photo.findOne({ where: {ItemId: itemId}});
    //local da foto a ser criado
    if ( newcover === null){
        await Item.update({
            coverPhoto: "https://localhost:33123/images/placeholder.png",
            },
            {where : {
                id: itemId,
            }
        });
    }
    else{
        await Item.update({
            coverPhoto: newcover.url,
            },
            {where : {
                id: itemId,
            }
        });
    }
});


module.exports = router;