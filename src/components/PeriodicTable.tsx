import { useState } from 'react';
import { periodicTableData } from '@/data/periodicTableData';
import ElementCell from '@/components/TableCell';
import { Element, ElementCategory } from '@/types/element';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface PeriodicTableProps {
  onElementSelect: (element: Element | null) => void;
  selectedCategory: ElementCategory | null;
}

const PeriodicTable = ({ onElementSelect, selectedCategory }: PeriodicTableProps) => {
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

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

  return (
    <div className="relative">
      <div className="grid grid-cols-[repeat(18,70px)] grid-rows-[repeat(10,70px)] my-5 max-w-full overflow-x-auto p-3 pb-[100px]">
        {periodicTableData.map((element) => (
          <ElementCell
            key={element.atomicNumber}
            element={element}
            onMouseEnter={() => handleElementHover(element)}
            onMouseLeave={handleElementLeave}
            onClick={() => handleElementClick(element)}
            isHovered={hoveredElement?.atomicNumber === element.atomicNumber}
            isSelected={selectedElement?.atomicNumber === element.atomicNumber}
            selectedCategory={selectedCategory}
          />
        ))}
      </div>

      {hoveredElement && !selectedElement && (
     
        <div
          className="absolute z-100 bg-black/80 rounded p-2 text-xs pointer-events-none transform -translate-x-1/2"
          style={{
            left: `${Math.min(Math.max(hoveredElement.xpos * 64, 100), window.innerWidth - 100)}px`,
            top: `${hoveredElement.ypos * 64 + 30}px`
          }}
        >
          <div className="flex flex-col gap-1">
            <strong>{hoveredElement.name}</strong>
            <p>Atomic Number: {hoveredElement.atomicNumber}</p>
            <p>Click for details</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;