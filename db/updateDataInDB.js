const mongoose = require('mongoose');
const Car = require('./carSchema');

async function updateDataInDB(data) {
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
        
        console.log(`✅ Обработано: ${data.length} | Новых: ${result.upsertedCount} | Обновлено: ${result.modifiedCount}`);
        
    } catch (error) {
        console.error('❌ Ошибка:', error);
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = { updateDataInDB };