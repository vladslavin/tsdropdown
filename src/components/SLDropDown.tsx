import React, {MouseEvent, useEffect, useState, useRef, ChangeEvent} from 'react';
import './SLDropDown.css';

type SLDropDownProps = {
  options?: Array<string>,
  text?: string,
  placeholder?: string,
  itemsVisible?: number,
  onChange?: (option: string) => void
}

const SLDropDown: React.FC<SLDropDownProps> = ({options, text, placeholder, itemsVisible = 5, onChange}) => {
  const containerRef = useRef(null);
  const defaultPlaceholder: string = placeholder || 'Pick something';
  const defaultOptions : Array<string> = options || [];

  const [dropAreaVisible, setDropAreaVisible] = useState(false);
  const [inputValue, setInputValue] = useState(text || '');
  const filteredOptions = (query: string) => (defaultOptions.filter(o => o.toLowerCase().includes(query.toLowerCase())));
  
  const globalEventListener : any = (event: MouseEvent) => {
    const target: HTMLElement = event.target as HTMLElement;
    const container: HTMLElement = containerRef.current!;
    if (!container.contains(target)) {
      setDropAreaVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", globalEventListener);
    return () => {
      document.removeEventListener("click", globalEventListener);
    };
  }, []);

  const inputOnChange = (event: ChangeEvent): void => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: string = target.value;
    setInputValue(value);
  }
  const itemOnMouseOver = (event: MouseEvent): void  => {
    const target: HTMLLIElement = event.target as HTMLLIElement;
    target.style.backgroundColor = 'whitesmoke';
    target.style.cursor = 'pointer';
  }
  const itemOnMouseOut = (event: MouseEvent): void  => {
    const target: HTMLLIElement = event.target as HTMLLIElement;
    target.style.backgroundColor = 'white';
  }
  const itemClick = (event: MouseEvent): void => {
    const target: HTMLLIElement = event.target as HTMLLIElement;
    const value: string = target.textContent!;
    setInputValue(value);
    if (onChange) {
      onChange(value); 
    }
    setDropAreaVisible(false);
  }
  const inputClick = (event: MouseEvent): void => setDropAreaVisible(defaultOptions.length > 0);
  const dynamicHeight = Math.min(itemsVisible, filteredOptions(inputValue).length) * 34;
  
  return (
    <div className="dd-container-area" ref={containerRef}>
      <button className="dd-close-icon" style={{visibility: (inputValue ? 'visible' : 'hidden')}} onClick={() => setInputValue('')}></button>
      <input placeholder={defaultPlaceholder} className="dd-input" type="text" onChange={inputOnChange} onClick={inputClick} value={inputValue}></input>
      <ul className="dd-options-area" style={{display: (dropAreaVisible ? 'block' : 'none'), height: dynamicHeight}}>
        {filteredOptions(inputValue).map((item, i) => <li key={i} className="dd-option-item" onMouseOver={itemOnMouseOver} onMouseOut={itemOnMouseOut} onClick={itemClick}>{item}</li>)}
      </ul>
    </div>
  );
}

export default SLDropDown;
