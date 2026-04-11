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
                    $setOnInsert: { 
                        ...item, 
                        createdAt: new Date() 
                    } 
                },
                upsert: true
            }
        }));
        const result = await Car.bulkWrite(operations, { ordered: false });
        console.log(`✅ Обработано: ${data.length} | Добавлено новых: ${result.upsertedCount} | Проигнорировано (уже были): ${data.length - result.upsertedCount}`);
    } catch (error) {
        console.error('❌ Ошибка:', error);
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = { updateDataCars };