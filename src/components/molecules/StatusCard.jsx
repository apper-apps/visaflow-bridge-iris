import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const StatusCard = ({ 
  title, 
  status, 
  priority, 
  completionPercentage, 
  client,
  stage,
  onView,
  className 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "Visa Selection":
        return { color: "info", icon: "FileCheck" };
      case "Information Collection":
        return { color: "warning", icon: "Users" };
      case "Validation":
        return { color: "secondary", icon: "Shield" };
      case "Document Generation":
        return { color: "primary", icon: "FileText" };
      case "Agent Review":
        return { color: "warning", icon: "Eye" };
      case "Ready for Submission":
        return { color: "success", icon: "Send" };
      default:
        return { color: "default", icon: "FileText" };
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "Critical":
        return "error";
      case "High":
        return "warning";
      case "Medium":
        return "info";
      default:
        return "default";
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card hover className={cn("p-6 cursor-pointer", className)} onClick={onView}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              statusConfig.color === "success" ? "bg-success/10 text-success" :
              statusConfig.color === "primary" ? "bg-primary/10 text-primary" :
              statusConfig.color === "warning" ? "bg-warning/10 text-warning" :
              statusConfig.color === "info" ? "bg-info/10 text-info" :
              statusConfig.color === "secondary" ? "bg-secondary/10 text-secondary" :
              "bg-gray-100 text-gray-600"
            )}>
              <ApperIcon name={statusConfig.icon} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{client}</p>
            </div>
          </div>
          <Badge variant={getPriorityColor()} size="sm">
            {priority}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant={statusConfig.color} size="sm">
              Stage {stage}: {status}
            </Badge>
            <span className="text-sm font-medium text-gray-900">
              {completionPercentage}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={cn(
                "h-2 rounded-full",
                completionPercentage === 100 ? "bg-gradient-to-r from-success to-success/80" :
                "bg-gradient-to-r from-primary to-secondary"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-gray-500">
              <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
              Updated recently
            </div>
            <motion.div 
              className="text-primary hover:text-primary/80 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <ApperIcon name="ArrowRight" className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatusCard;