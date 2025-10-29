import { useState } from 'react';
import { Plus, Trash2, Save, Clock, AlertCircle, GripVertical } from 'lucide-react';
import { Restaurant, TimeSlot } from '@/types/dashboard.types';
import { t } from '@utils/translations';
import Button from '@components/ui/Button';

interface TimeSlotsTabProps {
  restaurant: Restaurant;
  onUpdate: (updates: Partial<Restaurant>) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

const DEFAULT_SLOTS: TimeSlot[] = [
  { id: '1', type: 'breakfast', start: '06:00', end: '11:00' },
  { id: '2', type: 'lunch', start: '11:00', end: '16:00' },
  { id: '3', type: 'snacks', start: '16:00', end: '19:00' },
  { id: '4', type: 'dinner', start: '19:00', end: '23:30' },
];

export default function TimeSlotsTab({ restaurant, onUpdate, canAccess, lang }: TimeSlotsTabProps) {
  const [slots, setSlots] = useState<TimeSlot[]>(restaurant.timeSlots || DEFAULT_SLOTS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draggedSlot, setDraggedSlot] = useState<TimeSlot | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const timeSlotTypes = [
    { value: 'breakfast', label: lang === 'en' ? 'Breakfast' : 'காலை உணவு' },
    { value: 'lunch', label: lang === 'en' ? 'Lunch' : 'மதிய உணவு' },
    { value: 'snacks', label: lang === 'en' ? 'Snacks' : 'சிற்றுண்டி' },
    { value: 'dinner', label: lang === 'en' ? 'Dinner' : 'இரவு உணவு' },
    { value: 'latenight', label: lang === 'en' ? 'Late Night' : 'இரவு நேரம்' },
    { value: 'earlymorning', label: lang === 'en' ? 'Early Morning' : 'அதிகாலை' },
    { value: 'brunch', label: lang === 'en' ? 'Brunch' : 'பிரஞ்ச்' },
    { value: 'allday', label: lang === 'en' ? 'All Day' : 'முழு நாள்' },
  ];

  const validateSlots = (): boolean => {
    const newErrors: Record<string, string> = {};

    slots.forEach((slot, index) => {
      // Check if start time is before end time
      if (slot.start >= slot.end) {
        newErrors[`${slot.id}-time`] = lang === 'en' 
          ? 'Start time must be before end time' 
          : 'தொடக்க நேரம் முடிவு நேரத்திற்கு முன் இருக்க வேண்டும்';
      }

      // Check for overlaps with other slots
      slots.forEach((otherSlot, otherIndex) => {
        if (index !== otherIndex) {
          const slotStart = slot.start;
          const slotEnd = slot.end;
          const otherStart = otherSlot.start;
          const otherEnd = otherSlot.end;

          // Check if slots overlap
          if (
            (slotStart >= otherStart && slotStart < otherEnd) ||
            (slotEnd > otherStart && slotEnd <= otherEnd) ||
            (slotStart <= otherStart && slotEnd >= otherEnd)
          ) {
            newErrors[`${slot.id}-overlap`] = lang === 'en'
              ? `Overlaps with ${otherSlot.type}`
              : `${otherSlot.type} உடன் ஒன்றுடன் ஒன்று சேர்கிறது`;
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      type: 'breakfast',
      start: '00:00',
      end: '23:59',
    };
    setSlots([...slots, newSlot]);
  };

  const handleUpdateSlot = (id: string, field: keyof TimeSlot, value: string) => {
    setSlots(slots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
    // Clear errors for this slot when user makes changes
    const newErrors = { ...errors };
    delete newErrors[`${id}-time`];
    delete newErrors[`${id}-overlap`];
    setErrors(newErrors);
  };

  const handleDeleteSlot = (id: string) => {
    if (slots.length <= 1) {
      alert(lang === 'en' 
        ? 'You must have at least one time slot.' 
        : 'குறைந்தது ஒரு நேர இடைவெளி இருக்க வேண்டும்.');
      return;
    }

    if (confirm(lang === 'en' ? 'Delete this time slot?' : 'இந்த நேர இடைவெளியை நீக்கவா?')) {
      setSlots(slots.filter(slot => slot.id !== id));
    }
  };

  const handleSave = () => {
    if (!validateSlots()) {
      alert(lang === 'en' 
        ? 'Please fix the errors before saving.' 
        : 'சேமிப்பதற்கு முன் பிழைகளை சரிசெய்யவும்.');
      return;
    }

    onUpdate({ timeSlots: slots });
    alert(lang === 'en' ? 'Time slots saved successfully!' : 'நேர இடைவெளிகள் வெற்றிகரமாக சேமிக்கப்பட்டன!');
  };

  // Drag and Drop Handlers
  const handleDragStart = (slot: TimeSlot) => {
    setDraggedSlot(slot);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedSlot(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedSlot) {
      setDragOverIndex(null);
      return;
    }

    const draggedIndex = slots.findIndex(slot => slot.id === draggedSlot.id);

    if (draggedIndex === targetIndex) {
      setDraggedSlot(null);
      setDragOverIndex(null);
      return;
    }

    const reorderedSlots = [...slots];
    reorderedSlots.splice(draggedIndex, 1);
    reorderedSlots.splice(targetIndex, 0, draggedSlot);

    setSlots(reorderedSlots);
    setDraggedSlot(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <div className="flex gap-3">
          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900 font-medium mb-1">
              {lang === 'en' ? 'Restaurant Operating Hours' : 'உணவக இயக்க நேரம்'}
            </p>
            <p className="text-sm text-blue-800">
              {lang === 'en' 
                ? 'Define when different menu categories are available. You can add custom time slots for late night, early morning, or 24/7 operations.' 
                : 'வெவ்வேறு மெனு வகைகள் எப்போது கிடைக்கும் என்பதை வரையறுக்கவும். இரவு நேரம், அதிகாலை அல்லது 24/7 செயல்பாடுகளுக்கு தனிப்பயன் நேர இடைவெளிகளை சேர்க்கலாம்.'}
            </p>
          </div>
        </div>
      </div>

      {/* Reorder Hint */}
      {canAccess && slots.length > 1 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 flex items-center gap-3">
          <div className="flex-shrink-0 text-purple-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-purple-900">
            {lang === 'en' 
              ? 'Drag time slots using the ⋮⋮ handle to reorder them.'
              : 'நேர இடைவெளிகளை மறுவரிசைப்படுத்த ⋮⋮ ஐப் பயன்படுத்தி இழுக்கவும்.'}
          </p>
        </div>
      )}

      {/* Time Slots */}
      <div className="space-y-4">
        {slots.map((slot, index) => (
          <div
            key={slot.id}
            draggable={canAccess}
            onDragStart={() => handleDragStart(slot)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, index)}
            className={`transition-all ${
              dragOverIndex === index && draggedSlot?.id !== slot.id
                ? 'border-t-2 border-primary-500 pt-2'
                : ''
            }`}
          >
            <div 
              className={`bg-white border rounded-lg p-4 sm:p-6 transition-all ${
                draggedSlot?.id === slot.id 
                  ? 'shadow-2xl opacity-90 ring-2 ring-primary-500' 
                  : 'border-gray-200'
              } ${errors[`${slot.id}-time`] || errors[`${slot.id}-overlap`] ? 'border-red-300 bg-red-50' : ''}`}
            >
              <div className="flex gap-4">
                {/* Drag Handle */}
                {canAccess && (
                  <div 
                    className="flex items-start cursor-grab active:cursor-grabbing pt-2"
                    title={lang === 'en' ? 'Drag to reorder' : 'வரிசையை மாற்ற இழுக்கவும்'}
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  </div>
                )}

                <div className="flex-1 space-y-4">
                  {/* Time Slot Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      {lang === 'en' ? 'Time Slot Name' : 'நேர இடைவெளி பெயர்'}
                    </label>
                    <select
                      value={slot.type}
                      onChange={(e) => handleUpdateSlot(slot.id, 'type', e.target.value)}
                      disabled={!canAccess}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                    >
                      {timeSlotTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Time Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        {lang === 'en' ? 'Start Time' : 'தொடக்க நேரம்'}
                      </label>
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => handleUpdateSlot(slot.id, 'start', e.target.value)}
                        disabled={!canAccess}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        {lang === 'en' ? 'End Time' : 'முடிவு நேரம்'}
                      </label>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => handleUpdateSlot(slot.id, 'end', e.target.value)}
                        disabled={!canAccess}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Error Messages */}
                  {(errors[`${slot.id}-time`] || errors[`${slot.id}-overlap`]) && (
                    <div className="flex items-start gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        {errors[`${slot.id}-time`] && <p>{errors[`${slot.id}-time`]}</p>}
                        {errors[`${slot.id}-overlap`] && <p>{errors[`${slot.id}-overlap`]}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {/* Delete Button */}
                {canAccess && (
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors self-start"
                    title={t('delete', lang)}
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add & Save Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
        <Button
          onClick={handleAddSlot}
          disabled={!canAccess}
          variant="secondary"
        >
          <Plus className="w-5 h-5" />
          {lang === 'en' ? 'Add Time Slot' : 'நேர இடைவெளி சேர்'}
        </Button>

        <Button onClick={handleSave} disabled={!canAccess}>
          <Save className="w-5 h-5" />
          {t('save', lang)}
        </Button>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">
          {lang === 'en' ? 'Examples' : 'உதாரணங்கள்'}
        </h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• {lang === 'en' ? '24/7 Restaurant: 00:00 - 23:59 (All Day)' : '24/7 உணவகம்: 00:00 - 23:59 (முழு நாள்)'}</li>
          <li>• {lang === 'en' ? 'Late Night: 22:00 - 04:00 (overnight service)' : 'இரவு நேரம்: 22:00 - 04:00 (இரவு முழுவதும் சேவை)'}</li>
          <li>• {lang === 'en' ? 'Early Morning: 05:00 - 08:00 (before breakfast)' : 'அதிகாலை: 05:00 - 08:00 (காலை உணவுக்கு முன்)'}</li>
          <li>• {lang === 'en' ? 'Brunch: 10:00 - 14:00 (weekend special)' : 'பிரஞ்ச்: 10:00 - 14:00 (வார இறுதி சிறப்பு)'}</li>
        </ul>
      </div>
    </div>
  );
}