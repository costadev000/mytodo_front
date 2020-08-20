export default class TokenService{
    constructor(resource, path){
        this._resource = resource(path);
    }

    dashList(quant, userId){
        let payload = {
            user_id: userId,
            quant: quant
        }

        return this._resource.get(payload)
                .then(res => res.json());
    }
    
}