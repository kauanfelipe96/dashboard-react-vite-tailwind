local showingDashboard = false

local function showDashboard(source, data)
    TriggerClientEvent('dashboard:show', source, data)
    showingDashboard = true
end

local function hideDashboard(source)
    TriggerClientEvent('dashboard:hide', source)
    showingDashboard = false
end

RegisterNetEvent('dashboard:show')
AddEventHandler('dashboard:show', function (data)
    local _source = source
    showDashboard(_source, data)
end)

RegisterNetEvent('dashboard:hide')
AddEventHandler('dashboard:hide', function ()
    local _source = source
    hideDashboard(_source)
end)

RegisterCommand('showDashboard', function(source, args, rawCommand)
    local data = {
        model = "Comet",
        class = "A+",
        plate = "AHV-4169",
        velocity = 91,
        acceleration = 85,
        traction = 82,
        brakes = 90,
        score = 89,
        newClass = "S"
    }

    showDashboard(source, data)
end, false)

RegisterCommand('hideDashboard', function(source, args, rawCommand)
    hideDashboard(source)
end, false)