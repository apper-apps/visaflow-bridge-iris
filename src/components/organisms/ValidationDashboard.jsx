import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ValidationItem from "@/components/molecules/ValidationItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import validationService from "@/services/api/validationService";

const ValidationDashboard = ({ applicationId }) => {
  const [validations, setValidations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [runningValidation, setRunningValidation] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const loadValidations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [validationsData, summaryData] = await Promise.all([
        validationService.getByApplicationId(applicationId),
        validationService.getValidationSummary(applicationId)
      ]);
      
      setValidations(validationsData);
      setSummary(summaryData);
    } catch (err) {
      setError(err.message || "Failed to load validation results");
    } finally {
      setLoading(false);
    }
  };

  const runValidation = async () => {
    try {
      setRunningValidation(true);
      setError(null);
      
      await validationService.runValidation(applicationId);
      await loadValidations();
    } catch (err) {
      setError(err.message || "Failed to run validation");
    } finally {
      setRunningValidation(false);
    }
  };

  useEffect(() => {
    if (applicationId) {
      loadValidations();
    }
  }, [applicationId]);

  const handleItemExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadValidations} />;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      {summary && (
        <motion.div
          className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Validation Summary
              </h3>
              <p className="text-sm text-gray-600">
                Overall status: {summary.total} checks completed
              </p>
            </div>
            <Button
              onClick={runValidation}
              disabled={runningValidation}
              className="flex items-center"
            >
              {runningValidation ? (
                <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ApperIcon name="Play" className="w-4 h-4 mr-2" />
              )}
              {runningValidation ? "Running..." : "Run Validation"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-success/5 border border-success/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {summary.passed}
              </div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-warning mb-1">
                {summary.warnings}
              </div>
              <div className="text-sm text-gray-600">Warnings</div>
            </div>
            <div className="bg-error/5 border border-error/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-error mb-1">
                {summary.failed}
              </div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {summary.total}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <Badge
              variant={
                summary.overallStatus === "pass" ? "success" :
                summary.overallStatus === "warning" ? "warning" : "error"
              }
              size="lg"
            >
              {summary.overallStatus === "pass" ? "All Checks Passed" :
               summary.overallStatus === "warning" ? "Minor Issues Found" :
               "Critical Issues Found"}
            </Badge>
          </div>
        </motion.div>
      )}

      {/* Validation Items */}
      {validations.length === 0 ? (
        <Empty
          type="validation"
          onAction={runValidation}
        />
      ) : (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {validations.map((validation, index) => (
            <motion.div
              key={validation.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ValidationItem
                field={validation.field}
                status={validation.status}
                message={validation.message}
                severity={validation.severity}
                category={validation.category}
                isExpanded={expandedItem === validation.Id}
                onExpand={() => handleItemExpand(validation.Id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ValidationDashboard;