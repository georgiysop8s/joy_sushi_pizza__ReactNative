// import React from 'react'
// import Svg, { Path } from 'react-native-svg'

// const HomeSVG = () => {
//   return (
//     <Svg
//       width={29}
//       height={26}
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//       {...props}
//     >
//       <Path fill="url(#a)" d="M0 0h28.747v25.458H0z" />
//       <Defs>
//         <Pattern
//           id="a"
//           patternContentUnits="objectBoundingBox"
//           width={1}
//           height={1}
//         >
//           <Use xlinkHref="#b" transform="matrix(.002 0 0 .00251 -.014 -.179)" />
//         </Pattern>
//         <Image
//           id="b"
//           width={512}
//           height={512}
//           xlinkHref="data:image/png;base64,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"
//         />
//       </Defs>
//     </Svg>
//   )
// }

// export default HomeSVG