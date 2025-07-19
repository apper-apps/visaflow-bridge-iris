import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import EditClientModal from "@/components/molecules/EditClientModal";
import AddClientModal from "@/components/molecules/AddClientModal";
import ViewClientModal from "@/components/molecules/ViewClientModal";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import clientService from "@/services/api/clientService";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const clientsData = await clientService.getAll();
      setClients(clientsData);
    } catch (err) {
      setError(err.message || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const filteredClients = clients.filter(client =>
    `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.nationality.toLowerCase().includes(searchQuery.toLowerCase())
);

  const handleAddClient = async (clientData) => {
    try {
      const newClient = await clientService.create(clientData);
      setClients(prev => [...prev, newClient]);
      toast.success("Client added successfully");
    } catch (error) {
      toast.error("Failed to add client");
      throw error;
    }
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setShowEditModal(true);
  };

  const handleUpdateClient = async (id, updates) => {
    try {
      const updatedClient = await clientService.update(id, updates);
      setClients(prev => prev.map(client => 
        client.Id === id ? updatedClient : client
      ));
      toast.success("Client updated successfully");
    } catch (error) {
      toast.error("Failed to update client");
      throw error;
    }
  };

  const handleDeleteClient = async (client) => {
    if (confirm(`Are you sure you want to delete ${client.firstName} ${client.lastName}?`)) {
      try {
        await clientService.delete(client.Id);
        setClients(prev => prev.filter(c => c.Id !== client.Id));
        toast.success("Client deleted successfully");
      } catch (error) {
        toast.error("Failed to delete client");
      }
    }
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadClients} />;

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
            Clients
          </h1>
          <p className="text-gray-600">
            Manage your client database
          </p>
        </div>
<div className="mt-4 sm:mt-0">
          <Button onClick={openAddModal}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <ApperIcon 
            name="Search" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search clients by name, email, or nationality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Clients List */}
      {filteredClients.length === 0 ? (
        <Empty
          type="clients"
onAction={openAddModal}
        />
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                      <ApperIcon name="User" className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {client.firstName} {client.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{client.occupation}</p>
                    </div>
                  </div>
                  <Badge variant="info" size="sm">
                    {client.nationality}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="Mail" className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="Phone" className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="CreditCard" className="w-4 h-4" />
                    <span>{client.passportNumber}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    {client.employer && (
                      <div className="flex items-center space-x-1">
                        <ApperIcon name="Building" className="w-4 h-4" />
                        <span>{client.employer}</span>
                      </div>
                    )}
                  </div>
<div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewClient(client)}
                    >
                      <ApperIcon name="Eye" className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditClient(client)}
                    >
                      <ApperIcon name="Edit" className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteClient(client)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
</Card>
            </motion.div>
          ))}
        </motion.div>
      )}
      {/* Modals */}
      <AddClientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddClient}
      />

      <ViewClientModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        client={selectedClient}
      />

      <EditClientModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        client={selectedClient}
        onUpdate={handleUpdateClient}
      />
    </div>
  );
};

export default Clients;