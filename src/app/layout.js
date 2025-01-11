"use client";

import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-paper p-4 min-h-screen flex justify-center items-center">
        <SessionProvider>
          <AnimatePresence mode="wait">
            <motion.div
              key={children?.key}
              initial={{
                opacity: 0,
                rotateY: -90,
                transformOrigin: "right center",
                scale: 0.9,
              }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{
                opacity: 0,
                rotateY: 90,
                transformOrigin: "left center",
                scale: 0.9,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="shadow-xl bg-white p-6 rounded-xl max-w-lg w-full min-h-[80vh]"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </SessionProvider>
      </body>
    </html>
  );
}
