import React, { useState } from 'react';

const ToggleComponent = () => {
  const [isToggled, setToggled] = useState(false);

  return (
    <div>
      <button onClick={() => setToggled(!isToggled)}>
        {isToggled ? 'Turn Off' : 'Turn On'}
      </button>
      {isToggled && <p>Toggle is ON!</p>}
    </div>
  );
};

export default ToggleComponent;