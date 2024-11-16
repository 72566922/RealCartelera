import React, { useState } from 'react';

const SimpleButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Haz clic aquí</button>
      {clicked && <p>¡Botón clickeado!</p>}
    </div>
  );
};

export default SimpleButton;
