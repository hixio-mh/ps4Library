const express = require('express');
const router = express.Router();
const Game = require('../models/game');

//Get all games
router.get('/', (req, res, next) => {
    Game.find((error, games) => {
            if(error) {
                return next(error);
            } else {
                res.render('index', {games: games});
            }
    }).sort({title: 1});
});

//


//Get one game
router.get('/game/:_id', (req, res, next) => {
    Game.findOne({_id: req.params._id}, (err, game) => {
        if(err) {
            return next(err);
        } else {
            res.render('game', {game: game, editMode: false});
        }
    })
});

//Add a New Game
router.post('/addgame', (req, res, next) => {
    if(req.body.title && 
       req.body.genre && 
       req.body.developer && 
       req.body.year && 
       req.body.multiplayer && 
       req.body.description && 
       req.body.imageUrl) {
        const gameData = {
            title: req.body.title,
            genre: req.body.genre,
            developer: req.body.developer,
            year: req.body.year,
            multiplayer: req.body.multiplayer,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };
        Game.create(gameData, (error, game) => {
            if(error) {
                return next(error);
            } else {
                return res.redirect('/');
            }
        })
    } else {
        const err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

//Edit and Update Route
router.post('/game/edit/:_id', (req, res, next) => {
        const updatedGameData = {
            title: req.body.title,
            genre: req.body.genre,
            developer: req.body.developer,
            year: req.body.year,
            multiplayer: req.body.multiplayer,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };
    Game.update({_id: req.params._id}, updatedGameData, (err, game) => {
        if(err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    })
});

//Delete Route
router.post('/delete/:_id', (req, res, next) => {
   Game.remove({_id: req.params._id}, (err, game) => {
       if(err) {
           return next(err);
       } else {
           res.redirect('/');
       }
   })
});

//Render Addgame View
router.get('/addgame', (req, res, next) => {
    res.render('addgame');
});



module.exports = router;