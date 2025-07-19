import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const EditClientModal = ({ isOpen, onClose, client, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    passportNumber: "",
    nationality: "",
    dateOfBirth: "",
    occupation: "",
    employer: ""
  });

  useEffect(() => {
    if (client && isOpen) {
      setFormData({
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        email: client.email || "",
        phone: client.phone || "",
        passportNumber: client.passportNumber || "",
        nationality: client.nationality || "",
        dateOfBirth: client.dateOfBirth || "",
        occupation: client.occupation || "",
        employer: client.employer || ""
      });
    }
  }, [client, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await onUpdate(client.Id, formData);
      onClose();
    } catch (error) {
      console.error("Error updating client:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (client) {
      setFormData({
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        email: client.email || "",
        phone: client.phone || "",
        passportNumber: client.passportNumber || "",
        nationality: client.nationality || "",
        dateOfBirth: client.dateOfBirth || "",
        occupation: client.occupation || "",
        employer: client.employer || ""
      });
    }
    onClose();
  };

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
            onClick={handleClose}
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
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Edit" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Edit Client</h2>
                    <p className="text-sm text-gray-600">Update client information</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={handleClose} className="p-2">
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="First Name *"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Last Name *"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Passport Number"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label="Employer"
                    name="employer"
                    value={formData.employer}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                        Update Client
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditClientModal;