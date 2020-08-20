export default class TokenService{
    constructor(resource, path){
        this._resource = resource(path);
    }

    checkToken(token, id){
        let payload = {
            token: token,
            id: id
        }
        return this._resource.save(payload)
            .then(res => res.json());
    }

    getToken(user){
        return this._resource.save(user)
            .then(res => res.json());
    }
    
}