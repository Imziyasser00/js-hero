"use client";
import React, { JSX, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { cn } from "@jshero/lib/utils";
import Image from "next/image";

export const FloatingNav = ({
                                navItems,
                                className,
                            }: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const pathname = usePathname(); // Get current pathname

    // Set true for the initial state so that nav bar is visible in the hero section
    const [visible, setVisible] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit bg-orange-100 md:min-w-[50vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4",
                    className
                )}
                style={{
                    backdropFilter: "blur(16px) saturate(180%)",
                    backgroundColor: "rgba(17, 25, 40, 0.75)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.125)",
                }}
            >
                {/* Wrapped the Image component with motion.div for animation */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 30, // Adjust this value for slower or faster rotation
                        ease: "linear",
                    }}
                >
                    <Image src={"/logo.png"} alt={"logo"} width={36} height={36} className={""} />
                </motion.div>

                {navItems.map((navItem: any, idx: number) => {
                    const isActive = pathname === navItem.link;

                    return (
                        <Link
                            key={`link=${idx}`}
                            href={navItem.link}
                            className={cn(
                                "relative dark:text-neutral-50 items-center flex space-x-1",
                                isActive
                                    ? "text-white opacity-100 font-medium"
                                    : "text-white opacity-70 font-normal hover:opacity-100 transition-opacity duration-200"
                            )}
                        >
                            <span className="text-md  !cursor-pointer">
                                {navItem.name}
                            </span>
                        </Link>
                    );
                })}
            </motion.div>
        </AnimatePresence>
    );
};
