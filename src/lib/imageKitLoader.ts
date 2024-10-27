// export default function imageKitLoader({ src, width, quality }: {
//     src: string;
//     width: number;
//     quality?: number;
//   }) {

//     if (src[0] === "/") src = src.slice(1);

//     // Replace with your ImageKit URL endpoint
//     const params = [`w-${width}`];
    
//     if (quality) {
//       params.push(`q-${quality}`);
//     }
  
//     const paramsString = params.length > 0 ? `tr:${params.join(',')}` : '';
    
//     return `https://ik.imagekit.io/rx1l63ol1q/media/${paramsString}/${src}`;
//     // return `https://ik.imagekit.io/rx1l63ol1q/${src}?tr=${paramsString}`;
//   };