export default class UserService{
    constructor(resource, path){
        this._resource = resource(path);
    }

    login(user){
        return this._resource.save(user)
            .then(res => res.json());
    }

    register(user){
        user.status = true;
        return this._resource.save(user);
    }

    getUser(id){
        return this._resource.get({ id })
                .then(res => res.json());
    }

    update(user){
        return this._resource.update({ id: user.id }, user);
    }
}