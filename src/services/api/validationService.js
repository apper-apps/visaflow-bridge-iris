import validationData from "../mockData/validationResults.json";

let validationResults = [...validationData];

const validationService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...validationResults];
  },

  getByApplicationId: async (applicationId) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return validationResults.filter(result => result.applicationId === parseInt(applicationId));
  },

  runValidation: async (applicationId) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate validation results
    const mockResults = [
      {
        Id: Date.now(),
        applicationId: parseInt(applicationId),
        field: "document_completeness",
        status: "pass",
        message: "All required documents uploaded",
        severity: "info",
        category: "Document Verification"
      },
      {
        Id: Date.now() + 1,
        applicationId: parseInt(applicationId),
        field: "eligibility_check",
        status: "pass",
        message: "Meets visa eligibility criteria",
        severity: "info",
        category: "Eligibility"
      }
    ];

    validationResults = validationResults.filter(r => r.applicationId !== parseInt(applicationId));
    validationResults.push(...mockResults);
    
    return mockResults;
  },

  getValidationSummary: async (applicationId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const results = validationResults.filter(r => r.applicationId === parseInt(applicationId));
    
    const summary = {
      total: results.length,
      passed: results.filter(r => r.status === "pass").length,
      warnings: results.filter(r => r.status === "warning").length,
      failed: results.filter(r => r.status === "fail").length,
      overallStatus: results.some(r => r.status === "fail") ? "fail" : 
                    results.some(r => r.status === "warning") ? "warning" : "pass"
    };

    return summary;
  }
};

export default validationService;