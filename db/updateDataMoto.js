const mongoose = require('mongoose');
const Moto = require('./motoSchema');

async function updateDataMoto(data) {
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

        const result = await Moto.bulkWrite(operations);
        
        console.log(`✅ Обработано мотоциклов: ${data.length} | Новых мотоциклов: ${result.upsertedCount} | Обновлено мотоциклов: ${result.modifiedCount}`);
        
    } catch (error) {
        console.error('❌ Ошибка:', error);
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = { updateDataMoto };