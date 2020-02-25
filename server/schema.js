const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
            quakes( # replace the current quakes query with this one.
            """
            The number of results to show. Must be >= 1. Default = 20
            """
            pageSize: Int
            """
            If you add a cursor here, it will only return results _after_ this cursor
            """
            after: String
        ): QuakeConnection!
        quake(id: ID!): Quake
        users: [User]
        me: User
        orgs: [Org]
        repos (orgId: ID!): [Repo]
        }
        """
        Simple wrapper around our list of quakes that contains a cursor to the
        last item in the list. Pass this cursor to the quakes query to fetch results
        after these.
        """
    type QuakeConnection { # add this below the Query type as an additional type.
        cursor: String!
        hasMore: Boolean!
        quakes: [Quake]!
        }

    type Quake {
        id: ID!
        location: String
        magnitude: Float
        when: String
        cursor: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        records: [Quake]
    }

    type Org {
        id: ID!
        name: String
        repocount: Int
    }
    
    type Repo{
        id: ID
        name: String
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
        records: [Quake]
    }
`;

module.exports = typeDefs;