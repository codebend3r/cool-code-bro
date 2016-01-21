(function () {

  'use strict';

  angular.module('cool-code')

    .directive('coolCode', function ($filter) {

      return {
        restrict: 'AE',
        replace: true,
        scope: {
          src: '=',
          collapse: '='
        },
        template: '<div></div>',
        link: function ($scope, $element) {

          var isCollapsed;

          var headerMarkup = '<h3 class="source-title">View Source</h3>';

          /**
           * closes up markup
           */
          var showClosedMarkup = function () {

            isCollapsed = true;

            // add the header markup if it does not exist
            if ($element.find('h3').length === 0) {
              $element.prepend(headerMarkup);
            }

            $element.addClass('collapse-code');
            $element.addClass('pretty-code-container');

            $($element).find('.source-title').one('click', showOpenMarkup);

          };

          /**
           * @description opens up markup
           */
          var showOpenMarkup = function () {

            isCollapsed = false;
            $element.removeClass('collapse-code');

            // if pre tag does not exist then append
            if ($element.find('pre').length === 0) {
              $element.append('<pre class="pretty-code"></pre>');
              $element.find('pre').append(jsString);
            }

            $($element).find('.source-title').one('click', showClosedMarkup);

          };

          /**
           * @description makes the code pretty
           * @param code {string} - source code as a string
           * @returns {string}
           */
          var stylizeCode = function (code) {

            return code
              .replace(/('|")(.*?)('|")/g, function (str) {
                return '<span class=\'js-string\'>' + str + '</span>';
              })
              .replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/gm, function (str) {
                return '<span class=\'js-comment-block\'>' + str + '</span>';
              })
              //.replace(/(=)/g, function (str) {
              //  //var equalsMarkup = '<span class="js-equals">' + str + '</span>';
              //  var equalsMarkup = '<span class="js-comment-block">' + str + '</span>';
              //  console.log('str', str);
              //  console.log('equalsMarkup', equalsMarkup);
              //  //return '==';
              //  //return str;
              //  return equalsMarkup;
              //})
              .replace(/(true|false)/g, function (str) {
                return '<span class=\'js-boolean\'>' + str + '</span>';
              })
              .replace(/\d/g, function (str) {
                return '<span class=\'js-number\'>' + str + '</span>';
              })
              .replace(/\bfunction\b/g, function (str) {
                return '<span class=\'js-function\'>' + str + '</span>';
              })
              .replace(/(:)/g, function (str) {
                return '<span class=\'js-colon\'>' + str + '</span>';
              })
              .replace(/(\.)(\w+)/g, function (str) {
                return '.<span class=\'js-variable-name\'>' + str.slice(1, str.length) + '</span>';
              })
              //.replace(/\b=\b/g, function (str) {
              //  return '<span class=\'js-equals\'>' + str + '</span>';
              //})
              .replace(/\breturn\b/g, function (str) {
                return '<span class=\'js-return\'>' + str + '</span>';
              })
              .replace(/\bvar\b/g, function (str) {
                return '<span class=\'js-var-name\'>' + str + '</span>';
              });

          };

          var getPropertyByRegex = function (obj, propName) {
            var re = new RegExp('^' + propName + '(\\[\\d*\\])?$'),
              key;
            for (key in obj)
              if (re.test(key))
                return obj[key];
            return null; // put your default "not found" return value here
          };

          var jsString = '';

          _.each($scope.src, function (prop, key) {

            var cleanLines = '',
              cleanProp;

            if (typeof prop === 'object') {

              var cleanedProp = $filter('json')(prop)
                .replace(/(")(.*?)(":)/g, function (str) {
                  return str.replace(/"/g, '');
                });

              jsString += key + ': ' + cleanedProp;

            } else if (typeof prop === 'function') {

              _.each(prop.toString().split('\n'), function (line) {
                cleanLines += line.replace(/      /, '') + '\n';
              });

              cleanProp = cleanLines;
              jsString += key + ': ' + cleanProp;

            }

          });

          jsString = stylizeCode(jsString);

          if ($scope.collapse) {

            isCollapsed = true;
            showClosedMarkup();

          } else {

            isCollapsed = false;
            showOpenMarkup();

          }

        }
      };

    });

})();
