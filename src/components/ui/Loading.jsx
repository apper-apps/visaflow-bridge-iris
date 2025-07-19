import { motion } from "framer-motion";

const Loading = ({ type = "skeleton" }) => {
  if (type === "spinner") {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <motion.div
            className="h-8 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-lg w-64"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded w-40"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
        </div>
        <motion.div
          className="h-10 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-lg w-32"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="h-6 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded w-3/4 mb-4"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
            <motion.div
              className="h-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded w-1/2 mb-3"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 + 0.2 }}
            />
            <motion.div
              className="h-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded w-2/3"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 + 0.4 }}
            />
            <div className="mt-4 flex justify-between items-center">
              <motion.div
                className="h-8 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded w-20"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 + 0.6 }}
              />
              <motion.div
                className="h-8 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded w-24"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 + 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;