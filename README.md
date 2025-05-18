# Interactive Periodic Table

An elegant, interactive web application that provides an engaging way to explore the periodic table of elements. This project showcases detailed information about chemical elements with beautiful visualizations and animations.

![Periodic Table Preview](/public/Preview.jpeg)

## 🚀 Features

- **Interactive Element Cards**: Click on any element to view comprehensive details
- **Dynamic Atomic Structure Visualization**: Animated visualizations of electron configurations using p5.js
- **Filtering by Element Categories**: Filter elements by their chemical categories
- **Element Properties**: View detailed properties including:
  - Atomic mass, number, and radius
  - Electron configuration
  - Electronegativity
  - Melting and boiling points
  - Density and ionization energy
  - Discovery information
  - Detailed descriptions
- **External References**: Direct links to Wikipedia for additional information
- **Smooth Animations**: Engaging animations and transitions using Framer Motion
- **Welcome Screen**: Welcome screen for first-time users

## 🧪 Technologies Used

### Frontend Framework
- **Next.js 15.3.2**: React framework for production
- **React 18.3.1**: JavaScript library for building user interfaces
- **TypeScript**: Static typing for improved developer experience

### Styling and UI
- **TailwindCSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible UI components (Dialog, Tooltip)
- **Lucide**: Icon library
- **Framer Motion**: Animation library
- **tw-animate-css**: Animation utilities for TailwindCSS

### Visualization
- **p5.js**: JavaScript library for creative coding and visualizations
- **Lenis**: Smooth scrolling library

## 📁 Project Structure

- **/components**: Reusable React components
- **/pages**: Next.js pages for routing
- **/public**: Static assets like images and icons
- **/styles**: Global styles and TailwindCSS configuration
- **/utils**: Utility functions and constants
- **/data**: Static data files (e.g., elements.json)

## 🧩 Main Components

- **PeriodicTable**: Displays the entire periodic table with interactive element cells
- **ElementDetail**: Shows comprehensive information about a selected element
- **AtomicStructure**: Visualizes the atom's structure with electron shells
- **Sketch**: P5.js implementation that animates the atomic structure

## 🎨 UI Architecture

### User Interface Flow

1. **Main View**: Users are presented with the complete periodic table grid on the landing page
   - Elements are color-coded by category (metals, non-metals, noble gases, etc.)
   - Hovering over elements shows basic information via tooltips
   - The table is responsive and adjusts layout based on screen size

2. **Element Selection**: Clicking any element cell triggers a dialog/modal
   - The transition uses Framer Motion animations for a smooth opening effect
   - Selected element is highlighted in the background table

3. **Element Detail View**: A comprehensive card displays all information about the selected element
   - Information is organized in tabs/sections for easy navigation
   - The atomic visualization (using p5.js) appears at the top, showing electrons orbiting the nucleus
   - Properties are presented in an organized layout with appropriate units and visual indicators
   - Includes external wiki links to elements and their discoverers 

4. **Filtering System**: A control panel allows filtering elements by:
   - Category (via toggle buttons)
   - Properties (via sliders or range inputs)
   - Search functionality (via text input)

5. **Responsive Behavior**:
   - Desktop: Full grid view with spacious element cells
   - Tablet: Adjusted grid with optimized spacing
   - Mobile: Vertically scrollable table with larger element touch targets

### Component Interaction

- **PeriodicTable → ElementDetail**: Main table passes selected element data to the detail component
- **ElementDetail → AtomicStructure**: Detail view provides atomic data to the visualization component
- **AtomicStructure → Sketch**: Atomic data is used to configure the p5.js visualization

### Accessibility Features

- Keyboard navigation support throughout the application
- ARIA labels on interactive elements
- Color schemes designed to be distinguishable for color-blind users
- Screen reader compatibility using Radix UI's accessible components

### Animation Strategy

- Subtle hover effects on element cells using TailwindCSS transitions
- Modal opening/closing animations with Framer Motion
- Atomic structure visualization with continuously animating electrons
- Smooth scrolling behavior powered by Lenis for a polished feel

## 👨‍💻 About

This project was created for the CodeCircuit Hackathon.

---

<p align="center">
  <sub>© 2025 Interactive Periodic Table • Built with vibes by ishaan2053</sub>
</p>

