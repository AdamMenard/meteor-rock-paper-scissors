Template.gamesList.helpers({
    userId: function() {
        return Meteor.userId();
    },

    games: function() {
        return Games.find({"is.public": true, "is.completed": false, "is.playing": false}, {sort: {createdAt: -1}});
    },
    gamesCount: function() {
        return Games.find({"is.public": true, "is.completed": false, "is.playing": false}, {sort: {createdAt: -1}}).count();
    },

    gamesFinished: function() {
        return Games.find({"is.public": true, "is.completed": true}, {sort: {createdAt: -1}, limit : 5});
    },
    gamesFinishedCount: function() {
        return Games.find({"is.public": true, "is.completed": true}, {sort: {createdAt: -1}, limit : 5}).count();
    },

    gamesPlaying: function() {
        return Games.find({"is.public": true, "is.playing": true}, {sort: {createdAt: -1}, limit : 5});
    },
    gamesPlayingCount: function() {
        return Games.find({"is.public": true, "is.playing": true}, {sort: {createdAt: -1}, limit : 5}).count();
    }
});

Template.gamesList.events({
    'submit #game-create': function(event, template) {
        template.$('#game-create-submit').attr('disabled', 'disabled');

        var gameTitle = template.$('#form-create-title').val();
        var gameIsPublic = template.$('#form-create-public').is(':checked');
        var gameBestOf = parseInt(template.$('.form-create-bestof:checked').val());

        Meteor.call('gameInsert', gameTitle, gameBestOf, gameIsPublic, function(error, response) {
            console.log('gameInsert');
            if(!error) {
                Router.go('play', {gameId: response});
            } else {
                alert(error.reason);
            }
            template.$('#game-create-submit').removeAttr('disabled');
        });

        event.preventDefault();
    }
});