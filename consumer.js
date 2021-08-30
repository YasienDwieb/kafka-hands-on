const { Kafka } = require('kafkajs')

run()

async function run() {
    try {
        const kafka = new Kafka({
            brokers: ["localhost:9092"]
        })
        const consumer = kafka.consumer({
            groupId: "test"
        })
        console.log('Conntecting...')
        await consumer.connect()
        console.log('Conntected...')

        await consumer.subscribe({
            topic: "Users",
            fromBeginning: true
        })

        consumer.run({
            eachMessage: async (result) => {
                console.log(`Received message: ${result.message.value}, at parition ${result.partition}`)
            }
        })
    } catch (error) {
        console.log(error)
    }
}