import React from 'react';
import AtomicStructure from '@/components/AtomicStructure';
import { Element } from '@/types/element';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, Scale, Thermometer, Droplets,
  FlaskConical, User, Search, Ruler, 
  Zap, Package,
  MoveUpRightIcon,
} from 'lucide-react';
import Link from 'next/link';

interface ElementDetailProps {
  element: Element;
  showAtomicStructure?: boolean;
}

const ElementDetail = ({ element }: ElementDetailProps) => {
  const {
    name,
    atomicNumber,
    symbol,
    atomicMass,
    electronConfiguration,
    electronegativity,
    atomicRadius,
    ionizationEnergy,
    density,
    meltingPoint,
    boilingPoint,
    discoveredBy,
    category,
    description
  } = element;

  // Get appropriate color based on element category
  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      'Alkali Metal': '#ff8a65',
      'Alkaline Earth Metal': '#ffb74d',
      'Transition Metal': '#ffd54f',
      'Post-transition Metal': '#aed581',
      'Metalloid': '#4fc3f7',
      'Nonmetal': '#7986cb',
      'Halogen': '#ba68c8',
      'Noble Gas': '#f06292',
      'Lanthanide': '#4dd0e1',
      'Actinide': '#9575cd'
    };
    return categoryColors[category] || '#90a4ae';
  };

  const categoryColor = getCategoryColor(category);

  return (
    <AnimatePresence >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="p-6 rounded-xl shadow-lg bg-primary z-10 -mr-5 overflow-x-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Element Header */}
          <motion.div
            className="md:col-span-3 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center w-24 h-24 rounded-lg text-white font-bold text-3xl"
              style={{ backgroundColor: categoryColor }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {symbol}
            </motion.div>
            <div>
              <motion.h2
                className="text-3xl font-bold "
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link className='relative group transition hover:text-blue-500' target='_blank' href={`https://en.wikipedia.org/wiki/${name}`}>
                  {" "}
                  {name}
                
                <MoveUpRightIcon className="group:hover:rotate-45 inline-block ml-1 text-gray-500" size={16} />
             </Link> </motion.h2>
              <div className="flex gap-4 mt-2">
                <motion.p
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-300"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Atom className="text-blue-500" size={18} />
                  <span>Atomic Number: </span>
                  <span className="font-semibold">{atomicNumber}</span>
                </motion.p>
                <motion.p
                  className="flex items-center gap-1 text-gray-600 dark:text-gray-300"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Scale className="text-green-500" size={18} />
                  <span>Atomic Mass: </span>
                  <span className="font-semibold">{atomicMass}</span>
                </motion.p>
              </div>

                <motion.div
            className="md:col-span-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.p
              className="text-gray-700 dark:text-gray-200 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {description}
            </motion.p>
          </motion.div>
            </div>
          </motion.div>
       
        

          {/* Properties */}
          <motion.div
            className="col-span-2 space-y-4 p-0 rounded-lg backdrop-blur-sm "
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <Search className="text-blue-400" size={20} />
              Properties
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PropertyCard icon={<Zap className="text-yellow-500" size={20} />} 
                name="Electronegativity" value={electronegativity || "N/A"} />
                
              <PropertyCard icon={<Ruler className="text-blue-500" size={20} />} 
                name="Atomic Radius" value={`${atomicRadius} pm`} />
                
              <PropertyCard icon={<Zap className="text-red-500" size={20} />} 
                name="Ionization Energy" value={`${ionizationEnergy} eV`} />
                
              <PropertyCard icon={<Package className="text-teal-500" size={20} />} 
                name="Density" value={`${density} g/cm³`} />
                
              <PropertyCard icon={<Thermometer className="text-orange-500" size={20} />} 
                name="Melting Point" value={`${meltingPoint} K`} />
                
              <PropertyCard icon={<Droplets className="text-red-500" size={20} />} 
                name="Boiling Point" value={`${boilingPoint} K`} />
                
              <PropertyCard 
                icon={<FlaskConical className="text-indigo-500" size={20} />} 
                name="Category" 
                customValue={
                  <span
                    className="px-2 py-1 rounded text-white text-sm font-medium"
                   
                  >
                    {category}
                  </span>
                } 
              />
                
              <PropertyCard 
                icon={<User className="text-gray-500" size={20} />} 
                name="Discovered by" 
                customValue={
                  <span className="font-mono font-semibold ">
                    {discoveredBy.split(', ').map((name, index, array) => (
                      <React.Fragment key={name}>
                        <Link 
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://en.wikipedia.org/wiki/${name.replace(/ /g, '_')}`}
                          className="hover:text-blue-500 transition-colors "
                        >
                          {name}
                          <MoveUpRightIcon className="inline-block ml-1 text-gray-500" size={16} />
                        </Link>
                        {index < array.length - 1 ? ', ' : ''}
                      </React.Fragment>
                    ))}
                  </span>
                } 
              />
            </div>
          </motion.div>

          {/* Atomic Structure */}
          <motion.div
            className="rounded-lg p-4 flex justify-center items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <AtomicStructure element={element} />
          </motion.div>
        </div>
      </motion.div>
      
    </AnimatePresence>
  );
};

// PropertyCard Component
interface PropertyCardProps {
  icon: React.ReactNode;
  name: string;
  value?: string | number;
  customValue?: React.ReactNode;
}

const PropertyCard = ({ icon, name, value, customValue }: PropertyCardProps) => {
  return (
    <motion.div 
      className="relative group duration-1000 p-3 rounded-lg  backdrop-blur-sm border hover:border-gray-200/20 dark:border-gray-700/30 shadow hover:shadow-lg transition-all"
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 rounded-full group-hover:rotate-45 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-grow">
          <p className="text-sm text-gray-500 dark:text-gray-400">{name}</p>
          {customValue ? (
            customValue
          ) : (
            <p className="font-mono font-semibold text-gray-800 dark:text-gray-200">{value}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ElementDetail;