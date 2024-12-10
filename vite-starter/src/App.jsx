import { useState } from 'react';
import './App.css';
import { kebabCaseToTitleCase } from './helpers';

function App() {

  const [buttonColor, setButtonColor] = useState('medium-violet-red');
  const [disabled, setDisabled] = useState(false);

  const nextColorClass = buttonColor === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';

  const nextColorTitleCase = kebabCaseToTitleCase(nextColorClass);

  const className = disabled ? "gray" : buttonColor;

  const handleCheckboxClick = (e) => {
    setDisabled(e.target.checked);
  }

  return (
    <div>
      <button
        className={className}
        disabled={disabled}
        onClick={() => setButtonColor(nextColorClass)}
      >Change to {nextColorTitleCase}</button>

      <br />
      <input
        type='checkbox'
        id="disable-button-checkbox"
        defaultChecked={disabled}
        onChange={(e) =>
          setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>

  );
}

export default App;
