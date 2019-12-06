import React from 'react';
import SLDropDown from './components/SLDropDown';

const App: React.FC = () => {
  const drinks : Array<string> = ['Beer', 'Beherovka', 'Vodka', 'Vino', 'Wine'];
  const placeholder = 'Pick a drink';
  const value = drinks[0];

  return (
    <div className="App">
      <header>
      </header>
      <section>
        <SLDropDown options={drinks} placeholder={placeholder} text={value} itemsVisible={5} onChange={(option :string) => console.log(option)} />        
      </section>
    </div>
  );
}

export default App;
