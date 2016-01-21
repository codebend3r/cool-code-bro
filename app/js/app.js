(function () {

  'use strict';

  angular.module('cool-code-module', ['cool-code']);

  angular.module('cool-code-module')

    .controller('appCtrl', function ($scope) {

      console.log('appCtrl');

      $scope.code1 = {
        test: function (a, b) {
          return a + b;
        }
      };

      $scope.code2 = {
        computePoints: function (dataObj, game, index) {

          var points;
          var player = dataObj.player;
          var manager = dataObj.manager;

          if (textManipulator.acceptedLeague(game.leagueSlug)) {

            points = scoringLogic.calculatePoints(game.goals, game.leagueSlug, game.datePlayed);

            if (textManipulator.isDomesticLeague(game.leagueSlug)) {

              // is in domestic league
              player.domesticGoals += game.goals;
              if (!angular.isUndefinedOrNull(manager)) manager.domesticGoals += game.goals;

            } else if (textManipulator.isChampionsLeague(game.leagueSlug)) {

              // is in champions league
              player.clGoals += game.goals;
              if (!angular.isUndefinedOrNull(manager)) manager.clGoals += game.goals;

            } else if (textManipulator.isEuropaLeague(game.leagueSlug)) {

              // is in europa league
              player.eGoals += game.goals;
              if (!angular.isUndefinedOrNull(manager)) manager.eGoals += game.goals;

            }

            // increment goals for each player
            player.goals += game.goals;

            // increment goals for the manager
            if (!angular.isUndefinedOrNull(manager)) manager.totalGoals += game.goals;

            // increment points
            player.points += points;

            // manager total points
            if (!angular.isUndefinedOrNull(manager)) manager.totalPoints += points;

          }

          player.assists += game.assists;

          if (!angular.isUndefinedOrNull(manager)) {
            manager.chartData.push({
              points: manager.totalPoints,
              goals: manager.totalGoals,
              stepPoints: points,
              stepGoals: game.goals,
              date: game.datePlayed
            });
          }

          return game;

        }
      };

    });

})();
