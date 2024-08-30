local showingDashboard = false

local function showDashboard(data)
    lib.hideTextUI()

    local info = {
        model =  data.model,
        class =  data.class,
        plate =  data.plate,
        velocity =  data.velocity,
        acceleration =  data.acceleration,
        traction =  data.traction,
        brakes =  data.brakes,
        score =  data.score,
        newClass =  data.newClass
    }

    SendNuiMessage(josn.encode({
        action = "dashboard:setVisible",
        data = true
    }))

    SetNuiFocus(true, true)

    SendNuiMessage (
        json.encode({
            action = "dashboard:setDashboradData",
            data = nil
        })
    )

    showingDashboard = true
end

local function hideDashboard()
    SendNuiMessage(
        json.encode({
            action = "dashboard:setDashboradData",
            data = nil
        })
    )

    SendNuiMessage(json.encode({
        action = "dashboard:setVisible",
        data = false
    }))

    SetNuiFocus(false, false)
    showingDashboard = false
    lib.hideTextUI()
end

RegisterNUICallback('hideDashboard', function(data, cb)
    TriggerServerEvent('dashboard:hide')
    cb('ok')
end)