import angular from 'angular';
 
import _ from 'underscore';

const name = 'invitedFilter';
 
function InvitedFilter(users, club) {
  if (!club) {
    return false;
  }
 
  return users.filter((user) => {
    // if not the owner and not invited
    return user._id == club.owner || _.contains(club.invited, user._id);
  });
}
 
// create a module
export default angular.module(name, [])
  .filter(name, () => {
    return InvitedFilter;
  });