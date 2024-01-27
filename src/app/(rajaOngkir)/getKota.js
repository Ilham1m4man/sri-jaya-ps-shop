"use server"

const ongkirKey = "dcf83bdb23dbca4fee029d4a06b5e572"

const getKota = async () => {

  var options = {
    method: 'GET',
    url: 'https://api.rajaongkir.com/starter/city',
    headers: { key: ongkirKey }
  };
  const dataKota = await fetch(options.url, {
    method: options.method,
    headers: options.headers,
  }).then((res) => res.json().then((datanya) => { return datanya }))
  
  return dataKota
}

export default getKota