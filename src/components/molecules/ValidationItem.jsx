import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ValidationItem = ({ 
  field, 
  status, 
  message, 
  severity, 
  category,
  onExpand,
  isExpanded = false,
  className 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "pass":
        return { 
          icon: "CheckCircle", 
          color: "text-success", 
          bgColor: "bg-success/10",
          variant: "success"
        };
      case "warning":
        return { 
          icon: "AlertTriangle", 
          color: "text-warning", 
          bgColor: "bg-warning/10",
          variant: "warning"
        };
      case "fail":
        return { 
          icon: "XCircle", 
          color: "text-error", 
          bgColor: "bg-error/10",
          variant: "error"
        };
      default:
        return { 
          icon: "Info", 
          color: "text-info", 
          bgColor: "bg-info/10",
          variant: "info"
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all duration-200",
        status === "pass" ? "border-success/20 bg-success/5" :
        status === "warning" ? "border-warning/20 bg-warning/5" :
        status === "fail" ? "border-error/20 bg-error/5" :
        "border-gray-200 bg-gray-50",
        "hover:shadow-md",
        className
      )}
      onClick={onExpand}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <motion.div
            className={cn("w-8 h-8 rounded-full flex items-center justify-center", config.bgColor)}
            whileHover={{ scale: 1.1 }}
          >
            <ApperIcon name={config.icon} className={cn("w-4 h-4", config.color)} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-sm font-medium text-gray-900 capitalize">
                {field.replace(/_/g, " ")}
              </h4>
              <Badge variant={config.variant} size="sm">
                {category}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>

        <motion.div
          className="ml-2"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon name="ChevronDown" className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>

      {isExpanded && (
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Severity:</span>
                <span className={cn(
                  "ml-2 capitalize",
                  severity === "high" ? "text-error" :
                  severity === "medium" ? "text-warning" :
                  "text-info"
                )}>
                  {severity}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Status:</span>
                <span className={cn("ml-2 capitalize", config.color)}>
                  {status}
                </span>
              </div>
            </div>

            {status !== "pass" && (
              <div className="bg-white rounded-md p-3 border">
                <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                  <ApperIcon name="Lightbulb" className="w-4 h-4 mr-2 text-warning" />
                  Recommendation
                </h5>
                <p className="text-sm text-gray-600">
                  {status === "fail" 
                    ? "This issue must be resolved before proceeding. Please review the requirements and resubmit."
                    : "Consider addressing this item to improve application quality and processing time."
                  }
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ValidationItem;