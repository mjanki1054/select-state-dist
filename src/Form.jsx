import React, { useState, useEffect } from 'react';
import data from './Data.json';

const Form = () => {
  const [selectedState, setSelectedState] = useState(data.states[0]?.value || '');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setSelectedDistrict('');
    setSelectedBlock('');
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);
    setSelectedBlock('');
  };

  const handleBlockChange = (event) => {
    const selectedBlock = event.target.value;
    setSelectedBlock(selectedBlock);
  };

  useEffect(() => {
    setSelectedState(data.states[0]?.value || '');
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          Select State:
        </label>
        <select
          id="state"
          value={selectedState}
          onChange={handleStateChange}
          className="mt-1 p-2 border rounded-md w-full"
        >
          {data.states.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {selectedState && (
        <div className="mb-4">
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            Select District:
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            {(data.states.find((state) => state.value === selectedState)?.districts || []).map(
              (district) => (
                <option key={district.value} value={district.value}>
                  {district.label}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {selectedDistrict && (
        <div className="mb-4">
          <label htmlFor="block" className="block text-sm font-medium text-gray-700">
            Select Block:
          </label>
          <select
            id="block"
            value={selectedBlock}
            onChange={handleBlockChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            {(data.states.find((state) => state.value === selectedState)?.districts
              .find((district) => district.value === selectedDistrict)?.blocks || []).map((block) => (
                <option key={block.value} value={block.value}>
                  {block.label}
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Form;
