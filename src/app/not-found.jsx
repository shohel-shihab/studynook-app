"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4">
      <div className="mx-auto max-w-3xl text-center">
        
        {/* 404 */}
        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-8xl font-extrabold text-teal-600 md:text-[180px]"
        >
          404
        </motion.h1>

        {/* Heading */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="mx-auto mt-4 max-w-xl text-lg text-gray-600"
        >
          Oops! The page you're looking for doesn't exist
          or may have been moved.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
          }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button
            color="primary"
            size="lg"
            radius="sm"
          >
           <Link href={'/'}> Back to Home</Link>
          </Button>

          <Button
            as={Link}
            href="/rooms"
            variant="bordered"
            size="lg"
            radius="sm"
          >
            Explore Rooms
          </Button>
        </motion.div>

        {/* Decorative Floating Circles */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-20 top-24 h-32 w-32 rounded-full bg-teal-200/30 blur-3xl"
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-24 right-20 h-40 w-40 rounded-full bg-sky-200/30 blur-3xl"
          />
        </div>
      </div>
    </div>
  );
}