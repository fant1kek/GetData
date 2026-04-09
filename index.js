const { getData } = require('./getData');
const { updateDataCars } = require('./db/updateDataCars');
const { updateDataMoto } = require('./db/updateDataMoto');

async function getNewCarsAndMoto() {
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
            await updateDataCars(data);
        } else {
            console.log("Новых объявлений не найдено или API вернул пустой результат");
        }
    } catch (error) {
        console.error("Ошибка в основном цикле:", error);
    }

    try {
        const ads = await getData(process.env.MOTOAPI);
        
        if (ads && ads.adverts && ads.adverts.length > 0) {
            const adverts = ads.adverts;

            const data = adverts.map(advert => {
                const props = advert.properties || [];
                const getVal = (name) => props.find(p => p.name === name)?.value;

                return {
                    id: advert.id,
                    url: advert.publicUrl,
                    brandId: advert.metadata?.brandId,
                    brandName: getVal("brand"),
                    modelId: advert.metadata?.modelId,
                    modelName: getVal("model"),
                    year: advert.year,
                    city: advert.locationName,
                    price: advert.price?.usd?.amount,
                    engineType: getVal("engine_type"),
                    engineCapacity: getVal("engine_capacity"),
                };
            });
            await updateDataMoto(data);
        } else {
            console.log("Новых объявлений не найдено или API вернул пустой результат");
        }
    } catch (error) {
        console.error("Ошибка в основном цикле:", error);
    }
}

getNewCarsAndMoto();