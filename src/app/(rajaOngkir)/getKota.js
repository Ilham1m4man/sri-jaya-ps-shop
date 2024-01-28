"use server"

const ongkirKey = "dcf83bdb23dbca4fee029d4a06b5e572"

const getKota = async () => {
const url = 'https://api.rajaongkir.com/starter/city'
  var options = {
    method: 'GET',
    headers: { key: ongkirKey }
  };
  const dataKota = await fetch(url, options).then((res) => res.json().then((datanya) => { return datanya }))
  
  return dataKota
}

export default getKota