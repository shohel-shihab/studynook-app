"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { motion } from "motion/react";

export default function Banner() {
    const stats = [
        {
            value: "500+",
            label: "Study Rooms",
        },
        {
            value: "2K+",
            label: "Students",
        },
        {
            value: "98%",
            label: "Satisfaction",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-slate-50">
            {/* Decorative Blur */}
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />

            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />

            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:px-8 lg:py-28">
                <div className="grid items-center gap-14 lg:grid-cols-2">

                    {/* LEFT CONTENT */}
                    <div>
                        <motion.span
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="inline-flex rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-700"
                        >
                            📚 Study Room Booking Platform
                        </motion.span>

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.2,
                                duration: 0.7,
                            }}
                            className="mt-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl"
                        >
                            Find Your Perfect
                            <span className="block text-teal-700">
                                Study Room
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.4,
                                duration: 0.8,
                            }}
                            className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600"
                        >
                            Browse and book quiet, private study rooms in your
                            library. List your own room and earn while helping
                            students discover productive spaces for learning
                            and collaboration.
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
                            className="mt-8 flex flex-wrap gap-4"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >
                                <Button
                                    color="primary"
                                    size="lg"
                                    radius="sm"
                                >
                                    <Link  href="/rooms">Explore Rooms</Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >
                                <Button
                                    as={Link}
                                    href="/add-room"
                                    variant="bordered"
                                    size="lg"
                                    radius="sm"
                                >
                                    List Your Room
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Stats */}
                        <div className="mt-12 flex flex-wrap gap-8">
                            {stats.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.8 + index * 0.2,
                                    }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {item.value}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {item.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 60,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 1,
                        }}
                        className="relative"
                    >
                        <motion.div
                            animate={{
                                y: [0, -12, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/hero-study-room.jpg"
                                alt="Study Room"
                                width={700}
                                height={500}
                                priority
                                className="h-[300px] w-full rounded-3xl object-cover shadow-2xl md:h-[500px]"
                            />
                        </motion.div>

                        {/* Card 1 */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: 1,
                            }}
                            className="absolute -bottom-5 left-4 rounded-2xl bg-white p-4 shadow-xl"
                        >
                            <p className="text-xs text-gray-500">
                                Available Rooms
                            </p>

                            <h3 className="text-2xl font-bold text-teal-700">
                                127
                            </h3>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: 1.2,
                            }}
                            className="absolute right-4 top-6 rounded-2xl bg-white p-4 shadow-xl"
                        >
                            <p className="text-xs text-gray-500">
                                Bookings Today
                            </p>

                            <h3 className="text-2xl font-bold text-teal-700">
                                48
                            </h3>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}