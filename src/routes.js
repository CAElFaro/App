import HomePage from './pages/home.vue';
import RankingPage from './pages/ranking.vue';
import AboutPage from './pages/about.vue';
import FormPage from './pages/form.vue';
import MembersPage from './pages/members.vue';
import MemberPage from './pages/member.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/ranking/',
    component: RankingPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/members/',
    component: MembersPage,
  },
  {
    path: '/member/:memberId/',
    component: MemberPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
