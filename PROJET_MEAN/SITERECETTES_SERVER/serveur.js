const express = require('express');
const _ = require('lodash');
const app     = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-type', 'application/json');
    next();
});

const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectId;
const url         = "mongodb://localhost:27017";

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    let db = client.db("SITERECETTES");
    app.get("/allRecettes", (req,res) => {
        console.log("/allRecettes");
        try {
            db.collection("recettes").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /recettes : " + e);
            res.end(JSON.stringify([]));
        }
    });
    app.get("/3randomRecettes", (req,res) => {
        console.log("/3randomRecettes");
        try {
            db.collection("recettes").find().toArray((err, documents) => {
                res.end(JSON.stringify(documents.slice(-3)));
            });
        } catch(e) {
            console.log("Erreur sur /recettes : " + e);
            res.end(JSON.stringify([]));
        }
    });
    app.get("/recettes/:keyword", (req,res) => {
        let keyword = req.params.keyword;
        console.log("/recettes/"+keyword);
        try {
            db.collection("recettes").find({ nom : { $regex : keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")} }).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /recettes/"+keyword+" : "+ e);
            res.end(JSON.stringify([]));
        }
        });
    app.get("/ingredients/:ingredient", (req,res) => {
	let ingredient = req.params.ingredient;
        console.log("/ingredients/"+ingredient);
        try {
            db.collection("recettes").find({ingredients:ingredient.toLowerCase()}).toArray((err, documents) => {
                res.end(JSON.stringify(documents));
            });
        } catch(e) {
            console.log("Erreur sur /recettes/"+ingredient+" : "+ e);
            res.end(JSON.stringify([]));
        }
    });
        app.get("/auteur/:auteur", (req,res) => {
            let auteur = req.params.auteur;
            console.log("/auteur/"+auteur);
            try {
                db.collection("recettes").find({ author : { $regex : auteur.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")} }).toArray((err, documents) => {
                    res.end(JSON.stringify(documents));
                });
            } catch(e) {
                console.log("Erreur sur /auteur/"+auteur+" : "+ e);
                res.end(JSON.stringify([]));
            }
            });

    /* Connexion */
    app.post("/user/connexion", (req,res) => {
        console.log("/utilisateurs/connexion avec "+JSON.stringify(req.body));
        try {
            db.collection("users")
            .find(req.body)
            .toArray((err, documents) => {
                if (documents.length == 1)
                    res.end(JSON.stringify({"resultat": documents[0].username, "message": "Authentification réussie"}));
                else res.end(JSON.stringify({"resultat": "", "message": "Email et/ou mot de passe incorrect"}));
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
    /*Inscription*/
    app.post("/user/inscription", (req,res) => {
        console.log("/utilisateurs/inscription avec "+JSON.stringify(req.body));
        try {
            db.collection("users")
            .find({email:req.body.email})
            .toArray((err, documents) => {
                if (documents.length == 1){
                    res.end(JSON.stringify({"resultat": 2, "message": "Compte déjà existant"}));
                }
                else 
                {   
                    db.collection("users").insertOne(req.body);
                    res.end(JSON.stringify({"resultat": 1, "message": "Inscription réussi !"}));
                }
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
    app.post("/recette/add", (req,res) => {
        console.log("ajout de la recette "+JSON.stringify(req.body));
        try {
            db.collection("recettes")
            .find()
            .toArray((err, documents) => {
                db.collection("recettes").insertOne(req.body);
                });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
    /*like*/
    app.post("/recette/liked", (req,res) => {
        console.log("like de la recette "+ req.body.id +" par l'utilisateur "+req.body.user);
        try {
            db.collection("recettes")
            .find({id:req.body.id})
            .toArray((err, documents) => {
                db.collection("recettes").updateOne(
                    {id:req.body.id},
                    {$push:{usersLiked:req.body.user}}
                );
            });
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
    /*Unlike*/
    app.post("/recette/unliked", (req,res) => {
        console.log("unlike de la recette "+ req.body.id +" par l'utilisateur "+req.body.user);
        try {
            db.collection("recettes")
            .find({id:req.body.id})
            .toArray((err, documents) => {
                db.collection("recettes").updateOne(
                    {id:req.body.id},
                    {$pull:{usersLiked:req.body.user}}
                );
            });
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
    /*Comment*/
    app.post("/recette/comment", (req,res) => {
        console.log("ajout du commentaire:"+ req.body.comment +" par l'utilisateur "+req.body.user +" sur la recette :" + req.body.id);
        try {
            db.collection("recettes")
            .find({id:req.body.id})
            .toArray((err, documents) => {
                db.collection("recettes").updateOne(
                    {id:req.body.id},
                    {$push:{comments:[req.body.user, req.body.comment]}}
                );
            });
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
});

app.listen(8888);
