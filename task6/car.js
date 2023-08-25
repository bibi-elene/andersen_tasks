class Car {
    #brand;
    #model;
    #yearOfManufacturing;
    #maxSpeed;
    #maxFuelVolume;
    #fuelConsumption;
    #currentFuelVolume = 0;
    #isStarted = false;
    #mileage = 0;

    #validateString(value, minLength, maxLength, error) {
        if (typeof value !== 'string' || value.length < minLength || value.length > maxLength) {
            throw new Error(`${error}`);
        }
    }

    #validateNumber(value, minAmount, maxAmount, error) {
        if (!Number.isInteger(value) || value < minAmount || value > maxAmount) {
            throw new Error(`${error}`);
        }
    }

    get brand() {
        return this.#brand;
    }

    set brand(value) {
        this.#validateString(value, 1, 50, 'Неверная строка');
        this.#brand = value;
    }

    get model() {
        return this.#model;
    }

    set model(value) {
        this.#validateString(value, 1, 50, 'Неверная строка');
        this.#model = value;
    }

    get yearOfManufacturing() {
        return this.#yearOfManufacturing;
    }

    set yearOfManufacturing(value) {
        this.#validateNumber(value, 1900, new Date().getFullYear(), 'Неверная дата');
        this.#yearOfManufacturing = value;
    }

    get maxSpeed() {
        return this.#maxSpeed;
    }

    set maxSpeed(value) {
        this.#validateNumber(value, 100, 299, 'Неверное число');
        this.#maxSpeed = value;
    }

    get maxFuelVolume() {
        return this.#maxFuelVolume;
    }

    set maxFuelVolume(value) {
        this.#validateNumber(value, 5, 19, 'Неверное число');
        this.#maxFuelVolume = value;
    }

    get fuelConsumption() {
        return this.#fuelConsumption;
    }

    set fuelConsumption(value) {
        this.#validateNumber(value, 0, 100, 'Неверное число');
        this.#fuelConsumption = value;
    }

    get currentFuelVolume() {
        return this.#currentFuelVolume;
    }

    get isStarted() {
        return this.#isStarted;
    }

    get mileage() {
        return this.#mileage;
    }

    start() {
        if (this.#isStarted) {
            throw new Error('Машина уже заведена');
        }

        this.#isStarted = true;
    }

    shutDownEngine() {
        if (!this.#isStarted) {
            throw new Error('Машина ещё не заведена');
        }

        this.#isStarted = false;
    }

    fillUpGasTank(fuelLiters) {
        if (!Number.isInteger(fuelLiters) || fuelLiters < 1) {
            throw new Error('Неверное количество топлива для заправки');
        }

        if (this.#currentFuelVolume + fuelLiters > this.#maxFuelVolume) {
            throw new Error('Топливный бак переполнен');
        }

        this.#currentFuelVolume += fuelLiters;
    }

    drive(speed, hours) {
        const distance = speed * hours;
        const fuelRequired = (distance / 100) * this.#fuelConsumption;

        if (!Number.isInteger(speed) || speed <= 0) {
            throw new Error('Неверная скорость');
        }

        if (!Number.isInteger(hours) || hours <= 0) {
            throw new Error('Неверное количество часов');
        }

        if (speed > this.#maxSpeed) {
            throw new Error('Машина не может ехать так быстро');
        }

        if (!this.#isStarted) {
            throw new Error('Машина должна быть заведена, чтобы ехать');
        }

        if (fuelRequired > this.#currentFuelVolume) {
            throw new Error('Недостаточно топлива');
        }

        this.#currentFuelVolume -= fuelRequired;
        this.#mileage += distance;
    }
}

module.exports = { Car };

