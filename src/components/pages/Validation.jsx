import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ValidationDashboard from "@/components/organisms/ValidationDashboard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import applicationService from "@/services/api/applicationService";
import { toast } from "react-toastify";

const Validation = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const applicationsData = await applicationService.getAll();
      setApplications(applicationsData);
      
      if (applicationsData.length > 0 && !selectedApplication) {
        setSelectedApplication(applicationsData[0]);
      }
    } catch (err) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleBulkValidation = async () => {
    toast.info("Bulk validation feature would be implemented here");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadApplications} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Validation Center
          </h1>
          <p className="text-gray-600">
            Run validation checks on visa applications
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={handleBulkValidation}>
            <ApperIcon name="Shield" className="w-4 h-4 mr-2" />
            Bulk Validation
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Application Selector */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Select Application</h3>
            <div className="space-y-2">
              {applications.map((app) => (
                <button
                  key={app.Id}
                  onClick={() => setSelectedApplication(app)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    selectedApplication?.Id === app.Id
                      ? "bg-primary/10 border border-primary/20 text-primary"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {app.visaType} #{app.Id}
                  </div>
                  <div className="text-xs text-gray-600">
                    Stage {app.stage} • {app.status}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Validation Dashboard */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {selectedApplication ? (
            <ValidationDashboard applicationId={selectedApplication.Id} />
          ) : (
            <Card className="p-12 text-center">
              <ApperIcon name="Shield" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select an Application
              </h3>
              <p className="text-gray-600">
                Choose an application from the list to view validation results
              </p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Validation;