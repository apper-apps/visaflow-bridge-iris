import documentsData from "../mockData/documents.json";

let documents = [...documentsData];

const documentService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...documents];
  },

  getByApplicationId: async (applicationId) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return documents.filter(doc => doc.applicationId === parseInt(applicationId));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return documents.find(doc => doc.Id === parseInt(id));
  },

  create: async (documentData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...documents.map(d => d.Id)) + 1;
    const newDocument = {
      Id: newId,
      ...documentData,
      uploadedAt: new Date().toISOString(),
      status: "Pending Review"
    };
    documents.push(newDocument);
    return newDocument;
  },

  update: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = documents.findIndex(doc => doc.Id === parseInt(id));
    if (index !== -1) {
      documents[index] = { ...documents[index], ...updates };
      return documents[index];
    }
    throw new Error("Document not found");
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = documents.findIndex(doc => doc.Id === parseInt(id));
    if (index !== -1) {
      const deleted = documents.splice(index, 1);
      return deleted[0];
    }
    throw new Error("Document not found");
  }
};

export default documentService;