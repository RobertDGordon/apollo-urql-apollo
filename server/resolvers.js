const { paginateResults } = require('./utils')

const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        users: (_, __, { dataSources }) =>
            dataSources.userAPI.getUsers(),
        orgs: (_, __, { dataSources }) =>
            dataSources.codeclimateAPI.getAllOrgs(),
        repos: (_, { orgId }, { dataSources }) =>
            dataSources.codeclimateAPI.getAllRepos({ orgId }),
        project: (_, { projectId, snapshotId }, { dataSources }) =>
            dataSources.codeclimateAPI.getProject({ projectId, snapshotId }),
        me: (_, __, { dataSources }) =>
            dataSources.userAPI.findOrCreateUser()
    },
    Mutation: {
        login: async (_, { email }, { dataSources }) => {
            const user = await dataSources.userAPI.getUser({ email });
            if (user) {
                const token = jwt.sign({ id: user.ud, email: user.email }, 'secret', { expiresIn: 60 * 60})
                return token
            } 
            if (!user) {
                console.log('User not found!')
            }
        },
        saveRecord: async (_, { recordId }, { dataSources }) => {
            console.log('save record', recordId)
            const results = await dataSources.userAPI.saveRecord({ recordId })

            return {
                success: results.length ? true : false,
                message: results.length ? "data save success" : "data fail",
                records: results
            }
        }
    }
}