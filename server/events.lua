AddEventHandler('onResourceStart', function(resourceName)
    if resourceName ~= GetCurrentResourceName() then return end

    Wait(100)

    local car_register = DB.getAllCarRegister()

    for _, v in ipairs(car_register) do
        CarRegister:Add(v.plate, v.acceleration, v.traction, v.brakes, v.velocity, v.class)
    end
end)

