module.exports = {
    apps: [
        {
            name: 'shop-frontend',
            port: '3000',
            exec_mode: 'cluster',
            wait_ready: true,
            instances: '2',
            script: './.output/server/index.mjs'
        }
    ]
}
