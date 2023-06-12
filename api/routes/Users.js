const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const {sign} =require('jsonwebtoken');
const { validateTheToken } = require('../middlewares/Authent');
const { Op } = require("sequelize");

router.post('/', async (req, res) => {
    
    const { username , password , name , surname , email , telephone , latitudeLongitude , location , country , taxnumber, sellerRating, saleCount, bidderRating, buyCount } = req.body;

    bcrypt.hash(password, 10).then((hash)=>{
        User.create({
            username: username,
            password: hash,
            name: name,
            surname: surname,
            email: email,
            telephone: telephone,
            latitudeLongitude: latitudeLongitude,
            location: location,
            country: country,
            taxnumber: taxnumber,
            sellerRating: sellerRating,
            saleCount: saleCount,
            bidderRating: bidderRating,
            buyCount: buyCount,
            // apenas por segurança
            admin: false,
            approved: false,
        });
        res.json('Successful');
    });

});

router.post('/login', async (req, res) => {
    
    const { username , password } = req.body;

    const user = await User.findOne({ where: {username: username}});

    // se o usuario não está na tabela
    if (!user){
        res.json({error: "Usuário não existe!"});
    }
    else{

        if (user.approved===false){
            res.json({error: "aprovação"});
        }
        else{

            bcrypt.compare(password, user.password).then((matched)=>{
                if(!matched){
                    res.json({error: "Credenciais erradas!"});
                }
                else{
                    const accessToken = sign({username: user.username, id: user.id}, "coloqueaquiseusegredo");
                    res.json({token: accessToken, username: user.username, id: user.id });
                }
            });

        }

        
    }

});

router.get('/fetchy/:id', async (req, res) => {
    const myId = req.params.id;
    const userito = await User.findByPk(myId);

    // não retorna mais informações do vendedor do que necessário
    res.json({ username: userito.username, saleCount: userito.saleCount, sellerRating: userito.sellerRating, name: userito.name, surname: userito.surname, id: userito.id });
});

router.get('/exists/:id', async (req, res) => {

    const myId = req.params.id;
    const usr = await User.findOne({ where: { username: myId } });
    
    if(usr ===null){
        res.json({
            exists: false,
        });
    }
    else{
        res.json({
            exists: true,
        });
    }
    
});

// isso não é assincrono tornando importate ter segurança
router.get('/validate', validateTheToken, (req, res) => {

    res.json({
        username: req.user.username, 
        id: req.user.id, 
        status: true,
    });

});

router.get('/fetchyall/:id', async (req, res) => {
    const myId = req.params.id;
    const userito = await User.findByPk(myId, {
        // não retorna senha nos atributos
        attributes: {exclude: ["password"]},
    });
    if (!userito || userito.username==="admin"){
        res.json({message:"Not allowed"})
    }
    else{
        res.json(userito);
    }
});

router.get('/', validateTheToken, async (req, res) => {

    // garante que é o admin
    const username = req.user.username;

    if (username==='admin'){

        // exclue o nome de usuario e a senha das informações
        const allUsers = await User.findAll( {where: {
            username: { [Op.ne]: 'admin' }
        },
        attributes: {exclude: ["password"]},
        });
        res.json(allUsers);
    }
});



router.get('/approve', validateTheToken , async (req, res) => {

    // exclue o nome de usuario e a senha das informações
    const allUsers = await User.findAll( {where: {
        approved: false,
        username: { [Op.ne]: 'admin' }
    },
    attributes: {exclude: ["password"]},
    });
    res.json(allUsers);
    
});

// usuario aprovado pelo admin apos utilizar o token
router.put('/approve', validateTheToken, async (req, res) => {
    
    const userList = req.body;
    const username = req.user.username;

    if (username==='admin'){
        for (var i = 0; i < userList.length; i++) {
            var userId = userList[i];
            console.log(userId);
            await User.update({
                approved: true
                },
                {where : { 
                    id: userId
                }
            });
        }
        res.json("Succesfully approved users!");
    }
    else{
        res.json("This is forbidden!")
    }
    
});


module.exports = router;