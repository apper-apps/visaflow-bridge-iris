import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ProgressTracker = ({ currentStage, totalStages = 6, className }) => {
  const stages = [
    { id: 1, name: "Visa Selection", icon: "FileCheck" },
    { id: 2, name: "Information Collection", icon: "Users" },
    { id: 3, name: "Validation", icon: "Shield" },
    { id: 4, name: "Document Generation", icon: "FileText" },
    { id: 5, name: "Agent Review", icon: "Eye" },
    { id: 6, name: "Submission", icon: "Send" }
  ];

  const getStageStatus = (stageId) => {
    if (stageId < currentStage) return "completed";
    if (stageId === currentStage) return "current";
    return "upcoming";
  };

  const getStageColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-success text-white";
      case "current":
        return "bg-primary text-white";
      default:
        return "bg-gray-200 text-gray-500";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id);
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className="flex items-center">
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
                    getStageColor(status)
                  )}
                  whileHover={{ scale: 1.1 }}
                >
                  {status === "completed" ? (
                    <ApperIcon name="Check" className="w-5 h-5" />
                  ) : (
                    <ApperIcon name={stage.icon} className="w-5 h-5" />
                  )}
                </motion.div>
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    status === "current" ? "text-primary" : 
                    status === "completed" ? "text-success" : "text-gray-500"
                  )}>
                    {stage.name}
                  </p>
                </div>
              </motion.div>

              {!isLast && (
                <motion.div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-all duration-500",
                    stage.id < currentStage ? "bg-success" : "bg-gray-200"
                  )}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStage / totalStages) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>Stage {currentStage} of {totalStages}</span>
        <span>{Math.round((currentStage / totalStages) * 100)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressTracker;