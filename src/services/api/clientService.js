import clientsData from "../mockData/clients.json";

let clients = [...clientsData];

const clientService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...clients];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return clients.find(client => client.Id === parseInt(id));
  },

  create: async (clientData) => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const newId = Math.max(...clients.map(c => c.Id)) + 1;
    const newClient = {
      Id: newId,
      ...clientData
    };
    clients.push(newClient);
    return newClient;
  },

  update: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = clients.findIndex(client => client.Id === parseInt(id));
    if (index !== -1) {
      clients[index] = { ...clients[index], ...updates };
      return clients[index];
    }
    throw new Error("Client not found");
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = clients.findIndex(client => client.Id === parseInt(id));
    if (index !== -1) {
      const deleted = clients.splice(index, 1);
      return deleted[0];
    }
    throw new Error("Client not found");
  }
};

export default clientService;