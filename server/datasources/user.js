const { DataSource } = require("apollo-datasource")

class UserAPI extends DataSource {
    constructor({ store }) {
        super()
        this.store = store
    }

    initialize(config) {
        this.context = config.context
    }

    async getUsers() {
        const users = this.store.users
        console.log(users)
        return users
    }

    async getUser({email: emailArg}) {
        let index = 1;
        const email = this.context && this.context.user ?
            this.context.user.email : emailArg;
        
        const theUser = this.store.users.map(user => {
            if (email === user.email) {
                index = this.store.users.indexOf(user)
                console.log('user index:', user.id, index)
                return user
            }
        })

        return theUser[index]
    }
    async saveRecord({ recordId }) {
        const userId = this.context.user.id;
        console.log('context userId', userId)
        if(!userId) {
            console.log('No user on context')
        } else {
            console.log('User context:', userId)
        }

        const usercheck = this.store.users.map(user => {
            if(userId == user.id) {
                user.records.push({ id: recordId })
                return user
            }
        })

        let users = [];

        await usercheck.forEach(e => {
            if(e) {
                users.push(e)
            }
        })

        return users[0].records.length > 4 ? users[0].records : "Record length error"
    }
}

module.exports = UserAPI