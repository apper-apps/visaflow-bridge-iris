import applicationsData from "../mockData/applications.json";

let applications = [...applicationsData];

const applicationService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...applications];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return applications.find(app => app.Id === parseInt(id));
  },

  create: async (applicationData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...applications.map(a => a.Id)) + 1;
    const newApplication = {
      Id: newId,
      ...applicationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stage: 1,
      status: "Visa Selection",
      completionPercentage: 0
    };
    applications.push(newApplication);
    return newApplication;
  },

  update: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = applications.findIndex(app => app.Id === parseInt(id));
    if (index !== -1) {
      applications[index] = {
        ...applications[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return applications[index];
    }
    throw new Error("Application not found");
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = applications.findIndex(app => app.Id === parseInt(id));
    if (index !== -1) {
      const deleted = applications.splice(index, 1);
      return deleted[0];
    }
    throw new Error("Application not found");
  },

  updateStage: async (id, stage) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const stageNames = {
      1: "Visa Selection",
      2: "Information Collection", 
      3: "Validation",
      4: "Document Generation",
      5: "Agent Review",
      6: "Ready for Submission"
    };
    
    return applicationService.update(id, {
      stage,
      status: stageNames[stage],
      completionPercentage: Math.min(stage * 16.67, 100)
    });
  }
};

export default applicationService;