// SmartInput.jsx
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

const SmartInput = ({ id, label, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const blurTimeoutRef = useRef(null);

  const handleBlur = () => {
    // Delay to ensure onChange completes before hiding
    blurTimeoutRef.current = setTimeout(() => {
      setIsEditing(false);
    }, 100);
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    setIsEditing(true);
  };

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {isEditing ? (
        <InputTextarea
          id={id}
          value={value}
          autoResize
          rows={3}
          onChange={onChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <InputText
          id={id}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
        />
      )}
    </div>
  );
};

export default SmartInput;
