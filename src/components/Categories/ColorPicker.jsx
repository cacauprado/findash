'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import './ColorPicker.css';

/**
 * 🎨 Seletor de cores com paleta
 * @param {Object} props
 * @param {string} props.value - Cor selecionada (hex)
 * @param {Function} props.onChange - Callback ao mudar
 * @param {Array} props.palette - Array de cores hex
 */
export default function ColorPicker({ value, onChange, palette = [] }) {
  const [hexInput, setHexInput] = useState(value);
  const [copied, setCopied] = useState(false);
  const [inputError, setInputError] = useState(false);

  // Sincronizar com valor externo
  useEffect(() => {
    setHexInput(value);
  }, [value]);

  /**
   * 🔐 Validar e processar hex
   */
  const isValidHex = (hex) => {
    return /^#[0-9A-F]{6}$/i.test(hex);
  };

  /**
   * 📄 Selecionar cor da paleta
   */
  const handleSelectColor = (color) => {
    onChange(color);
    setHexInput(color);
    setInputError(false);
  };

  /**
   * ✏️ Atualizar entrada hex manual
   */
  const handleHexInput = (e) => {
    const val = e.target.value;
    setHexInput(val);

    if (isValidHex(val)) {
      onChange(val);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  /**
   * 📋 Copiar cor para clipboard
   */
  const handleCopyColor = async () => {
    try {
      await navigator.clipboard.writeText(hexInput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('❌ Erro ao copiar:', error);
    }
  };

  /**
   * 🎨 Gerar cor aleatória
   */
  const handleRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
    handleSelectColor(randomColor);
  };

  return (
    <div className="color-picker-container">
      {/* Preview */}
      <div className="color-picker-preview">
        <div
          className="color-preview-box"
          style={{
            backgroundColor: isValidHex(hexInput) ? hexInput : '#cccccc',
            borderColor: inputError ? '#ff6b6b' : '#ddd',
          }}
        />
        <div className="color-preview-info">
          <div className="preview-label">Cor Selecionada</div>
          <div className="preview-value">{hexInput}</div>
        </div>
      </div>

      {/* Entrada hex manual */}
      <div className="color-picker-input-group">
        <label htmlFor="hex-input">Digite um hex:</label>
        <div className="hex-input-wrapper">
          <input
            id="hex-input"
            type="text"
            value={hexInput}
            onChange={handleHexInput}
            placeholder="#FF6B6B"
            maxLength={7}
            className={inputError ? 'error' : ''}
          />
          <button
            type="button"
            onClick={handleCopyColor}
            className="hex-copy-btn"
            title="Copiar hex"
          >
            {copied ? (
              <Check size={16} style={{ color: '#06a77d' }} />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
        {inputError && (
          <span className="input-error">❌ Formato inválido (use #RRGGBB)</span>
        )}
      </div>

      {/* Ações */}
      <div className="color-picker-actions">
        <button
          type="button"
          onClick={handleRandomColor}
          className="btn btn-secondary btn-small"
        >
          🎨 Aleatória
        </button>
      </div>

      {/* Paleta de cores */}
      {palette.length > 0 && (
        <>
          <div className="color-picker-label">Paleta de Cores</div>
          <div className="color-picker-palette">
            {palette.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleSelectColor(color)}
                className={`color-swatch ${
                  value === color ? 'selected' : ''
                }`}
                style={{
                  backgroundColor: color,
                  borderColor: value === color ? '#000' : '#ccc',
                }}
                title={color}
              >
                {value === color && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
