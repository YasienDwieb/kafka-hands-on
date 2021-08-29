const { Kafka } = require('kafkajs')

run()

async function run() {
    try {
        const kafka = new Kafka({
            brokers: ["localhost:9092"]
        })
        const producer = kafka.producer()
        console.log('Conntecting...')
        await producer.connect()
        console.log('Conntected...')

        const msg = process.argv[2]
        const partition = msg[0] < 'N' ? 0 : 1

        const result = await producer.send({
            topic: "Users",
            messages: [{
                value: msg,
                partition,
            }]
        })

        console.log(`Message sent ${JSON.stringify(result)}`)
        await producer.disconnect();
        console.log('Disconntected...')
    } catch (error) {
        console.log(error)
    } finally {
        process.exit(0)
    }
}