import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { name as _99dips } from '../imports/ui/components/99dips/99dips';

angular.element(document).ready(function() {
  angular.bootstrap(document, [_99dips]);
});