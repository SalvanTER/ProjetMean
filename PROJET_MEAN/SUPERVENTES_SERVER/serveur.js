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
    /* Liste des produits */
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
                res.end(JSON.stringify(_.sampleSize(documents, 3)));
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
            console.log(keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
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
    app.get("/prix/:prix", (req,res) => {
        let prix = req.params.prix;
            console.log("/prix/"+prix);
            try {
                db.collection("recettes").find({cout : parseInt(prix) }).toArray((err, documents) => {
                    res.end(JSON.stringify(documents));
                });
            } catch(e) {
                console.log("Erreur sur /recettes/"+prix+" : "+ e);
                res.end(JSON.stringify([]));
            }
        });
    /* Liste des catégories de produits */
    app.get("/categories", (req,res) => {
        console.log("/categories");
	categories = [];
        try {
            db.collection("produits").find().toArray((err, documents) => {
		for (let doc of documents) {
                    if (!categories.includes(doc.type)) categories.push(doc.type); 
		}
		console.log("Renvoi de"+JSON.stringify(categories));
                res.end(JSON.stringify(categories));
            });
        } catch(e) {
            console.log("Erreur sur /categories : " + e);
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
                    res.end(JSON.stringify({"resultat": 1, "message": "Authentification réussie"}));
                else res.end(JSON.stringify({"resultat": 0, "message": "Email et/ou mot de passe incorrect"}));
            });
        } catch (e) {
            res.end(JSON.stringify({"resultat": 0, "message": e}));
        }
    });
});

app.listen(8888);
