import React from 'react';
import { Clock } from 'lucide-react';

interface ReminderPickerProps {
  selectedTime?: string;
  onSelect: (time: string) => void;
  onClose: () => void;
}

const ReminderPicker: React.FC<ReminderPickerProps> = ({ selectedTime, onSelect, onClose }) => {
  const times = [
    { label: 'Later today', value: new Date(Date.now() + 3600000).toISOString() },
    { label: 'Tomorrow', value: new Date(Date.now() + 86400000).toISOString() },
    { label: 'Next week', value: new Date(Date.now() + 604800000).toISOString() },
    { label: 'Custom', value: 'custom' },
  ];

  return (
    <div
      className="bg-gray-800 rounded-lg shadow-xl p-2 w-64"
      onClick={(e) => e.stopPropagation()}
    >
      {times.map(({ label, value }) => (
        <button
          key={label}
          onClick={() => onSelect(value)}
          className={`
            w-full flex items-center px-3 py-2 rounded-md text-left
            ${selectedTime === value ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
          `}
        >
          <Clock className="w-4 h-4 mr-2" />
          {label}
        </button>
      ))}
    </div>
  );
};

export default ReminderPicker;