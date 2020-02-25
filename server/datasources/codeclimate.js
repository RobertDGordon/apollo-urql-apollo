const { RESTDataSource } = require('apollo-datasource-rest');

class CodeClimateAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.codeclimate.com/v1/'
    }

    async getAllRepos() {
        const query = `orgs/${org.id}/repos`
        const res = await this.get(query, {headers: {Authorization: `Token token=${org.token}`}});
        return Array.isArray(res.data.data)
            ? res.map(repo => this.codeclimateReducer(repo))
            : [];  //return empty array if not
    }

    codeclimateReducer(repo){

        //extrapoloate "repo" into other variables

        return {
            //return "repo"
        }
    }
}

module.exports = CodeClimateAPI;