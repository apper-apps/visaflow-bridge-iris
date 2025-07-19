import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No data available",
  description = "Get started by creating your first item.",
  actionLabel = "Get Started",
  onAction = null,
  icon = "FileText",
  type = "general"
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case "applications":
        return {
          icon: "FileCheck",
          title: "No Applications Found",
          description: "Start your first visa application to streamline the process for your clients.",
          actionLabel: "Start New Application"
        };
      case "clients":
        return {
          icon: "Users",
          title: "No Clients Added",
          description: "Add your first client to begin managing their visa applications.",
          actionLabel: "Add Client"
        };
      case "documents":
        return {
          icon: "Upload",
          title: "No Documents Uploaded",
          description: "Upload required documents to proceed with the application.",
          actionLabel: "Upload Documents"
        };
      case "validation":
        return {
          icon: "CheckCircle",
          title: "No Validation Results",
          description: "Run validation checks to ensure application completeness.",
          actionLabel: "Run Validation"
        };
      default:
        return { icon, title, description, actionLabel };
    }
  };

  const config = getEmptyConfig();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-accent/10 to-accent/5 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <ApperIcon 
          name={config.icon} 
          className="w-12 h-12 text-accent" 
        />
      </motion.div>

      <motion.h3
        className="text-2xl font-semibold text-gray-900 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {config.title}
      </motion.h3>

      <motion.p
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {config.description}
      </motion.p>

      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onAction}
            className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {config.actionLabel}
          </Button>
        </motion.div>
      )}

      <motion.div
        className="mt-8 grid grid-cols-3 gap-4 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.6 }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-16 h-12 bg-gradient-to-br from-gray-100 to-gray-50 rounded border-2 border-dashed border-gray-200"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Empty;