// 'use client'
// import { useState } from 'react';
// import {TestSVG} from '@/assets/svg';
// import YourLogo from '@/app/assets/logo.svg';

// export default function SvgTest() {
//   const [size, setSize] = useState(100);

//   return (
//     <div className="p-8 space-y-8">
//       <div className="space-y-4">
//         <h2 className="text-xl font-bold">1. Basic Import Test</h2>
//         <TestSVG />
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-xl font-bold">2. Props Override Test</h2>
//         <TestSVG 
//           width={50} 
//           height={50} 
//           fill="blue" 
//           className="test-override"
//         />
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-xl font-bold">3. Dynamic Size Test</h2>
//         <div className="space-y-2">
//           <input 
//             type="range" 
//             min="50" 
//             max="200" 
//             value={size}
//             onChange={(e) => setSize(Number(e.target.value))}
//           />
//           <TestSVG width={size} height={size} />
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-xl font-bold">4. Your Logo Test</h2>
//         <YourLogo className="w-40 h-auto" />
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-xl font-bold">5. TypeScript Props Test</h2>
//         <TestSVG 
//           onClick={() => alert('SVG Clicked!')}
//           onMouseEnter={(e: React.MouseEvent<SVGSVGElement>) => console.log('Mouse entered', e)}
//           aria-label="Test SVG"
//           data-testid="svg-component"
//         />
//       </div>
//     </div>
//   );
// }