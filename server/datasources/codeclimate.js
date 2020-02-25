const { RESTDataSource } = require('apollo-datasource-rest');

class CodeClimateAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.codeclimate.com/v1/'
        this.token = 'Token token=a8bd69e0e7cafd98a0581184ae71ffbf13b53cd8'
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.token);
    }

    async getAllRepos() {
        // console.log('getAllRepos')
        const query = `user`
        const res = JSON.parse(await this.get(query));
        console.log('query response:', res.data)
        return (res.length)
            ? 
                console.log('****response.data:', res.data)
                // res.map(repo => this.codeclimateReducer(repo))
            
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