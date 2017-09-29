const ordersServices = {

  async changeOrderStatus(id, status) {
    console.log(id,status)
    const data = { id: id, status: status };
    const response = await fetch('http://192.168.0.28:4000/api/v1/employees/orders/status', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return await response.json();
  }

}

export default ordersServices;
