import User from '../../domain/Auth/User/User';
import UserService from '../../domain/Auth/User/UserService';
import TokenService from '../../domain/Auth/TokenService';
import jwt_decode from 'jwt-decode';

export default{
    state: {
        user: new User(),
    },
    getters: {
        USER: state => {
            return state.user
        }
    },
    mutations: {
        SET_USER: (state, {user}) => {
            state.user = user
        }
    },
    actions: {
        REGISTER: ({ commit }, { user, resource, path }) => {
            return new Promise((resolve, reject) => {
                let payload = {
                    cmt: commit,
                    user: user,
                    resource: resource,
                    path: path
                }
                console.log(payload.user);
                let service = new UserService(payload.resource, payload.path);
                service.register(payload.user).then((response) => {
                    resolve(response);
                }, err => reject(err));
            });
        },

        LOGIN: ({ commit }, { user, resource, path }) => {
            return new Promise((resolve, reject) => {
                let payload = {
                    cmt: commit,
                    user: user,
                    resource: resource,
                    path: path
                }
                let service = new TokenService(payload.resource, payload.path);
                service.getToken(payload.user).then((response) => {
                    resolve(response);
                }, err => reject(err));
            });
        },

        REFRESH_TOKEN: ({commit}, {resource, path, token}) => {
            let decode = jwt_decode(token);
            return new Promise((resolve, reject) => {
                let payload = {
                    cmt: commit,
                    resource: resource,
                    path: path,
                    token: token,
                    userId: decode.user_id
                }
                let service = new TokenService(payload.resource, payload.path);
                service.checkToken(payload.token, payload.userId).then((response) => {
                    resolve(response);
                }, err => reject(err));
            });
        },

        RENEW_USER: ({commit}, {resource, token, path}) => {
            let decode = jwt_decode(token);
            return new Promise((resolve, reject) => {
                let payload = {
                    cmt: commit,
                    resource: resource,
                    path: path,
                    token: token,
                    userId: decode.user_id
                }
                let service = new UserService(payload.resource, payload.path);
                service.getUser(payload.userId).then((response) => {
                    resolve(response);
                }, err => reject(err));
            });
        },

        INNACTIVE: ({ commit }, { user, resource, path }) => {
            return new Promise((resolve, reject) => {
                let payload = {
                    cmt: commit,
                    user: user,
                    resource: resource,
                    path: path
                }
                payload.user.status = false
                let service = new UserService(payload.resource, payload.path);
                service.update(payload.user).then((response) => {
                    resolve(response);
                }, err => reject(err));
            });
        }
    }
}