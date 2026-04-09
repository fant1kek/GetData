const { getData } = require('./getData');
const { updateDataInDB } = require('./db/updateDataInDB');

async function getNewCars() {
    try {
        const ads = await getData(process.env.CARSAPI);
        
        if (ads && ads.adverts && ads.adverts.length > 0) {
            const adverts = ads.adverts;

            const data = adverts.map(advert => {
                const props = advert.properties || [];
                const getVal = (name) => props.find(p => p.name === name)?.value;
                return {
                    id: advert.id,
                    url: advert.publicUrl,
                    brandId: advert.metadata?.brandId,
                    brandName: advert.metadata?.brandSlug,
                    modelId: advert.metadata?.modelId,
                    modelName: advert.metadata?.modelSlug,
                    generationId: advert.metadata?.generationId,
                    generationName: getVal("generation"),
                    year: advert.metadata?.year,
                    city: advert.locationName,
                    price: advert.price?.usd?.amount,
                    engineType: getVal("engine_type"),
                    engineCapacity: getVal("engine_capacity"),
                    transmission: getVal("transmission_type")
                };
            });
            await updateDataInDB(data);
        } else {
            console.log("Новых объявлений не найдено или API вернул пустой результат");
        }
    } catch (error) {
        console.error("Ошибка в основном цикле:", error);
    }
}

getNewCars();