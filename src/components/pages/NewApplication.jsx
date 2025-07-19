import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import applicationService from "@/services/api/applicationService";
import clientService from "@/services/api/clientService";
import { toast } from "react-toastify";

const NewApplication = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Client Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passportNumber: "",
    nationality: "",
    dateOfBirth: "",
    occupation: "",
    // Application Information
    visaType: "",
    priority: "Normal",
    notes: ""
  });

  const visaTypes = [
    "Tourist Visa",
    "Business Visa", 
    "Student Visa",
    "Work Visa",
    "Family Visa",
    "Transit Visa"
  ];

  const priorities = [
    { value: "Normal", label: "Normal" },
    { value: "High", label: "High" },
    { value: "Critical", label: "Critical" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = [
      'firstName', 'lastName', 'email', 'phone', 'passportNumber', 
      'nationality', 'dateOfBirth', 'occupation', 'visaType'
    ];
    
    for (const field of required) {
      if (!formData[field]?.trim()) {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);

      // First create client
      const clientData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        passportNumber: formData.passportNumber,
        nationality: formData.nationality,
        dateOfBirth: formData.dateOfBirth,
        occupation: formData.occupation
      };

      const newClient = await clientService.create(clientData);

      // Then create application
      const applicationData = {
        clientId: newClient.Id,
        visaType: formData.visaType,
        priority: formData.priority,
        notes: formData.notes
      };

      const newApplication = await applicationService.create(applicationData);

      toast.success("Application created successfully!");
      navigate(`/applications/${newApplication.Id}`);
    } catch (error) {
      console.error("Error creating application:", error);
      toast.error("Failed to create application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/applications")}
            className="p-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              New Visa Application
            </h1>
            <p className="text-gray-600">
              Create a new visa application for a client
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Client Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="User" className="w-5 h-5 mr-2" />
                Client Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name *"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  required
                />
                <Input
                  label="Last Name *"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  required
                />
                <Input
                  label="Email *"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
                <Input
                  label="Phone *"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
                <Input
                  label="Passport Number *"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                  placeholder="Enter passport number"
                  required
                />
                <Input
                  label="Nationality *"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="Enter nationality"
                  required
                />
                <Input
                  label="Date of Birth *"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
                <Input
                  label="Occupation *"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  placeholder="Enter occupation"
                  required
                />
              </div>
            </div>

            {/* Application Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ApperIcon name="FileText" className="w-5 h-5 mr-2" />
                Application Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visa Type *
                  </label>
                  <select
                    value={formData.visaType}
                    onChange={(e) => handleInputChange('visaType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    required
                  >
                    <option value="">Select visa type</option>
                    {visaTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes or requirements..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/applications")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[140px]"
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                    Create Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default NewApplication;