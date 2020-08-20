import TodoService from '../../domain/Todo/TodoService'

export default{
    actions: {
        GET_LAST_TODOS ({commit}, {quant, userId, resource, path}){
            return new Promise((resolve, reject) => {
                let payload = {
                    cmt: commit,
                    quant: quant,
                    userId: userId,
                    resource: resource,
                    path: path
                }
                let service = new TodoService(payload.resource, payload.path);
                service.dashList(payload.quant, payload.userId).then((response) => {
                    resolve(response);
                }, err => reject(err));
            })
        }
    }
}