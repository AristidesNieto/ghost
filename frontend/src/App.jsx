import { useState, useEffect } from "react";

const matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const App = () => {
  const [ghostX, setGhostX] = useState(6);
  const [ghostY, setGhostY] = useState(8);
  const [pacX, setPacX] = useState(9);
  const [pacY, setPacY] = useState(9);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8000/run")
        .then(res => res.json())
        .then(res => {
          // Busca los agentes por tipo
          const ghost = res.agents.find(a => a.type === "Ghost");
          const pacman = res.agents.find(a => a.type === "PacMan");
          if (ghost) {
            setGhostX(ghost.pos[0] - 1);
            setGhostY(ghost.pos[1] - 1);
          }
          if (pacman) {
            setPacX(pacman.pos[0] - 1);
            setPacY(pacman.pos[1] - 1);
          }
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return ( 
    <div>
      <svg width="800" height="500" xmlns="http://www.w3.org/2000/svg">
        {
          matrix.map((row, rowidx) =>
            row.map((value, colidx) =>
              <rect key={`${rowidx}-${colidx}`} x={250 + 25 * rowidx} y={5 + 25 * colidx} width={25} height={25} fill={value === 1 ? "lightgray" : "gray"} />
            )
          )
        }
        <image x={255 + 25 * ghostX} y={9 + 25 * ghostY} href="/ghost.png" width="25" height="25"/>
        <image x={255 + 25 * pacX} y={9 + 25 * pacY} href="/pacman.png" width="25" height="25"/>
      </svg>
    </div>
  );
};

export default App;