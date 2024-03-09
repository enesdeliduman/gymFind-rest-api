const Gym=require("../../models/Gym")

function generateRandomName() {
    const prefixes = ['Fit', 'Active', 'Power', 'Energy', 'Wellness'];
    const suffixes = ['Gym', 'Fitness', 'Center', 'Club', 'Training'];

    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return randomPrefix + ' ' + randomSuffix;
}

// Rastgele e-posta oluşturma fonksiyonu
function generateRandomEmail(name) {
    const providers = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const randomProvider = providers[Math.floor(Math.random() * providers.length)];

    return name.toLowerCase().replace(' ', '') + '@' + randomProvider;
}

// Rastgele şifre oluşturma fonksiyonu
function generateRandomPassword() {
    const length = 6;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

// Rastgele adres oluşturma fonksiyonu
function generateRandomAddress() {
    const cities = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'];
    const districts = ['Kadikoy', 'Besiktas', 'Uskudar', 'Beyoglu', 'Sisli'];
    const neighborhoods = ['Atasehir', 'Levent', 'Bebek', 'Kizilay', 'Bornova'];

    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    const randomNeighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];

    return {
        city: randomCity,
        district: randomDistrict,
        neighbourhood: randomNeighborhood
    };
}

// Spor salonu oluşturma fonksiyonu
async function generateGym() {
    const name = generateRandomName();
    const email = generateRandomEmail(name);
    const password = generateRandomPassword();
    const address = generateRandomAddress();

    await Gym.create({
        name:name,
        email:email,
        password:password,
        address:address
    })

    return {
        name: name,
        email: email,
        password: password,
        address: address
    };
}

// Belirtilen sayıda spor salonu oluşturma fonksiyonu
function generateGyms(count) {
    const gyms = [];
    for (let i = 0; i < count; i++) {
        gyms.push(generateGym());
    }
    return gyms;
}

module.exports = generateGyms;
