"use server"

const ongkirKey = "dcf83bdb23dbca4fee029d4a06b5e572"

const getOngkir = async ({ origin, destination, weight }) => {
  const url = 'https://api.rajaongkir.com/starter/cost'
  
  var options = {
    method: 'POST',
    headers: { key: ongkirKey, 'content-type': 'application/x-www-form-urlencoded' },
    body: `origin=${origin}&destination=${destination}&weight=${weight}&courier=jne`
  };
  const dataOngkir = await fetch(url, options).then((res) => res.json().then((datanya) => { return datanya }))
  
  return dataOngkir
}

export default getOngkir