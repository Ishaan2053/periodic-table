import { Montserrat, Roboto_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import PeriodicTable from "@/components/PeriodicTable";
import ElementDetail from "@/components/ElementDetail";
import { Element, ElementCategory } from "@/types/element";
import Link from "next/link";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  GithubIcon,
  LinkedinIcon,
  ArrowRightIcon,
  XIcon,
  GlobeIcon,
} from "lucide-react";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function Home() {
  // Initialize Lenis smooth scrolling
  const lenis = useLenisScroll();

  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ElementCategory | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const categoryColors: Record<ElementCategory, string> = {
    nonmetal: "bg-lime-400",
    "noble-gas": "bg-blue-500",
    "alkali-metal": "bg-orange-600",
    "alkaline-earth-metal": "bg-amber-400",
    metalloid: "bg-cyan-500",
    "post-transition-metal": "bg-amber-800",
    "transition-metal": "bg-pink-500",
    lanthanide: "bg-purple-500",
    actinide: "bg-purple-300",
    halogen: "bg-green-400",
  };

  const links = [
    {
      title: "GitHub",
      icon: (
        <GithubIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Ishaan2053",
    },
    {
      title: "LinkedIn",
      icon: (
        <LinkedinIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/ishaan2053/",
    },
    {
      title: "Portfolio",
      icon: (
        <GlobeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.ishaan2053.tech/",
    },
  ];

  const handleLegendClick = (category: ElementCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <main
      className={`bg-gradient-to-b from-slate-950 to-neutral-950 mx-auto flex min-h-screen flex-col items-center justify-between p-2 overflow-hidden ${montserrat.variable} ${robotoMono.variable}`}
    >
      <Head>
        <title>Interactive Periodic Table</title>
        <meta name="description" content="Interactive Periodic Table" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen
            key="welcome"
            onGetStarted={() => setShowWelcome(false)}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center flex-grow"
          >
            {/* Mobile notice */}
            <div className="flex md:hidden items-center text-center justify-center text-white flex-col text-2xl z-50 pointer-events-none flex-1 font-semibold">
              Switch to desktop mode to view the periodic table
            </div>

            {/* Desktop view */}
            <div className="hidden md:flex flex-col items-center justify-center">
              <ElementLegend
                categories={categoryColors}
                selectedCategory={selectedCategory}
                onCategorySelect={handleLegendClick}
              />

              <div>
                <PeriodicTable
                  onElementSelect={setSelectedElement}
                  selectedCategory={selectedCategory}
                />
              </div>

              <Dialog
                open={selectedElement !== null}
                onOpenChange={(isOpen) => {
                  if (!isOpen) setSelectedElement(null);
                }}
              >
                <DialogContent className="min-w-[70vw] w-full bg-primary pr-5 max-h-[95vh] overflow-y-scroll overflow-x-hidden p-0 border-none">
                  <DialogClose className="hover:rotate-180 transition duration-1000 ease-in-out absolute top-4 right-4 z-50 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700">
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DialogClose>

                  {selectedElement && (
                    <ElementDetail
                      element={selectedElement}
                      showAtomicStructure={true}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center justify-center mt-auto">
              <FloatingDock items={links} />
            </div>

            <div className="w-full flex justify-center items-center mt-4">
              <p className="text-gray-400 text-sm text-center">
                view{" "}
                <Link
                  className="hover:text-gray-200 transition"
                  href="https://github.com/Ishaan2053/periodic-table"
                  target="_blank"
                >
                  source code
                </Link>
                {" "}  <br/>© 2025. Made during Code Circuit May Hackathon
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Welcome Screen Component
function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="h-screen overflow-hidden w-full flex flex-col items-center justify-center text-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="space-y-8" variants={containerVariants}>
        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Interactive Periodic Table
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Discover the elements that make up our universe with this interactive
          periodic table
        </motion.p>

        <motion.div variants={itemVariants}>
          <p className="text-gray-400 text-sm mb-8">
            Created by{" "}
            <Link
              href="https://www.ishaan2053.tech/"
              target="_blank"
              className="underline hover:text-blue-400 transition-colors"
            >
              Ishaan2053
            </Link>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onGetStarted}
            size="lg"
            className="cursor-pointer px-8 py-6 text-lg bg-neutral-950 border-2 border-blue-500 text-white hover:bg-slate-900 hover:text-white transition-colors duration-300"
            variant="default"
            effect="shineHover"
            icon={ArrowRightIcon}
            iconPlacement="right"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Element Legend Component
const ElementLegend = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: {
  categories: Record<ElementCategory, string>;
  selectedCategory: ElementCategory | null;
  onCategorySelect: (category: ElementCategory) => void;
}) => (
  <div className="flex flex-wrap gap-3 w-full p-4 rounded-lg my-4 justify-center">
    {Object.entries(categories).map(([category, colorClass]) => (
      <div
        key={category}
        className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded transition
          ${selectedCategory === category ? "bg-gray-800" : "hover:bg-gray-800"}`}
        onClick={() => onCategorySelect(category as ElementCategory)}
      >
        <div className={`${colorClass} w-4 h-4 rounded-sm`}></div>
        <span className="text-white capitalize text-sm">
          {category.replace(/-/g, " ")}
        </span>
      </div>
    ))}
  </div>
);

