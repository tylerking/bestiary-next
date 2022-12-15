class apiService {
  static async GetCreatures() {
    const res = await fetch('https://bestiary-next.netlify.app/api/creatures', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-control-allow-orgigin': '*'
      }
    })
    return await res.json()
  }
}

export default apiService