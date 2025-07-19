import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StatusCard from "@/components/molecules/StatusCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import applicationService from "@/services/api/applicationService";
import clientService from "@/services/api/clientService";

const ApplicationList = ({ limit = null }) => {
  const [applications, setApplications] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [applicationsData, clientsData] = await Promise.all([
        applicationService.getAll(),
        clientService.getAll()
      ]);
      
      setApplications(limit ? applicationsData.slice(0, limit) : applicationsData);
      setClients(clientsData);
    } catch (err) {
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [limit]);

  const getClientName = (clientId) => {
    const client = clients.find(c => c.Id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : "Unknown Client";
  };

  const handleViewApplication = (application) => {
    navigate(`/applications/${application.Id}`);
  };

  const handleNewApplication = () => {
    navigate("/applications/new");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (applications.length === 0) {
    return (
      <Empty
        type="applications"
        onAction={handleNewApplication}
      />
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {applications.map((application, index) => (
          <motion.div
            key={application.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatusCard
              title={`${application.visaType} Application`}
              status={application.status}
              priority={application.priority}
              completionPercentage={application.completionPercentage}
              client={getClientName(application.clientId)}
              stage={application.stage}
              onView={() => handleViewApplication(application)}
            />
          </motion.div>
        ))}
      </motion.div>

      {limit && applications.length === limit && (
        <motion.div
          className="text-center pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => navigate("/applications")}
            className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
          >
            View all applications →
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ApplicationList;