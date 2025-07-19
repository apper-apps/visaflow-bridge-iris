import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ViewClientModal = ({ isOpen, onClose, client }) => {
  if (!client) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {client.firstName} {client.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">{client.occupation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="info" size="sm">
                    {client.nationality}
                  </Badge>
                  <Button variant="ghost" onClick={onClose} className="p-2">
                    <ApperIcon name="X" className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <ApperIcon name="User" className="w-5 h-5 text-primary" />
                      <span>Personal Information</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">First Name:</span>
                        <span className="font-medium">{client.firstName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Name:</span>
                        <span className="font-medium">{client.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-medium">{client.dateOfBirth || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nationality:</span>
                        <span className="font-medium">{client.nationality}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <ApperIcon name="Phone" className="w-5 h-5 text-primary" />
                      <span>Contact Information</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <ApperIcon name="Mail" className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <ApperIcon name="Phone" className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{client.phone || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Document Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <ApperIcon name="CreditCard" className="w-5 h-5 text-primary" />
                      <span>Documents</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Passport Number:</span>
                        <span className="font-medium">{client.passportNumber || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <ApperIcon name="Building" className="w-5 h-5 text-primary" />
                      <span>Professional</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupation:</span>
                        <span className="font-medium">{client.occupation || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employer:</span>
                        <span className="font-medium">{client.employer || "Not provided"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                  <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ViewClientModal;