import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressTracker from "@/components/molecules/ProgressTracker";
import ValidationDashboard from "@/components/organisms/ValidationDashboard";
import DocumentUpload from "@/components/molecules/DocumentUpload";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import applicationService from "@/services/api/applicationService";
import clientService from "@/services/api/clientService";
import documentService from "@/services/api/documentService";
import { toast } from "react-toastify";

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [client, setClient] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const loadApplicationData = async () => {
    try {
      setLoading(true);
      setError(null);

      const applicationData = await applicationService.getById(id);
      if (!applicationData) {
        setError("Application not found");
        return;
      }

      const [clientData, documentsData] = await Promise.all([
        clientService.getById(applicationData.clientId),
        documentService.getByApplicationId(id)
      ]);

      setApplication(applicationData);
      setClient(clientData);
      setDocuments(documentsData);
    } catch (err) {
      setError(err.message || "Failed to load application data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadApplicationData();
    }
  }, [id]);

  const handleStageAdvance = async () => {
    if (!application) return;

    try {
      const nextStage = application.stage + 1;
      if (nextStage > 6) {
        toast.info("Application is already at the final stage");
        return;
      }

      const updatedApplication = await applicationService.updateStage(id, nextStage);
      setApplication(updatedApplication);
      toast.success(`Advanced to Stage ${nextStage}`);
    } catch (err) {
      toast.error("Failed to advance stage");
    }
  };

  const handleDocumentUpload = async (documentData) => {
    try {
      const newDocument = await documentService.create({
        applicationId: parseInt(id),
        type: documentData.name.includes("passport") ? "Passport" : "Document",
        fileName: documentData.name,
        url: `/documents/${documentData.name}`,
        size: `${(documentData.size / 1024 / 1024).toFixed(1)} MB`
      });

      setDocuments(prev => [...prev, newDocument]);
      toast.success("Document uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload document");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadApplicationData} />;
  if (!application || !client) return <Error message="Application not found" />;

  const tabs = [
    { id: "overview", label: "Overview", icon: "Eye" },
    { id: "client-info", label: "Client Information", icon: "User" },
    { id: "documents", label: "Documents", icon: "FolderOpen" },
    { id: "validation", label: "Validation", icon: "Shield" },
    { id: "history", label: "History", icon: "Clock" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
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
              {application.visaType} Application
            </h1>
            <p className="text-gray-600">
              {client.firstName} {client.lastName} • Application #{application.Id}
            </p>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          <Badge
            variant={
              application.status === "Ready for Submission" ? "success" :
              application.status === "Agent Review" ? "warning" : "primary"
            }
          >
            {application.status}
          </Badge>
          <Button onClick={handleStageAdvance} disabled={application.stage >= 6}>
            <ApperIcon name="ArrowRight" className="w-4 h-4 mr-2" />
            {application.stage >= 6 ? "Complete" : "Next Stage"}
          </Button>
        </div>
      </motion.div>

      {/* Progress Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <ProgressTracker currentStage={application.stage} />
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="bg-white rounded-lg border border-gray-200 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Application Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Visa Type:</span>
                      <span className="font-medium">{application.visaType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Stage:</span>
                      <span className="font-medium">Stage {application.stage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <Badge variant={
                        application.priority === "Critical" ? "error" :
                        application.priority === "High" ? "warning" : "info"
                      }>
                        {application.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion:</span>
                      <span className="font-medium">{application.completionPercentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Client Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{client.firstName} {client.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{client.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nationality:</span>
                      <span className="font-medium">{client.nationality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passport:</span>
                      <span className="font-medium">{client.passportNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "client-info" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Client Information Form</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="First Name" value={client.firstName} readOnly />
                <Input label="Last Name" value={client.lastName} readOnly />
                <Input label="Email" value={client.email} readOnly />
                <Input label="Phone" value={client.phone} readOnly />
                <Input label="Passport Number" value={client.passportNumber} readOnly />
                <Input label="Nationality" value={client.nationality} readOnly />
                <Input label="Date of Birth" value={client.dateOfBirth} readOnly />
                <Input label="Occupation" value={client.occupation} readOnly />
              </div>
            </motion.div>
          )}

          {activeTab === "documents" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                <span className="text-sm text-gray-600">
                  {documents.length} document{documents.length !== 1 ? "s" : ""} uploaded
                </span>
              </div>

              <DocumentUpload onUpload={handleDocumentUpload} />

              {documents.length > 0 && (
                <div className="space-y-3">
                  {documents.map((document) => (
                    <div
                      key={document.Id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <ApperIcon name="FileText" className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{document.fileName}</p>
                          <p className="text-sm text-gray-600">{document.type} • {document.size}</p>
                        </div>
                      </div>
                      <Badge variant={
                        document.status === "Verified" ? "success" : "warning"
                      }>
                        {document.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "validation" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ValidationDashboard applicationId={id} />
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Application History</h3>
              <div className="space-y-4">
                {[
                  { date: "2024-01-21", action: "Application created", user: "John Agent" },
                  { date: "2024-01-20", action: "Documents uploaded", user: "Sarah Chen" },
                  { date: "2024-01-19", action: "Validation completed", user: "System" },
                  { date: "2024-01-18", action: "Stage advanced", user: "John Agent" }
                ].map((event, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <ApperIcon name="Clock" className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.action}</p>
                      <p className="text-sm text-gray-600">by {event.user} on {event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ApplicationDetail;