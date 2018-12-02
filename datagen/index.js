const fs = require('fs')

let airportLatLng = JSON.parse(fs.readFileSync('airportLatLng.json'))
let cities = JSON.parse(fs.readFileSync('cities.json'))
let airports = cities.Airports
let routes = fs.readFileSync('routes.txt').toString()
  .split('\n').map(line => line.trim().split(',')).filter((_, i) => i > 0)

let output = {routes: [], airports: {}}

for (let [ap1, ap2, ap3, isMint, isSeasonal] of routes) {
  if (ap2 == '0') ap2 = null;
  output.routes.push({ap1, ap2, ap3, isMint: isMint == '1', isSeasonal: isSeasonal == '1'})
}
for (let airportCode in airports) {
  airports[airportCode].Location = airportLatLng[airportCode]
  output.airports[airportCode] = airports[airportCode]
}

fs.writeFileSync('jetBlueData.js', 'const jetBlueData = ' + JSON.stringify(output))