import dynamic from "next/dynamic";
import { Element } from "@/types/element";

const Sketch = dynamic(() => import("../components/Sketch"), { ssr: false });

interface AtomicStructureProps {
  element: Element;
}

const AtomicStructure = ({ element }: AtomicStructureProps) => {
  return (
    <div className='mx-auto flex flex-col items-center justify-center w-full'>
      <div className='w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-lg overflow-hidden bg-[#121212] mb-2.5'>
        <Sketch element={element} />
      </div>
      <div className='flex justify-center mt-1.5 mb-2.5'>
        <div className='flex items-center mx-2.5 text-[10px] md:text-xs'>
          <div className='w-3 h-3 rounded-full bg-[#ff5722] mr-1.5'></div>
          <span>Nucleus (Z={element.atomicNumber})</span>
        </div>
        <div className='flex items-center mx-2.5 text-[10px] md:text-xs'>
          <div className='w-3 h-3 rounded-full bg-[#2196f3] mr-1.5'></div>
          <span>Electrons</span>
        </div>
      </div>
      <div className='text-center text-[10px] md:text-xs text-gray-300 mt-1.5'>
        <p>Electron configuration: {element.electronConfiguration}</p>
      </div>
    </div>
  );
};

export default AtomicStructure;