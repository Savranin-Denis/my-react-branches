// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";

// export default function App() {
//   const [clicks, setClicks] = useState(() => {
//     const savedClicks = localStorage.getItem("saved-clicks");

//     if (savedClicks !== null) {
//       return JSON.parse(savedClicks);
//     }
//     return 0;
//   });

//   useEffect(() => {
//     localStorage.setItem("saved-clicks", JSON.stringify(clicks));
//   }, [clicks]);

//   return (
//     <div>
//       <button onClick={() => setClicks(clicks + 1)}>
//         You clicked {clicks} times
//       </button>
//       <button onClick={() => setClicks(0)}>Reset</button>
//     </div>
//   );
// }

export default function App() {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    console.log("First updated:", first);
  }, [first]);

  useEffect(() => {
    console.log("Second updated:", second);
  }, [second]);

  // 3. При кожному рендері (бо без залежностей)
  useEffect(() => {
    console.log("First or second updated:", first + second);
  }, [first, second]);

  return (
    <>
      <button onClick={() => setFirst(first + 1)}>First {first}</button>
      <button onClick={() => setSecond(second + 1)}>Second {second}</button>
    </>
  );
}
