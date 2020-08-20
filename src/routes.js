import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Dashboard/Home';
import Todo from './components/Dashboard/Todo';
import AboutApp from './components/Dashboard/AboutApp'

export const routes = [
    {path: '', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/dashboard/', component: Dashboard, children: [
        {path: 'home',name: 'Home', icon:'home', component: Home, meta: {transitionName: 'slide'}},
        {path: 'todo', component: Todo, name:"Tarefas", icon: 'view_list', meta: {transitionName: 'slide'}},
        {path: 'about_app', component: AboutApp, name:"Sobre o App", icon: 'error', meta: {transitionName: 'slide'}},
    ]},
    
];