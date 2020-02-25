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
        // console.log(res)
        return Array.isArray(res.data)
        ? 
            // console.log('****response.data:', orgsArray)
            res.data.map(repo => this.repoReducer(repo))
        
        : [];  //return empty array if not
    }

    async getProject( {projectId: projectArg, snapshotId: snapshotArg} ) {
        // console.log('repos')
        console.log('Project', projectArg, 'snapshot', snapshotArg)
        const query = `repos/${projectArg}/snapshots/${snapshotArg}`
        const res = JSON.parse(await this.get(query))
        // console.log(res)
        return (res.data)
        ? 
            // console.log('****response.data:', orgsArray)
            this.projectReducer(res.data)
        
        : [];  //return empty array if not
    }

    orgsReducer(org){

        return {
            id: org.id,
            name: org.attributes.name,
            repocount: org.meta.counts.repos,
        }
    }

    repoReducer(repo){
        // console.log(repo)
        return {
            id: repo.id,
            name: repo.attributes.human_name,
            orgId: repo.relationships.account.data.id,
            snapshotId: repo.relationships.latest_default_branch_snapshot.data.id
        }
    }
    
    projectReducer(project){
        console.log(project)
        return {
            id: project.id,
            name: 'Name of project here',
            grade: project.attributes.ratings.length ? project.attributes.ratings[0].letter : 'This is not the grade you are looking for'
        }
    }
}

module.exports = CodeClimateAPI;