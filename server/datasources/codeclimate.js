const { RESTDataSource } = require('apollo-datasource-rest');

class CodeClimateAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.codeclimate.com/v1/'
        this.token = 'Token token=9971e333783ecbea443e229705ca4e94d27a08e0'
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.token);
      }

    async getAllRepos() {
        console.log('getAllRepos')
        const token = '9971e333783ecbea443e229705ca4e94d27a08e0'
        const query = `user`
        const res = await this.get(query, {headers: {Authorization: `Token token=${token}`}});
        console.log(res)
        return Array.isArray(res.data)
            ? 
                console.log('response:', res.data)
                // res.map(repo => this.codeclimateReducer(repo));
            
            : [];  //return empty array if not
    }

    codeclimateReducer(repo){
        console.log('ccReducer', repo)

        //extrapoloate "repo" into other variables

        return {
            //return "repo"
        }
    }
}

module.exports = CodeClimateAPI;