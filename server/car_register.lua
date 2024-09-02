CarRegister = {
    car = {}
}

function CarRegister:RegisterCar(car)
    if self.car[car.plate] == nil then
        self.car[car.plate] = {
            plate = car.plate,
            model = car.model,
            acceleration = car.acceleration,
            traction = car.traction,
            brakes = car.brakes,
            velocity = car.velocity,
            class = car.class,
        }
        return DB.createCarRegister(self.car[car.plate])
    else
        return CarRegister:updateCarRegister(car)
    end
end

function CarRegister:updateCarRegister(car)
    self.car[car.plate] = {
        plate = car.plate,
        model = car.model,
        acceleration = car.acceleration,
        traction = car.traction,
        brakes = car.brakes,
        velocity = car.velocity,
        class = car.class
    }
    return DB.updateCarRegister(self.car[car.plate])
end

function CarRegister:Add(car)
    self.car[car.plate] = {
        plate = car.plate,
        model = car.model,
        acceleration = car.acceleration,
        traction = car.traction,
        brakes = car.brakes,
        velocity = car.velocity,
        class = car.class
    }
end

function CarRegister:Delete(plate)
    if self.car[plate].plate then
        return DB.deleteCarRegister(plate)
    end
end
