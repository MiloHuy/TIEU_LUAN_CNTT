import { CalendarRange, X } from 'lucide-react';

const ToggleButton = (e) => {
    return e.isEmpty ? <CalendarRange size={20} strokeWidth={1} /> : <X size={20} strokeWidth={1} />;
};

export default ToggleButton;
