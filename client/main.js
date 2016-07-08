import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';

import {name as home} from '../imports/ui/components/home/home';

/**
 * Ready Function
 */
function onReady() {
  angular.bootstrap(document, [
    home
  ], {
    strictDi: true
  });
}
/**
 * Cordova configuration
 */
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
