const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        users: [User]
        me: User
        orgs: [Org]
        repos (orgId: ID!): [Repo]
        project (projectId: ID!, snapshotId: ID!): Project
        }
        """
        Simple wrapper around our list of quakes that contains a cursor to the
        last item in the list. Pass this cursor to the quakes query to fetch results
        after these.
        """
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        records: [Repo]
    }

    type Org {
        id: ID!
        name: String
        repocount: Int
    }
    
    type Repo{
        id: ID
        name: String
        orgId: String
        snapshotId: String
    }

    type Project{
        id: ID
        name: String
        grade: String
    }

    type Mutation {
        #if false, saving recorded failed
        saveRecord(recordId: ID!): RecordUpdateResponse!

        #if false, deleting record failed
        deleteRecord(recordId: ID!): RecordUpdateResponse!

        login(email: String): String #login token
    }

    type RecordUpdateResponse {
        success: Boolean!
        messsage: String
        records: [Repo]
    }
`;

module.exports = typeDefs;