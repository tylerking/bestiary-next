class apiService {
  static async GetCreature(state: string) {
    const res = await fetch(`./api/creature/${state}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return await res.json()
  }
  static async GetCreatures() {
    const res = await fetch('./api/creatures', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return await res.json()
  }
}

export default apiService