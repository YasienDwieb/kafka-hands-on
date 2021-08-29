const { Kafka } = require('kafkajs')

run()

async function run() {
    try {
        const kafka = new Kafka({
            brokers: ["localhost:9092"]
        })
        const admin = kafka.admin()

        console.log('Conntecting...')
        await admin.connect()
        console.log('Conntected...')

        admin.createTopics({
            topics: [{
                topic: "Users",
                numPartitions: 2
            }],
            waitForLeaders: true
        })

        await admin.disconnect()
        console.log('Disconntected...')
    } catch (error) {
        console.log(error)
    } finally {
        process.exit(0)
    }
}