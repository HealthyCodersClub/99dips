import { name as ClubDetails } from '../clubDetails';
import { Clubs } from '../../../../api/clubs';
import 'angular-mocks';

describe('ClubDetails', () => {
  beforeEach(() => {
    window.module(ClubDetails);
  });

  describe('controller', () => {
    let controller;
    const club = {
      _id: 'clubId',
      name: 'Foo',
      description: 'Birthday of Foo'
    };

    beforeEach(() => {
      inject(($rootScope, $componentController) => {
        controller = $componentController(ClubDetails, {
          $scope: $rootScope.$new(true)
        });
      });
    });

    describe('save()', () => {
      beforeEach(() => {
        spyOn(Clubs, 'update');
        controller.club = club;
        controller.save();
      });

      it('should update a proper club', () => {
        expect(Clubs.update.calls.mostRecent().args[0]).toEqual({
          _id: club._id
        });
      });

      it('should update with proper modifier', () => {
        expect(Clubs.update.calls.mostRecent().args[1]).toEqual({
          $set: {
            name: club.name,
            description: club.description
          }
        });
      });
    });
  });
});
