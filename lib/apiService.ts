class apiService {
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