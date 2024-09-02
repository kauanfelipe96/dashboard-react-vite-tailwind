DB = {}

DB.getAllCarRegister = function()
    return MySQL.query.await('SELECT * FROM `vehicle_dynamo`')
end

DB.createCarRegister = function(car)
    return MySQL.insert.await(
        'INSERT INTO `vehicle_dynamo` (plate, model, acceleration, traction, brakes, velocity, class) VALUES (@plate, @model, @acceleration, @traction, @brakes, @velocity, @class)',
        {
            plate = car.plate,
            model = car.model,
            acceleration = car.acceleration,
            traction = car.traction,
            brakes = car.brakes,
            velocity = car.velocity,
            class = car.class
        })
end

DB.updateCarRegister  = function(car)
    return MySQL.update.await(
        'UPDATE `vehicle_dynamo` SET acceleration = @acceleration, model = @model, traction = @traction,brakes = @brakes,velocity = @velocity,class = @class WHERE plate = @plate',
        {
            plate = car.plate,
            model = car.model,
            acceleration = car.acceleration,
            traction = car.traction,
            brakes = car.brakes,
            velocity = car.velocity,
            class = car.class
        })
end

DB.deleteCarRegister = function(plate)
    return MySQL.update.await(
        'DELETE FROM `vehicle_dynamo` WHERE plate = @plate',
        {
            plate = plate
        })
end