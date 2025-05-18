import { Element, ElementCategory } from "@/types/element";

interface ElementCellProps {
  element: Element;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  isHovered: boolean;
  isSelected: boolean;
  selectedCategory: ElementCategory | null;
}

const ElementCell = ({
  element,
  onMouseEnter,
  onMouseLeave,
  onClick,
  isHovered,
  isSelected,
  selectedCategory,
}: ElementCellProps) => {
  const { atomicNumber, symbol, name, category } = element;

  // Category color mapping using Tailwind classes
  const categoryClasses = {
    nonmetal: "border-lime-400 bg-lime-400/10 text-white",
    "noble-gas": "border-blue-500 bg-blue-500/10 text-white",
    "alkali-metal": "border-orange-600 bg-orange-600/10 text-white",
    "alkaline-earth-metal": "border-amber-400 bg-amber-400/10 text-white",
    metalloid: "border-cyan-500 bg-cyan-500/10 text-white",
    "post-transition-metal": "border-amber-800 bg-amber-800/10 text-white",
    "transition-metal": "border-pink-500 bg-pink-500/10 text-white",
    lanthanide: "border-purple-500 bg-purple-500/10 text-white",
    actinide: "border-purple-300 bg-purple-300/10 text-white",
    halogen: "border-green-400 bg-green-400/10 text-white",
  };

  // Determine if this element should be faded based on selected category
  const shouldFade = selectedCategory !== null && category !== selectedCategory;

  return (
    <div
      className={`
        size-15 rounded p-1 flex flex-col justify-between cursor-pointer
        transition-all duration-200 ease-in-out border hover:backdrop-blur
        ${categoryClasses[category]}
        ${isHovered ? "scale-110 z-10 shadow-[0_0_5px_rgba(255,255,255,0.5)]" : ""}
        ${isSelected ? "scale-110 z-10 border-2 shadow-2xl" : ""}
        ${shouldFade ? "opacity-30 saturate-0" : "opacity-100"}
      `}
      style={{
        gridRow: element.ypos,
        gridColumn: element.xpos,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="text-sm text-left">{atomicNumber}</div>
      <div className="text-sm font-bold text-center">{symbol}</div>
      <div className="text-[8px] text-center">{name}</div>
    </div>
  );
};

export default ElementCell;
