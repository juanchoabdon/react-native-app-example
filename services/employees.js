const services = {

  async login(email) {
    const data = { email: email };
    const response = await fetch('http://192.168.0.28:4000/api/v1/employees/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return await response.json();
  },

  async getNewOrders(id) {
    const response = await fetch(`http://192.168.0.28:4000/api/v1/employees/orders/new/${id}`);
    return await response.json();
  },

  async getActiveOrders(id) {
    const response = await fetch(`http://192.168.0.28:4000/api/v1/employees/orders/active/${id}`);
    return await response.json();
  },

  async getFinishedOrders(id) {
    const response = await fetch(`http://192.168.0.28:4000/api/v1/employees/orders/finished/${id}`);
    return await response.json();
  }

}

export default services;
