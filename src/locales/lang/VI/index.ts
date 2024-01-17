import { Conversation } from './conversation';
import { Friend } from './friend';
import { FriendRequest } from './friendRequest';
import { Login } from './login';
import { Mode } from './mode';
import { Search } from './search';
import { Setting } from './setting';
import { Sidebar } from './sidebar';
import { Signup } from './signup';

export const VI = {
  login: Login,
  signup: Signup,
  setting: Setting,
  conversation: Conversation,
  mode: Mode,
  sidebar: Sidebar,
  friend: Friend,
  friendRequest: FriendRequest,
  search: Search,
};
