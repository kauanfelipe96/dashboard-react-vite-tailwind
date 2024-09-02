RegisterNetEvent('rp_dyno:server:registercars',function(cars)

    for k,v in pairs(cars) do

        MySQL.Async.insert('INSERT INTO get_cars (model,class,acc,traction,topspeed,brakes,notafinal) VALUES (?,?,?,?,?,?,?)', {
            v.model,
            v.class,
            v.acc,
            v.traction,
            v.topspeed,
            v.brakes,
            v.notafinal
        })
    end

end)

lib.addCommand('infocar', {
    help = 'Pegar dados do carro',
    params = {
    },
    restricted = 'group.admin'
}, function(source, args, raw)
    TriggerClientEvent('rp_dyno:client:plotcar',source)
end)

lib.callback.register('rp_dyno:server:carinfos', function(source,plate)
    print('teste'..plate)
    carserver = exports['persistent-vehicle']:GetVehicle(plate)
    return carserver
end)

RegisterNetEvent('rp_dyno:server:registercar',function(car)
    CarRegister:RegisterCar(car)
end)


lib.addCommand('infocar', {
    help = 'Pegar dados do carro',
    params = {
    },
}, function(source, args, raw)
    TriggerClientEvent('rp_dyno:client:teste',source)
end)


lib.addCommand('dashboard', {
    help = 'teste',
    params = {
    },
}, function(source, args, raw)
    TriggerClientEvent('rp_dyno:client:gambiarra',source)
end)