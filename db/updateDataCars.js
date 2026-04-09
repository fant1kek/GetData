const mongoose = require('mongoose');
const Car = require('./carSchema');

async function updateDataCars(data) {
    if (!data || data.length === 0) return console.log('Нет данных');

    try {
        await mongoose.connect(process.env.MONGODB);

        const operations = data.map(item => ({
            updateOne: {
                filter: { id: item.id },
                update: { 
                    $set: { 
                        ...item, 
                        lastSeen: new Date() 
                    } 
                },
                upsert: true
            }
        }));

        const result = await Car.bulkWrite(operations);
        
        console.log(`✅ Обработано машин: ${data.length} | Новых машин: ${result.upsertedCount} | Обновлено машин: ${result.modifiedCount}`);
        
    } catch (error) {
        console.error('❌ Ошибка:', error);
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = { updateDataCars };