module.exports = {
    servers: {
        one: {
            host: "13.92.131.114",
            username: "mupx",
            password: "@Binhminh2"
        }
    },

    meteor: {
        name: 'tubechat2',
        path: '/D/Projects/xxx/tubechat2',
        servers: {
            one: {
                host: "13.92.131.114",
                username: "mupx",
                password: "@Binhminh2"
            }
        },
        env: {
            PORT: 80,
            ROOT_URL: "http://tubechat.xyz",
            MONGO_URL : "mongodb://gnocxn:123456978@ds028679.mlab.com:28679/tubechat"
        },
        deployCheckWaitTime: 70 //default 10
    }
};