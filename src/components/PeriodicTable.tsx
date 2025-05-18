import { useState, useEffect } from 'react';
import { periodicTableData } from '@/data/periodicTableData';
import ElementCell from '@/components/TableCell';
import { Element, ElementCategory } from '@/types/element';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticEffect from './ui/magnetic-effect';

interface PeriodicTableProps {
  onElementSelect: (element: Element | null) => void;
  selectedCategory: ElementCategory | null;
}

const PeriodicTable = ({ onElementSelect, selectedCategory }: PeriodicTableProps) => {
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleElementHover = (element: Element) => {
    setHoveredElement(element);
  };

  const handleElementLeave = () => {
    setHoveredElement(null);
  };

  const handleElementClick = (element: Element) => {
    if (selectedElement?.atomicNumber === element.atomicNumber) {
      setSelectedElement(null);
      onElementSelect(null);
    } else {
      setSelectedElement(element);
      onElementSelect(element);
    }
  };

  // Calculate the center of the table
  const centerX = 9; // Middle of 18 columns
  const centerY = 5; // Middle of 10 rows

  // Function to calculate distance from center
  const getDistance = (x: number, y: number) => {
    return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[repeat(18,70px)] grid-rows-[repeat(10,70px)] my-5 max-w-fullp-3 pb-[100px] overflow-x-hidden w-full">
        <AnimatePresence>
          {isLoaded && periodicTableData.map((element) => {
            // Calculate distance from center for staggered effect
            const distance = getDistance(element.xpos, element.ypos);
            
            return (
              <motion.div
                key={element.atomicNumber}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 50,
                  delay: distance * 0.2, // Staggered delay based on distance from center
                }}
                style={{ gridColumn: element.xpos, gridRow: element.ypos }}
              >
                <MagneticEffect>   
                              <ElementCell
                  element={element}
                  onMouseEnter={() => handleElementHover(element)}
                  onMouseLeave={handleElementLeave}
                  onClick={() => handleElementClick(element)}
                  isHovered={hoveredElement?.atomicNumber === element.atomicNumber}
                  isSelected={selectedElement?.atomicNumber === element.atomicNumber}
                  selectedCategory={selectedCategory}
                />
                </MagneticEffect>
 
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {hoveredElement && !selectedElement && (
        <div
          className="absolute z-100 bg-black/90 backdrop-blur-sm rounded p-2 text-xs pointer-events-none transform -translate-x-1/2 animate-fade-in"
          style={{
            left: `${Math.min(Math.max(hoveredElement.xpos * 64, 100), window.innerWidth - 100)}px`,
            top: `${hoveredElement.ypos * 64 + 30}px`
          }}
        >
          <div className="flex flex-col gap-1">
            <strong>{hoveredElement.name}</strong>
            <p>Atomic Number: {hoveredElement.atomicNumber}</p>
            <p>Click to know more about {hoveredElement.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;