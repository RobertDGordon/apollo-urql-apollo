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

    async getAllOrgs() {
        // console.log('getAllRepos')
        const query = `orgs`
        const res = JSON.parse(await this.get(query));
        // console.log('query response:', res.data)
        return Array.isArray(res.data)
            ? 
                // console.log('****response.data:', orgsArray)
                res.data.map(org => this.orgsReducer(org))
            
            : [];  //return empty array if not
    }

    async getAllRepos( {orgId: orgArg} ) {
        // console.log('repos')
        console.log(orgArg)
        const query = `orgs/${orgArg}/repos`
        const res = JSON.parse(await this.get(query))
        console.log(res)
    }

    orgsReducer(org){

        return {
            id: org.id,
            name: org.attributes.name,
            repocount: org.meta.counts.repos,
        }
    }
}

module.exports = CodeClimateAPI;