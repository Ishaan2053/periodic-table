import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import PeriodicTable from "@/components/PeriodicTable";
import ElementDetail from "@/components/ElementDetail";
import { Element, ElementCategory } from "@/types/element";
import Link from "next/link";
import { FloatingDock } from "@/components/ui/floating-dock";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // Initialize Lenis smooth scrolling
  const lenis = useLenisScroll();

  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ElementCategory | null>(null);

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
      href: "#",
    },
    {
      title: "LinkedIn",
      icon: (
        <LinkedinIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  const handleLegendClick = (category: ElementCategory) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <main
      className={`bg-gradient-to-b from-slate-950 to-neutral-950 mx-auto flex min-h-screen flex-col items-center justify-between p-2 `}
    >
      <Head>
        <title>Interactive Periodic Table</title>
        <meta name="description" content="Interactive Periodic Table" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <h1 className="text-red-500 text-4xl">Interactive Periodic Table</h1>
      <h3>Hover over elements to see their atomic structure and know more</h3> */}

      <div className="flex md:hidden items-center text-center justify-center text-semibold text-white flex-col text-2xl"> 
        Switch to desktop mode to view the periodic table

      </div>

      <div className="hidden md:flex flex-col items-center justify-center">
        {/* LEGEND */}
        <div className="flex flex-wrap gap-3 w-full p-4 rounded-lg my-4 justify-center">
          {Object.entries(categoryColors).map(([category, colorClass]) => (
            <div
              key={category}
              className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${
                selectedCategory === category ? "bg-gray-800" : ""
              }`}
              onClick={() => handleLegendClick(category as ElementCategory)}
            >
              <div className={`${colorClass} w-4 h-4 rounded-sm`}></div>
              <span className="text-white capitalize text-sm">
                {category.replace(/-/g, " ")}
              </span>
            </div>
          ))}
        </div>

        <div className="{styles.tableContainer}">
          <PeriodicTable
            onElementSelect={setSelectedElement}
            selectedCategory={selectedCategory}
          />
        </div>

        {selectedElement && (
          <div className=''>
            <ElementDetail
              element={selectedElement}
              showAtomicStructure={true}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <FloatingDock
          items={links}
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <p className="text-gray-400 text-sm">
          Made by{" "}
          <Link href="https://www.ishaan2053.tech/" target="_blank">
            Ishaan2053
          </Link>
        </p>
      </div>
    </main>
  );
}
