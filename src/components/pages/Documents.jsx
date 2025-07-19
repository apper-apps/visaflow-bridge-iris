import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DocumentUpload from "@/components/molecules/DocumentUpload";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import documentService from "@/services/api/documentService";
import { toast } from "react-toastify";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const documentsData = await documentService.getAll();
      setDocuments(documentsData);
    } catch (err) {
      setError(err.message || "Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDocumentUpload = async (documentData) => {
    try {
      const newDocument = await documentService.create({
        applicationId: 1, // Default for demo
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

  const filteredDocuments = documents.filter(doc => {
    if (filter === "all") return true;
    return doc.status.toLowerCase() === filter;
  });

  const getDocumentIcon = (type) => {
    switch (type.toLowerCase()) {
      case "passport":
        return "CreditCard";
      case "employment contract":
        return "FileText";
      case "skills assessment":
        return "Award";
      case "qualifications":
        return "GraduationCap";
      default:
        return "FileText";
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDocuments} />;

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
            Documents
          </h1>
          <p className="text-gray-600">
            Manage application documents and uploads
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {documents.length} document{documents.length !== 1 ? "s" : ""} total
          </span>
        </div>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
          <DocumentUpload onUpload={handleDocumentUpload} multiple />
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by status:</span>
          <div className="flex items-center space-x-2">
            {["all", "verified", "pending review", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                  filter === status
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <Empty
          type="documents"
          onAction={() => document.querySelector('input[type="file"]')?.click()}
        />
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredDocuments.map((document, index) => (
            <motion.div
              key={document.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ApperIcon 
                        name={getDocumentIcon(document.type)} 
                        className="w-6 h-6 text-primary" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {document.fileName}
                      </h3>
                      <p className="text-sm text-gray-600">{document.type}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      document.status === "Verified" ? "success" :
                      document.status === "Pending Review" ? "warning" : "error"
                    }
                    size="sm"
                  >
                    {document.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{document.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Uploaded:</span>
                    <span className="font-medium">
                      {new Date(document.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Application:</span>
                    <span className="font-medium">#{document.applicationId}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="Download" className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-error hover:text-error/80">
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Documents;