import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApplicationList from "@/components/organisms/ApplicationList";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import applicationService from "@/services/api/applicationService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    activeApplications: 0,
    completedApplications: 0,
    avgProcessingTime: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const applications = await applicationService.getAll();
        setStats({
          totalApplications: applications.length,
          activeApplications: applications.filter(app => app.stage < 6).length,
          completedApplications: applications.filter(app => app.stage === 6).length,
          avgProcessingTime: 12 // Mock data
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: "FileText",
      color: "primary",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Active Applications",
      value: stats.activeApplications,
      icon: "Clock",
      color: "warning",
      change: "+5%",
      trend: "up"
    },
    {
      title: "Completed",
      value: stats.completedApplications,
      icon: "CheckCircle",
      color: "success",
      change: "+23%",
      trend: "up"
    },
    {
      title: "Avg Processing Time",
      value: `${stats.avgProcessingTime} days`,
      icon: "Timer",
      color: "info",
      change: "-18%",
      trend: "down"
    }
  ];

  const quickActions = [
    {
      title: "New 482 TSS Application",
      description: "Start a new Temporary Skill Shortage visa application",
      icon: "Plus",
      action: () => navigate("/applications/new"),
      color: "primary"
    },
    {
      title: "Run Bulk Validation",
      description: "Validate multiple applications at once",
      icon: "Shield",
      action: () => navigate("/validation"),
      color: "secondary"
    },
    {
      title: "Generate Reports",
      description: "Create processing reports and analytics",
      icon: "BarChart3",
      action: () => navigate("/reports"),
      color: "accent"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John
          </h1>
          <p className="text-gray-600">
            Here is an overview of your visa applications
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => navigate("/applications/new")}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            New Application
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center space-x-1">
                    <ApperIcon
                      name={stat.trend === "up" ? "TrendingUp" : "TrendingDown"}
                      className={`w-4 h-4 ${
                        stat.trend === "up" ? "text-success" : "text-error"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        stat.trend === "up" ? "text-success" : "text-error"
                      }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === "primary" ? "bg-primary/10 text-primary" :
                    stat.color === "warning" ? "bg-warning/10 text-warning" :
                    stat.color === "success" ? "bg-success/10 text-success" :
                    "bg-info/10 text-info"
                  }`}
                >
                  <ApperIcon name={stat.icon} className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card 
              className="p-6 cursor-pointer group hover:shadow-lg transition-all duration-200"
              onClick={action.action}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                    action.color === "primary" ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white" :
                    action.color === "secondary" ? "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white" :
                    "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                  }`}
                >
                  <ApperIcon name={action.icon} className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
                <ApperIcon 
                  name="ArrowRight" 
                  className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" 
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Applications */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Applications
          </h2>
          <button
            onClick={() => navigate("/applications")}
            className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
          >
            View all →
          </button>
        </div>
        <ApplicationList limit={6} />
      </motion.div>
    </div>
  );
};

export default Dashboard;