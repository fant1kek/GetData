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
                    $setOnInsert: { 
                        ...item, 
                        firstSeen: new Date() 
                    } 
                },
                upsert: true
            }
        }));
        const result = await Moto.bulkWrite(operations, { ordered: false });
        console.log(`✅ Обработано: ${data.length} | Добавлено новых: ${result.upsertedCount} | Проигнорировано (уже были): ${data.length - result.upsertedCount}`);
    } catch (error) {
        console.error('❌ Ошибка:', error);
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = { updateDataMoto };