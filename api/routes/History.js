const express = require('express');
const router = express.Router();
const { UserData } = require('../models');
const {validateTheToken} = require('../middlewares/Authent');
const path = require("path");

// Postar se clicou em um item de compra ou leilão
router.post('/click/:id', validateTheToken, async (req, res) => {

    const myId = req.params.id;
    
    if (req.body && req.body.userId){

        const userId = req.body.userId;
        var userData = await UserData.findOne( { where: { UserId: userId, ItemId: myId } } );

        if (userData){

            // se não houver clicado antes
            if ( userData.rating<2){

                await userData.update({
                    rating: 2,
                    },
                    {where : {
                        id: userData.id,
                    }
                });

            }
        }
        else{

            await UserData.create({
                rating: 2,
                UserId: userId,
                ItemId: myId
            });

        }
    }
    
});

// Postar se der um lance ou comprar
router.post('/bid/:id', validateTheToken, async (req, res) => {

    const myId = req.params.id;

    if (req.body && req.body.userId){
        const userId = req.body.userId;

        var userData = await UserData.findOne( { where: { UserId: userId, ItemId: myId } } );

        if (userData){

            // Se naão deu lance ou comprou antes
            if ( userData.rating<5){
                await userData.update({
                    rating: 5,
                    },
                    {where : {
                        id: userData.id,
                    }
                });
            }
        }
        else{

            // importar dados de xlms
            await UserData.create({
                rating: 5,
                UserId: userId,
                ItemId: myId
            });
        }
    }
    
});

// Essa função chama as recomendações
async function GenerateData(){

    console.log("Gerando Recomendações");
    const { spawn } = require('child_process');

    // o caminho da recomendação
    const locpath = path.join(__dirname, '..', 'recommender', 'recommender.py')
    const pyProg = spawn('python', [locpath]);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
    });

    pyProg.stderr.on('data', (data) => {
        console.log(data.toString());
    });

}

// chama data 
setInterval( GenerateData, 24*60*60*1000);

// caso necessite rodar após iniciar o servidor
// setTimeout( GenerateData, 20*1000);

module.exports = router;