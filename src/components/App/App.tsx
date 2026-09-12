// import axios from "axios";
// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";
import Timer from "../Timer/Timer";

// export default function App() {
//   const [count, setCount] = useState(1);
//   const [person, setPerson] = useState(null);

//   useEffect(() => {
//     async function fetchCharacter() {
//       const response = await axios.get(
//         `https://swapi.info/api/people/${count}`,
//       );
//       setPerson(response.data);
//     }
//     fetchCharacter();

//     // console.log("Effect run");
//     // await axios
//     //   .get(`https://swapi.info/api/people/${count}`)
//     //   .then((response) => setPerson(response.data));
//   }, [count]);

//   console.log("App rendered");

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>Count value {count}</button>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }

export default function App() {
  // const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Effect ran for: ${count}`);
    return () => {
      console.log(`Clean up for ${count}`);
    };
  }, [count]);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count is {count}</button>
    </>
  );
}
