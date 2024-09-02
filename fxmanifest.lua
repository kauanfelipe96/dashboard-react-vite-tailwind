fx_version 'cerulean'
games { "gta5" }

name 'Dashboard'
description 'Custom dashboard for RPRP'
author "DAMIGHTY"
description "React + Vite, TS"
version '1.0.0'

lua54 'yes'

ui_page 'ui/build/index.html'

client_script "client/**/*"
shared_scripts { '@ox_lib/init.lua', 'shared/**/*' }
server_scripts { '@oxmysql/lib/MySQL.lua', "server/**/*" }

files {
    'ui/build/*.html',
    'ui/build/**/*',
}

dependencies {
    'ox_lib',
}
