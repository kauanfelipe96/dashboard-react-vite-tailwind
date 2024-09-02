
local zone_dyno = {}
RegisterNetEvent('rp_dyno:client:furniture', function(entity)
        local coordsfurniture = GetEntityCoords(entity)
        local heading = GetEntityHeading(entity)
        local inzone = false
        function inside(self)

            if IsControlJustReleased(0, 58) then
                TriggerEvent('rp_dyno:client:plotcar')
            end
        end
        
        function onEnter(self)
            inzone = true
            lib.showTextUI('[G] - Usar o Dyno')
        end

        function onExit(self)
            inzone = false
            lib.hideTextUI()
        end
        
        zone_dyno = lib.zones.sphere({
            coords = coordsfurniture,
            radius = 2,
            debug = true,
            inside = inside,
            onEnter = onEnter,
            onExit = onExit
        })

end)

RegisterNetEvent('rp_dyno:client:destroyzone', function()
    zone_dyno:remove()
    zone_dyno = {}
end)

RegisterNetEvent('rp_dyno:client:plotcar',function(table)
    
    local veh = GetVehiclePedIsIn(PlayerPedId(), false)
    local plate = GetVehicleNumberPlateText(veh)
    local mycar = lib.callback.await('rp_dyno:server:carinfos',false,plate)

    if mycar ~= nil then
        Wait(1000)
        local balance = Config.Balance        
        local acc = GetVehicleAcceleration(veh)
        local trac = GetVehicleMaxTraction(veh)
        local vel = GetVehicleEstimatedMaxSpeed(veh)
        local brakes = GetVehicleMaxBraking(veh) 
        
        local pointacc = (acc - Config.minnotes.acc)/(Config.maxnotes.acc-Config.minnotes.acc)*100
        if pointacc <= Config.minnotes.acc then
            pointacc = 0
        end
        local pointtrac = (trac - Config.minnotes.trac)/(Config.maxnotes.trac-Config.minnotes.trac)*100
        if pointtrac <= Config.minnotes.trac then
            pointtrac = 0
        end
        local pointvel = (vel - Config.minnotes.vel)/(Config.maxnotes.vel-Config.minnotes.vel)*100
        if pointvel <= Config.minnotes.vel then
            pointvel = 0
        end

        local pointbrakes = (brakes - Config.minnotes.brakes)/(Config.maxnotes.brakes-Config.minnotes.brakes)*100
        if pointbrakes <= Config.minnotes.brakes then
            pointbrakes = 0
        end

        local notafinal = math.floor(pointacc*balance.acc + pointtrac*balance.trac + pointvel*balance.vel + pointbrakes*balance.brakes)


        ----------------------------------
        ----------------------------------
        ----------------------------------  RANQUEAMENTO
        ----------------------------------
        ----------------------------------

        local requisito = Config.pontos

        local classe = {
            pointacc = pointacc,
            pointtrac = pointtrac,
            pointvel = pointvel,
            pointbrakes = pointbrakes,
            notafinal = notafinal,
        }

        for k,v in pairs(classe) do
            if v >= requisito.X then
                classe[k] = "X"
            elseif v >= requisito.S then
                classe[k] = "S"
            elseif v >= requisito.Aplus then
                classe[k] = "A+"
            elseif v >= requisito.Bplus then
                classe[k] = "B+"
            elseif v >= requisito.B then
                classe[k] = "B"
            elseif v >= requisito.Cplus then
                classe[k] = "C+"
            elseif v >= requisito.C then
                classe[k] = "C"
            elseif v >= requisito.Dplus then
                classe[k] = "D+"
            elseif v <= requisito.Dplus then
                classe[k] = "D"
            end
        end
        ---------------------------------------
        ---------------------------------------
        --------------------------------------- INFOCAR/CALLBACK
        ---------------------------------------
        ---------------------------------------

        setarposicao(classe,mycar.model,notafinal,plate)
    else
        lib.notify({
            title = "Não pode ser avaliado",
            description = 'Não é um carro permanente',
            type = "error",
        })
    end
end)

function setarposicao(classe,model,notafinal,plate)
    lib.hideTextUI()
    local veh = GetVehiclePedIsIn(PlayerPedId(), false)

    FreezeEntityPosition(veh,true)
    --SetEntityCollision(veh,false,true)
    --Config.timedyno
    TaskVehicleTempAction(PlayerPedId(),veh,31,1000)
    Wait(1000)
    FreezeEntityPosition(veh,false)
    print(classe['pointacc'])
    
    local graph = {
        time0 = 0,
        time5 = math.floor(0.05*notafinal),
        time10 = math.floor(0.15*notafinal),
        time15 = math.floor(0.5*notafinal),
        time20 = math.floor(0.85*notafinal),
        time25 = math.floor(0.95*notafinal),
        time30 = notafinal
    }

    local data = {
        model = model,
        plate = plate,
        acceleration = classe['pointacc'],
        traction = classe['pointtrac'],
        brakes = classe['pointbrakes'],
        velocity = classe['pointvel'],
        class = classe['notafinal'],
        score = notafinal,
        graph = graph,
    }


    --[[local old_result = lib.callback.await('rp_dyno:server:requestresult',false,plate)
    local old_nota=old_result.notafinal
    if data2 ~= nil then
        data2 = {
            time5 = math.floor(0.05*old_nota),
            time10 = math.floor(0.15*old_nota),
            time15 = math.floor(0.5*old_nota),
            time20 = math.floor(0.85*old_nota),
            time25 = math.floor(0.95*old_nota),
            time30 = old_nota
        }
    else
        data2 = {
            time5 = 0,
            time10 = 0,
            time15 = 0,
            time20 = 0,
            time25 = 0,
            time30 = 0
        }
    end]]
    
    print(json.encode(data))


    ------------------- prov

    TriggerServerEvent('rp_dyno:server:registercar',data)
end

RegisterNetEvent('rp_dyno:client:gambiarra',function()
    SendNuiMessage(json.encode({
        action = "dashboard:show",
        data = true
      }))
    
      SetNuiFocus(true, true)
end)

RegisterNuiCallback('dashboard:hide',function(_,cb)
    SetNuiFocus(false, false)
    SendNuiMessage(json.encode({
        action = "dashboard:show",
        data = false
      }))
    return cb()
end)