import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Page Not Found | Bharathi Portfolio";
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-violet-50 to-slate-50 px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-violet rounded-xl p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-violet-100 rounded-full flex items-center justify-center">
              <i className="fas fa-map-marked-alt text-3xl text-violet-500" aria-hidden="true"></i>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              404
            </h1>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              Page Not Found
            </h2>
            <p className="text-slate-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Link href="/">
              <Button className="w-full bg-violet-500 hover:bg-violet-600 text-white">
                <i className="fas fa-home mr-2" aria-hidden="true"></i>
                Go Home
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" className="w-full border-violet-500 text-violet-600 hover:bg-violet-50">
                <i className="fas fa-folder mr-2" aria-hidden="true"></i>
                View Projects
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-slate-500 mt-6"
          >
            Need help? Contact me at{" "}
            <a 
              href="mailto:bharathii54123@gmail.com" 
              className="text-violet-600 hover:text-violet-700 underline"
            >
              bharathii54123@gmail.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
