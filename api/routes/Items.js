const express = require('express');
const router = express.Router();
const { Item, Bid, Mail , Message, User, Contact, Category, UserData, UserTop } = require('../models');
const {validateTheToken} = require('../middlewares/Authent');
const { Op } = require("sequelize");
const fs = require('fs');
const js2xml = require('js2xml').Js2Xml;
const xml2js = require('xml2js');

router.get('/', async (req, res) => {

    // Atualizando itens expirados
    const allItems = await Item.findAll({ 
        where: { 
            state: "DISPONÍVEL",
            ends: {
                [Op.lt]: new Date()
            }
        },
    });

    for (var i = 0; i < allItems.length; i++) {

        if( allItems[i].number_of_bids>0){
            await Item.update({
                state: "COMPRADO",
                },
                {where : {
                    id: allItems[i].id,
                }
            });

            // Criando email para eles
            const newmail = await Mail.create({
                itemId: allItems[i].id,
                itemName: allItems[i].name,
                bidderId: allItems[i].highestBidder,
                sellerId: allItems[i].UserId,
            }).catch(err => {
                console.log(err);
            });

            const userito = await User.findByPk( allItems[i].UserId);
            const biderito = await User.findByPk(allItems[i].highestBidder);

            // Envia mensagem de confirmação para o comprador
            await Message.create({
                title: "Confirmação",
                body: "Parabéns por vencer o leilão! Sinta-se a vontade para tirar dúvidas sobre o processo de pagamento!",
                senderId: userito.id,
                recipientId: biderito.id,
                senderName: userito.name,
                senderSurname: userito.surname,
                recipientName: biderito.name,
                recipientSurname: biderito.surname,
                MailId: newmail.id,
                UserId: userito.id,
            }).catch(err => {
                console.log(err);
            });

            // buscando pelos simétricos
            const contactalready = await Contact.findOne({ where: {contactId: userito.id, UserId: biderito.id}});
            
            // caso ainda não esteja suficiente, adicionar os contatos
            if(contactalready ===null){

                await Contact.create({
                    contactId: userito.id,
                    contactName: userito.name,
                    contactSurname: userito.surname,
                    contactUsername: userito.username,
                    UserId: biderito.id,
                }).catch(err => {
                    console.log(err);
                });

                await Contact.create({
                    contactId: biderito.id,
                    contactName: biderito.name,
                    contactSurname: biderito.surname,
                    contactUsername: biderito.username,
                    UserId: userito.id,
                }).catch(err => {
                    console.log(err);
                });
            }

        }
        else{
            await Item.update({
                state: "EXPIRADO",
                },
                {where : {
                    id: allItems[i].id,
                }
            });
        }
    }

    // ATUALIZANDO OS QUE AINDA ESTARÃO DISPONIVEIS
    await Item.update({
        state: "DISPONÍVEL",
        },
        {where : {
            state: "ESPERADO",
            started: {
                [Op.lte]: new Date()
            }
        }
    });

    // RETORNA OS ITENS ATUALMENTE DISPONÍVEIS
    const availableItems = await Item.findAll({ where: { state: "DISPONÍVEL"},
    });

    res.json(availableItems);
});

router.get('/admin/', validateTheToken, async (req, res) => {

    const username = req.header("username");

    if (username=="admin"){
        
         // ATUALIZANDO OS ITENS EXPIRADOS
        const allItems = await Item.findAll({ 
            where: { 
                state: "DISPONÍVEL",
                ends: {
                    [Op.lt]: new Date()
                }
            },
        });

        for (var i = 0; i < allItems.length; i++) {

            if( allItems[i].number_of_bids>0){
                await Item.update({
                    state: "COMPRADO",
                    },
                    {where : {
                        id: allItems[i].id,
                    }
                });

                // CRIA O EMAIL
                const newmail = await Mail.create({
                    itemId: allItems[i].id,
                    itemName: allItems[i].name,
                    bidderId: allItems[i].highestBidder,
                    sellerId: allItems[i].UserId,
                }).catch(err => {
                    console.log(err);
                });

                const userito = await User.findByPk( allItems[i].UserId);
                const biderito = await User.findByPk(allItems[i].highestBidder);

                // Envia mensagem de compra
                await Message.create({
                    title: "Confirmação",
                    body: "Parabéns por vencer o leilão! Esteja a vontade para solicitar onformações de pagamento e envio!",
                    senderId: userito.id,
                    recipientId: biderito.id,
                    senderName: userito.name,
                    senderSurname: userito.surname,
                    recipientName: biderito.name,
                    recipientSurname: biderito.surname,
                    MailId: newmail.id,
                    UserId: userito.id,
                }).catch(err => {
                    console.log(err);
                });

                // buscando por simétricos
                const contactalready = await Contact.findOne({ where: {contactId: userito.id, UserId: biderito.id}});
                
                // caso não estejam ainda, adicionados
                if(contactalready ===null){

                    await Contact.create({
                        contactId: userito.id,
                        contactName: userito.name,
                        contactSurname: userito.surname,
                        contactUsername: userito.username,
                        UserId: biderito.id,
                    }).catch(err => {
                        console.log(err);
                    });

                    await Contact.create({
                        contactId: biderito.id,
                        contactName: biderito.name,
                        contactSurname: biderito.surname,
                        contactUsername: biderito.username,
                        UserId: userito.id,
                    }).catch(err => {
                        console.log(err);
                    });
                }

            }
            else{
                await Item.update({
                    state: "EXPIRED",
                    },
                    {where : {
                        id: allItems[i].id,
                    }
                });
            }
        }

        // atualizando os que estão disponíveis
        await Item.update({
            state: "DISPONÍVEL",
            },
            {where : {
                state: "ESPERADO",
                started: {
                    [Op.lte]: new Date()
                }
            }
        });
    
        // usando a lista refeita
        const availableItems = await Item.findAll();
        res.json(availableItems);
    }
    else{
        res.json({message: "proibido"});
    }
   
});

// encontrando todas as subcategorias
function myChildren(categoriesList, superCategoryId){
    var categs = [];
    categs.push(superCategoryId);
    for (var i=0; i<categoriesList.length;i++){
        if (categoriesList[i].CategoryId==superCategoryId){
            categs.push.apply(categs, myChildren(categoriesList, categoriesList[i].id))
        }
    } 
    return categs;
}

router.get('/categories/:id', async (req, res) => {

    // atualizando os que expiraram
    const allItems = await Item.findAll({ 
    where: { 
        state: "DISPONÍVEL",
        ends: {
            [Op.lt]: new Date()
        }
    },
    });

    for (var i = 0; i < allItems.length; i++) {

        if( allItems[i].number_of_bids>0){
            await Item.update({
                state: "COMPRADO",
                },
                {where : {
                    id: allItems[i].id,
                }
            });

            // criando mensagem de subescrição
            const newmail = await Mail.create({
                itemId: allItems[i].id,
                itemName: allItems[i].name,
                bidderId: allItems[i].highestBidder,
                sellerId: allItems[i].UserId,
            }).catch(err => {
                console.log(err);
            });

            const userito = await User.findByPk( allItems[i].UserId);
            const biderito = await User.findByPk(allItems[i].highestBidder);

            // enviando mensagem de confirmação para comprador
            await Message.create({
                title: "Confirmação",
                body: "Parabéns por vencer o leilão! Esteja a vontade para solicitar informações de envio e pagamento!",
                senderId: userito.id,
                recipientId: biderito.id,
                senderName: userito.name,
                senderSurname: userito.surname,
                recipientName: biderito.name,
                recipientSurname: biderito.surname,
                MailId: newmail.id,
                UserId: userito.id,
            }).catch(err => {
                console.log(err);
            });

            // buscando por simétricos
            const contactalready = await Contact.findOne({ where: {contactId: userito.id, UserId: biderito.id}});
            
            // se não estiverem todos, adiconar
            if(contactalready ===null){

                await Contact.create({
                    contactId: userito.id,
                    contactName: userito.name,
                    contactSurname: userito.surname,
                    contactUsername: userito.username,
                    UserId: biderito.id,
                }).catch(err => {
                    console.log(err);
                });

                await Contact.create({
                    contactId: biderito.id,
                    contactName: biderito.name,
                    contactSurname: biderito.surname,
                    contactUsername: biderito.username,
                    UserId: userito.id,
                }).catch(err => {
                    console.log(err);
                });
            }

        }
        else{
            await Item.update({
                state: "EXPIRADO",
                },
                {where : {
                    id: allItems[i].id,
                }
            });
        }
    }

    // atualizando os disponíveis
    await Item.update({
        state: "DISPONÍVEL",
        },
        {where : {
            state: "ESPERADOD",
            started: {
                [Op.lte]: new Date()
            }
        }
    });

    // encontra os itens da categoria
    const allCategories = await Category.findAll();
    const superCategoryId = req.params.id;

    var categs = []
    categs.push.apply(categs, myChildren(allCategories, superCategoryId))

    const availableItems = [];
    for (var i=0; i<categs.length;i++){
        const freshItems = await Item.findAll({ where: 
            { furthermostCategoryId: categs[i],
             state: "AVAILABLE"},
       });
        availableItems.push.apply(availableItems, freshItems);
    }  

    res.json(availableItems);
});



router.get('/fetchy/:id', async (req, res) => {

    const myId = req.params.id;
    
    if (req.body && req.body.userId){
        const userId = req.body.userId;

        var UserData = await User.findOne( { where: { UserId: userId, ItemId: myId } } );

        if (UserData){

            // caso não tenha clicado antes
            if ( UserData.rating<2){
                await UserData.update({
                    rating: 2,
                    },
                    {where : {
                        id: UserData.id,
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
    
    const itemito = await Item.findByPk(myId);
    res.json(itemito);
});

router.post('/fetchy/:id', async (req, res) => {
    const myId = req.params.id;
    
    const itemito = await Item.findByPk(myId);
    res.json(itemito);
});

router.get('/fetchByUser/:id', async (req, res) => {
    const myId = req.params.id;
    const alltheUserItems = await Item.findAll({
        where: { UserId: myId},
        include: [Bid],
    });
    res.json(alltheUserItems);
});

router.get('/mywatchlist/:id', async (req, res) => {

    const myId = req.params.id;
    const allMyBids = await Bid.findAll({
        where: { UserId: myId},
    });

    // encontrando id único
    var ids = []
    for (var i=0;i<allMyBids.length;i++){
        ids.push(allMyBids[i].ItemId);
    }
    var uniqueIds= [... new Set(ids)]

    var watchlist = []
    for (var i=0;i<uniqueIds.length;i++){
        const itemito = await Item.findByPk(uniqueIds[i]);
        if (itemito.state=='DISPONÍVEL'){
            watchlist.push(itemito);
        }
        
    }

    res.json(watchlist);

});

router.post('/', validateTheToken, async (req, res) => {

    const item = req.body;
    const userId = req.user.id;
    item.UserId = userId;

    await Item.create(item);

    res.json(item);
});

router.put('/purchase/:id', validateTheToken, async (req, res)=>{

    const myId = req.params.id;
    const bidderId = req.body.userId;
    const sellerId = req.body.sellerId;
    const finalAmount = req.body.purchaseAmount;
    
    await Item.update({
        state: "COMPRADO",
        highestBidder: bidderId,
        currently: finalAmount,
        },
        {where : {
            id: myId,
        }
    });

    await Item.increment({number_of_bids: 1}, { where: { id: myId } });

    const itemito = await Item.findByPk(myId);

    // cria mesnsagem de inscrição
    const newmail = await Mail.create({
        itemId: myId,
        itemName: itemito.name,
        bidderId: bidderId,
        sellerId: sellerId,
    }).catch(err => {
        console.log(err);
    });

    const userito = await User.findByPk(sellerId);
    const biderito = await User.findByPk(bidderId);

    // envia mensagem de confirmação ao comprador
    await Message.create({
        title: "Confirmação",
        body: "Parbéns por vencer o leilão! Fique a vontade para dúvidas de pagamento e envio!",
        senderId: sellerId,
        recipientId: bidderId,
        senderName: userito.name,
        senderSurname: userito.surname,
        recipientName: biderito.name,
        recipientSurname: biderito.surname,
        MailId: newmail.id,
        UserId: sellerId,
    }).catch(err => {
        console.log(err);
    });

    // buscando por simétricos
    const contactalready = await Contact.findOne({ where: {contactId: sellerId, UserId: bidderId}});
    
    // caso não estejma, adicionar
    if(contactalready ===null){

        await Contact.create({
            contactId: userito.id,
            contactName: userito.name,
            contactSurname: userito.surname,
            contactUsername: userito.username,
            UserId: biderito.id,
        }).catch(err => {
            console.log(err);
        });

        await Contact.create({
            contactId: biderito.id,
            contactName: biderito.name,
            contactSurname: biderito.surname,
            contactUsername: biderito.username,
            UserId: userito.id,
        }).catch(err => {
            console.log(err);
        });

    }

});


// Atuallizando o nome do leilão
router.put('/name/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuário
    const userId = req.header("userId");
    
    await Item.update({
        name: item.name,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});

// atualiza a data de início
router.put('/started/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica se não é outro
    const userId = req.header("userId");
    
    await Item.update({
        started: item.started,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});

// atualiza a data final 
router.put('/ends/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuario
    const userId = req.header("userId");
    
    await Item.update({
        ends: item.ends,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});

// atualiza o preço de compra
router.put('/buyprice/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuario
    const userId = req.header("userId");
    
    await Item.update({
        buy_price: item.buy_price,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});


// atualiza os valores dos lances
router.put('/currently/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuario
    const userId = req.header("userId");
    
    await Item.update({
        currently: item.currently,
        first_bid: item.currently,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});


// atualiza o local
router.put('/location/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuario
    const userId = req.header("userId");
    
    await Item.update({
        location: item.location,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});

// atualiza o país
router.put('/country/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuario
    const userId = req.header("userId");
    
    await Item.update({
        country: item.country,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});

// atualiza a descrição
router.put('/description/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuario
    const userId = req.header("userId");
    
    await Item.update({
        description: item.description,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});


// atualiza as coordenadas
router.put('/coordinates/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuario
    const userId = req.header("userId");
    
    await Item.update({
        latitudeLongitude: item.latitudeLongitude,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});



// atualiza a categoria
router.put('/category/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    const item = req.body;
    
    // verifica o usuario
    const userId = req.header("userId");
    
    await Item.update({
        furthermostCategoryId: item.furthermostCategoryId,
    },
    {where : {
        id: myId,
        UserId: userId
    }
    });
});

// valida o usuario antes de deletar
router.delete('/:id', validateTheToken, async (req, res)=>{
    const myId = req.params.id;
    
    // verifica o usuario mesmo verificado no front
    const userId = req.header("userId");
    
    await Item.destroy({where : {
        id: myId,
        UserId: userId
    }});

});

// encontra o caminho hierarquico
function myParents(categoriesList, childId){

    var categs = [];
    for (var i=0; i<categoriesList.length;i++){
        if (categoriesList[i].id==childId){
            
            const childCategory = categoriesList[i];
            categs.push(childCategory.name);

            for (var j=0; j<categoriesList.length;j++){
                if (categoriesList[j].id==childCategory.CategoryId){
                    categs.push.apply(categs, myParents(categoriesList, categoriesList[j].id))
                }
            }

        }
    }

    return categs;
}

router.get('/downloadJSON', validateTheToken, async (req, res) => {

    const username = req.header("username");

    if (username=="admin"){

        const allItems = await Item.findAll();
        const allCategories = await Category.findAll();

        var itemjsons = []
        for (var i=0;i<allItems.length;i++){

            // encontra a categoria dos itens
            var categories = [];
            categories.push.apply(categories, myParents(allCategories, allItems[i].furthermostCategoryId))
    
            // reversão do geral para especifico
            var categoriesInOrder = categories.reverse();
    
            // encontra informações do vendedor
            const seller = await User.findByPk(allItems[i].UserId); 

            // encontra os lances no item
            const allBids = await Bid.findAll({ 
                where: { ItemId: allItems[i].id},
            });

            // fixa o formato dos lances
            var bidsInOrder =[]
            for (var j=0;j<allBids.length;j++){

                const bidder = await User.findByPk(allBids[j].UserId);
                
                const bid = {
                    Bidder: {
                        Rating: bidder.bidderRating,
                        UserId: bidder.username,
                        Location: bidder.location,
                        Country: bidder.country,
                    },
                    Time: allBids[j].time.toLocaleString(),
                    Amount: allBids[j].amount,
                };
    
                bidsInOrder.push(bid);
                
            }
 
            var location = {Location: allItems[i].location}
            if (allItems[i].latitudeLongitude){
                location.Latitude = allItems[i].latitudeLongitude.coordinates[0];
                location.Longitude = allItems[i].latitudeLongitude.coordinates[1];
            }

            var item = {}

            if (allItems[i].buy_price){
                item = {
                    ItemID: allItems[i].id ,
                    Name: allItems[i].name,
                    Category: categoriesInOrder,
                    Currently: allItems[i].currently,
                    Buy_Price: allItems[i].buy_price,
                    First_Bid: allItems[i].first_bid,
                    Number_Of_Bids: allItems[i].number_of_bids,
                    Bids: bidsInOrder,
                    Location: location,
                    Country: allItems[i].country,
                    Started: allItems[i].started.toLocaleString(),
                    Ends: allItems[i].ends.toLocaleString(),
                    Seller: { Rating: seller.sellerRating, UserID: seller.username },
                    Description: allItems[i].description
                };
            }
            else {
                item = {
                    ItemID: allItems[i].id ,
                    Name: allItems[i].name,
                    Category: categoriesInOrder,
                    Currently: allItems[i].currently,
                    First_Bid: allItems[i].first_bid,
                    Number_Of_Bids: allItems[i].number_of_bids,
                    Bids: bidsInOrder,
                    Location: location,
                    Country: allItems[i].country,
                    Started: allItems[i].started.toLocaleString(),
                    Ends: allItems[i].ends.toLocaleString(),
                    Seller: { Rating: seller.sellerRating, UserID: seller.username },
                    Description: allItems[i].description
                };
            }

            itemjsons.push(item);

        }

        res.json(itemjsons);

    }
    else{
        res.json({message: "proibido"});
    }
});

router.get('/downloadXML', validateTheToken, async (req, res) => {

    const username = req.header("username");

    if (username=="admin"){

        const allItems = await Item.findAll();
        const allCategories = await Category.findAll();

        var itemsXMLformat = "<Items>\n"

        for (var i=0;i<allItems.length;i++){

            // encontra as categorias dos itens
            var categories = [];
            categories.push.apply(categories, myParents(allCategories, allItems[i].furthermostCategoryId))
    
            // reverso do geral para especifico
            var categoriesInOrder = categories.reverse();
    
            // encontra informações do vendedor
            const seller = await User.findByPk(allItems[i].UserId); 
            
            itemsXMLformat += '\t<Item ItemID="'
            itemsXMLformat += allItems[i].id.toString()
            itemsXMLformat += '">\n'
            itemsXMLformat += "\t\t<Name>"
            itemsXMLformat += allItems[i].name
            itemsXMLformat += '</Name>\n'
            for (var jj=0;jj<categoriesInOrder.length;jj++){
                itemsXMLformat += "\t\t<Category>"
                itemsXMLformat += categoriesInOrder[jj]
                itemsXMLformat += "</Category>\n"
            }
            itemsXMLformat += "\t\t<Currently>$"
            itemsXMLformat += allItems[i].currently.toString()
            itemsXMLformat += '</Currently>\n'

            if (allItems[i].buy_price!=null){
                itemsXMLformat += "\t\t<Buy_Price>$"
                itemsXMLformat += allItems[i].buy_price.toString()
                itemsXMLformat += '</Buy_Price>\n'
            }

            itemsXMLformat += "\t\t<First_Bid>$"
            itemsXMLformat += allItems[i].first_bid.toString()
            itemsXMLformat += '</First_Bid>\n'
            itemsXMLformat += "\t\t<Number_of_Bids>"
            itemsXMLformat += allItems[i].number_of_bids.toString()
            itemsXMLformat += '</Number_of_Bids>\n'

            // encontra os lances nos itens
            const allBids = await Bid.findAll({ 
                where: { ItemId: allItems[i].id},
            });

            if (allBids.length==0){
                itemsXMLformat += '\t\t<Bids />\n'
            }
            else{
                itemsXMLformat += '\t\t<Bids>\n'
                for (var jj=0;jj<allBids.length;jj++){
                    const bidder = await User.findByPk(allBids[jj].UserId);
                    itemsXMLformat += "\t\t\t<Bid>\n"
                    itemsXMLformat += '\t\t\t\t<Bidder Rating="'
                    itemsXMLformat += bidder.bidderRating.toString()
                    itemsXMLformat += '" UserID="'
                    itemsXMLformat += bidder.username
                    itemsXMLformat += '">\n'
                    itemsXMLformat += '\t\t\t\t\t<Location>'
                    itemsXMLformat += bidder.location
                    itemsXMLformat += '</Location>\n'
                    itemsXMLformat += '\t\t\t\t\t<Country>'
                    itemsXMLformat += bidder.country
                    itemsXMLformat += '</Country>\n'
                    itemsXMLformat += '\t\t\t\t</Bidder>\n'
                    itemsXMLformat += '\t\t\t\t<Time>'
                    itemsXMLformat += allBids[jj].time.toLocaleString()
                    itemsXMLformat += '</Time>\n'
                    itemsXMLformat += '\t\t\t\t<Amount>$'
                    itemsXMLformat += allBids[jj].amount.toString()
                    itemsXMLformat += '</Amount>\n'
                    itemsXMLformat += "\t\t\t</Bid>\n"
                }
                itemsXMLformat += '\t\t</Bids>\n'
            }
            if (allItems[i].latitudeLongitude){
                itemsXMLformat += '\t\t<Location Latitude="'
                itemsXMLformat += allItems[i].latitudeLongitude.coordinates[0].toString()
                itemsXMLformat += '" Longitude="'
                itemsXMLformat += allItems[i].latitudeLongitude.coordinates[1].toString()
                itemsXMLformat += '">'
            }
            else{
                itemsXMLformat += "\t\t<Location>"
            }
            itemsXMLformat += allItems[i].location
            itemsXMLformat += '</Location>\n'
            itemsXMLformat += "\t\t<Country>"
            itemsXMLformat += allItems[i].country
            itemsXMLformat += '</Country>\n'
            itemsXMLformat += "\t\t<Started>"
            itemsXMLformat += allItems[i].started.toLocaleString()
            itemsXMLformat += '</Started>\n'
            itemsXMLformat += "\t\t<Ends>"
            itemsXMLformat += allItems[i].ends.toLocaleString()
            itemsXMLformat += '</Ends>\n'
            itemsXMLformat += '\t\t<Seller Rating="'
            itemsXMLformat += seller.sellerRating.toString()
            itemsXMLformat += '" UserID="'
            itemsXMLformat += seller.username
            itemsXMLformat += '" />\n'
            itemsXMLformat += "\t\t<Description>"
            itemsXMLformat += allItems[i].description
            itemsXMLformat += '</Description>\n'
            itemsXMLformat += "\t</Item>\n"
        }

        itemsXMLformat += "</Items>"
        res.json(itemsXMLformat);

    }
    else{
        res.json({message: "proibido"});
    }

});



router.get('/top/:id', async (req, res) => {

    const myId = req.params.id;
    const recommendations = await UserTop.findOne({ 
        where: { UserId: myId,},
    });

    var items = []

    if (recommendations!=null){

        const item1 = await Item.findByPk(recommendations.p1);
        // verifica se ainda está disponível 
        if (item1!=null && item1.state=="DISPONÍVEL" && item1.UserId!= myId){
            items.push(item1)
        }
        const item2 = await Item.findByPk(recommendations.p2);
        if (item2!=null && item2.state=="DISPONÍVEL" && item2.UserId!= myId){
            items.push(item2)
        }
        const item3 = await Item.findByPk(recommendations.p3);
        if (item3!=null && item3.state=="DISPONÍVEL" && item3.UserId!= myId){
            items.push(item3)
        }
        const item4 = await Item.findByPk(recommendations.p4);
        if (item4!=null && item4.state=="DISPONÍVEL" && item4.UserId!= myId){
            items.push(item4)
        }
        const item5 = await Item.findByPk(recommendations.p5);
        if (item5!=null && item5.state=="DISPONÍVEL" && item5.UserId!= myId){
            items.push(item5)
        }
        const item6 = await Item.findByPk(recommendations.p6);
        if (item6!=null && item6.state=="DISPONÍVEL" && item6.UserId!= myId){
            items.push(item6)
        }
        
    }

    res.json(items);

});

// importar o xmls do banco de dados
// comenta se o site está online
router.post('/importxmls', async (req, res) => {

    const parser = new xml2js.Parser();
    var path = require("path");

    // para fazer aos montes
    // for (var i=0;i<30;i++){
    //     await fs.readFile(path.join(__dirname, '..', 'ebayXMLs', `items-${i}.xml`), async (err, data)=>{
    //         await parser.parseString(data, async (err, result)=>{
    
    // um a um
    await fs.readFile(path.join(__dirname, '..', 'ebayXMLs', 'items-23.xml'), async (err, data)=>{
        await parser.parseString(data, async (err, result)=>{

            if (err){
                throw err;
            }

            for ( var p = 0 ; p < result.Items.Item.length ; p++ ){
                // console.log(result.Items.Item[p].Number_of_Bids[0]);

                const itemito = result.Items.Item[p];

                // Adiciona isso e os com zero mesmo que não estejam a venda
                // desde que tenham datas válidas
                if( parseInt(itemito.Number_of_Bids[0]) == 0 ){

                    const myCategories = itemito.Category;
                    var lastcategory = 171;
        
                    // Para cada um na árvore
                    for (var i=0; i< myCategories.length; i++){
                        
                        var cat = await Category.findOne( { where: { name: myCategories[i] } } );
        
                        if (cat==null){
                            const cat2 = await Category.create({
                                name: myCategories[i],
                                CategoryId: lastcategory,
                            }).catch(err => {
                                console.log(err);
                            });
        
                            // como a maioria das categorias na árvore
                            lastcategory = cat2.id;
                        }
                        else {
                            lastcategory = cat.id
                        }
                    }
        
                    const activeUsers = await User.findAll({ where: { approved: true, admin: false},
                    });
        
                    const pickUserId = activeUsers[Math.floor(Math.random() * activeUsers.length)].id;
        
                    var item = {
        
                        name: itemito.Name[0],
                        currently: parseFloat(itemito.Currently[0].substring(1)),
                        first_bid: parseFloat(itemito.First_Bid[0].substring(1)),
                        number_of_bids: parseInt(itemito.Number_of_Bids[0]),
                        country: itemito.Country[0],
                        started: new Date(),
                        ends: 'Dec-13-23 18:10:40',
                        description: itemito.Description[0],
                        state: 'AVAILABLE',
                        furthermostCategoryId: lastcategory,
                        UserId: pickUserId, 
                    }
        
                    if (itemito.Buy_Price){
                        item.buy_price= parseFloat(itemito.Buy_Price[0].substring(1))
                    }

                    if (itemito.Location[0]._){
                        item.location=itemito.Location[0]._

                        var point = { type: 'Point', coordinates: [itemito.Location[0].$.Latitude,itemito.Location[0].$.Longitude]};
                        item.latitudeLongitude=point
                    }
                    else{
                        item.location=itemito.Location[0];
                    }
        
                    await Item.create(item);

                }
                else{
                    const myCategories = itemito.Category;
                    var lastcategory = 171;
        
                    // Para cada categoria na árvore
                    for (var i=0; i< myCategories.length; i++){
                        
                        var cat = await Category.findOne( { where: { name: myCategories[i] } } );
        
                        if (cat==null){
                            const cat2 = await Category.create({
                                name: myCategories[i],
                                CategoryId: lastcategory,
                            }).catch(err => {
                                console.log(err);
                            });
        
                            lastcategory = cat2.id;
                        }
                        else {
                            lastcategory = cat.id
                        }
                    }
        
                    const activeUsers = await User.findAll({ where: { approved: true, admin: false},
                    });
        
                    const pickUserId = activeUsers[Math.floor(Math.random() * activeUsers.length)].id;
        
                    var item = {
        
                        name: itemito.Name[0],
                        currently: parseFloat(itemito.Currently[0].substring(1)),
                        first_bid: parseFloat(itemito.First_Bid[0].substring(1)),
                        number_of_bids: parseInt(itemito.Number_of_Bids[0]),
                        country: itemito.Country[0],
                        started: itemito.Started[0],
                        ends: itemito.Ends[0],
                        description: itemito.Description[0],
                        state: 'PURCHASED',
                        furthermostCategoryId: lastcategory,
                        UserId: pickUserId, 
                    }
        
                    if (itemito.Buy_Price){
                        item.buy_price= parseFloat(itemito.Buy_Price[0].substring(1))
                    }

                    if (itemito.Location[0]._){
                        item.location=itemito.Location[0]._

                        var point = { type: 'Point', coordinates: [itemito.Location[0].$.Latitude,itemito.Location[0].$.Longitude]};
                        item.latitudeLongitude=point
                    }
                    else{
                        item.location=itemito.Location[0];
                    }
        
                    const newItem = await Item.create(item);
        
        
                    for (i=0;i<parseInt(itemito.Number_of_Bids[0]);i++){
    
        
                        // dá um lance aleat´roio de um usuario para outro
                        const activeBuyers = await User.findAll({ 
                            where: {    approved: true, 
                                        admin: false, 
                                        id: {[Op.ne]: pickUserId,},
                            }
                        });
            
                        const pickBuyer = activeBuyers[Math.floor(Math.random() * activeBuyers.length)];
        
                        var bid = {
                            time: itemito.Bids[0].Bid[i].Time[0],
                            amount: parseFloat(itemito.Bids[0].Bid[i].Amount[0].substring(1)),
                            ItemId: newItem.id,
                        }
        
                        bid.bidderRating = pickBuyer.bidderRating;
                        bid.bidderName = pickBuyer.username;
                        bid.UserId = pickBuyer.id;
        
                        await Bid.create(bid);
        
                        //  atualiza o histórico
                        var userData = await UserData.findOne( 
                            { where: { 
                                        UserId: pickBuyer.id, 
                                        ItemId: newItem.id 
                            } 
                        });
        
                        if (userData==null){
                            await UserData.create({
                                rating: 5,
                                UserId: pickBuyer.id, 
                                ItemId: newItem.id 
                            });
                        }
        
                    }

                }
         
            }

        });

        res.json("Success");
    });

});


module.exports = router;