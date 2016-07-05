import { name as ClubRemove } from '../clubRemove';
import { Clubs } from '../../../../api/clubs';
import 'angular-mocks';

describe('ClubRemove', () => {
  beforeEach(() => {
    window.module(ClubRemove);
  });

  describe('controller', () => {
    let controller;
    const club = {
      _id: 'clubId'
    };

    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(ClubRemove, {
          $scope: $rootScope.$new(true)
        }, {
          club
        });
      });
    });

    describe('remove()', () => {
      beforeEach(() => {
        spyOn(Clubs, 'remove');
        controller.remove();
      });

      it('should remove a club', () => {
        expect(Clubs.remove).toHaveBeenCalledWith(club._id);
      });
    });
  });
});
