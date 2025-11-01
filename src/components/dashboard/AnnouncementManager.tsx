import { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Eye, EyeOff, ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import { Announcement } from '@/types/dashboard.types';
import Button from '@components/ui/Button';

interface AnnouncementManagerProps {
  announcements: Announcement[];
  onUpdate: (announcements: Announcement[]) => void;
  canAccess: boolean;
  lang: 'en' | 'ta';
}

export default function AnnouncementManager({ 
  announcements, 
  onUpdate, 
  canAccess, 
  lang 
}: AnnouncementManagerProps) {
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [draggedAnnouncement, setDraggedAnnouncement] = useState<Announcement | null>(null);

  const activeAnnouncements = announcements.filter(a => a.isActive).sort((a, b) => a.displayOrder - b.displayOrder);

  const handleAdd = () => {
    setEditingAnnouncement({
      id: Date.now().toString(),
      title: '',
      description: '',
      isActive: true,
      displayOrder: announcements.length + 1,
      createdAt: new Date(),
    });
    setShowModal(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setShowModal(true);
  };

  const handleSave = (announcement: Announcement) => {
    if (announcements.find(a => a.id === announcement.id)) {
      onUpdate(announcements.map(a => a.id === announcement.id ? announcement : a));
    } else {
      onUpdate([...announcements, announcement]);
    }
    setShowModal(false);
    setEditingAnnouncement(null);
  };

  const handleDelete = (id: string) => {
    if (confirm(lang === 'en' ? 'Delete this announcement?' : 'இந்த அறிவிப்பை நீக்கவா?')) {
      onUpdate(announcements.filter(a => a.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    onUpdate(announcements.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

  const handleDragStart = (announcement: Announcement) => {
    setDraggedAnnouncement(announcement);
  };

  const handleDrop = (targetAnnouncement: Announcement) => {
    if (!draggedAnnouncement) return;

    const reordered = [...announcements];
    const dragIndex = reordered.findIndex(a => a.id === draggedAnnouncement.id);
    const targetIndex = reordered.findIndex(a => a.id === targetAnnouncement.id);

    reordered.splice(dragIndex, 1);
    reordered.splice(targetIndex, 0, draggedAnnouncement);

    const updated = reordered.map((a, index) => ({ ...a, displayOrder: index + 1 }));
    onUpdate(updated);
    setDraggedAnnouncement(null);
  };

  // Carousel navigation
  const nextSlide = () => {
    setPreviewIndex((prev) => (prev + 1) % activeAnnouncements.length);
  };

  const prevSlide = () => {
    setPreviewIndex((prev) => (prev - 1 + activeAnnouncements.length) % activeAnnouncements.length);
  };

  return (
    <div className="space-y-6">
      {/* Preview Carousel */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">
              {lang === 'en' ? 'Carousel Preview' : 'சுழல் முன்னோட்டம்'}
            </h3>
          </div>
          <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 aspect-[16/9] sm:aspect-[21/9]">
            {activeAnnouncements[previewIndex].imageUrl ? (
              <img 
                src={activeAnnouncements[previewIndex].imageUrl} 
                alt={activeAnnouncements[previewIndex].title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ImageIcon className="w-16 h-16 text-gray-300" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white w-full">
                <h3 className="text-2xl font-bold mb-2">
                  {lang === 'en' 
                    ? activeAnnouncements[previewIndex].title 
                    : (activeAnnouncements[previewIndex].titleTamil || activeAnnouncements[previewIndex].title)}
                </h3>
                <p className="text-sm opacity-90">
                  {lang === 'en' 
                    ? activeAnnouncements[previewIndex].description 
                    : (activeAnnouncements[previewIndex].descriptionTamil || activeAnnouncements[previewIndex].description)}
                </p>
              </div>
            </div>

            {activeAnnouncements.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {activeAnnouncements.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPreviewIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === previewIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">
            {lang === 'en' ? 'Manage Announcements' : 'அறிவிப்புகளை நிர்வகிக்கவும்'}
          </h3>
          <Button onClick={handleAdd} disabled={!canAccess} size="sm">
            <Plus className="w-4 h-4" />
            {lang === 'en' ? 'Add' : 'சேர்'}
          </Button>
        </div>

        <div className="p-4 space-y-3">
          {announcements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>{lang === 'en' ? 'No announcements yet' : 'இன்னும் அறிவிப்புகள் இல்லை'}</p>
            </div>
          ) : (
            announcements.sort((a, b) => a.displayOrder - b.displayOrder).map((announcement) => (
              <div
                key={announcement.id}
                draggable={canAccess}
                onDragStart={() => handleDragStart(announcement)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(announcement)}
                className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-all"
              >
                {canAccess && (
                  <div className="cursor-grab active:cursor-grabbing pt-1">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {announcement.imageUrl ? (
                  <img 
                    src={announcement.imageUrl} 
                    alt={announcement.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {announcement.title}
                  </h4>
                  <p className="text-sm text-gray-500 truncate">
                    {announcement.description}
                  </p>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => handleToggleActive(announcement.id)}
                    disabled={!canAccess}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                    title={announcement.isActive ? 'Hide' : 'Show'}
                  >
                    {announcement.isActive ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(announcement)}
                    disabled={!canAccess}
                    className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    disabled={!canAccess}
                    className="p-2 hover:bg-red-50 rounded-lg disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && editingAnnouncement && (
        <AnnouncementModal
          announcement={editingAnnouncement}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingAnnouncement(null);
          }}
          lang={lang}
        />
      )}
    </div>
  );
}

// Announcement Modal Component
interface AnnouncementModalProps {
  announcement: Announcement;
  onSave: (announcement: Announcement) => void;
  onClose: () => void;
  lang: 'en' | 'ta';
}

function AnnouncementModal({ announcement, onSave, onClose, lang }: AnnouncementModalProps) {
  const [formData, setFormData] = useState(announcement);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, imageUrl: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert(lang === 'en' ? 'Title is required' : 'தலைப்பு தேவை');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex-shrink-0 border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">
            {announcement.id ? (lang === 'en' ? 'Edit Announcement' : 'அறிவிப்பை திருத்து') : (lang === 'en' ? 'Add Announcement' : 'அறிவிப்பு சேர்')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {lang === 'en' ? 'Title (English)' : 'தலைப்பு (English)'} *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {lang === 'en' ? 'Title (Tamil)' : 'தலைப்பு (தமிழ்)'}
                </label>
                <input
                  type="text"
                  value={formData.titleTamil || ''}
                  onChange={(e) => setFormData({ ...formData, titleTamil: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {lang === 'en' ? 'Description (English)' : 'விளக்கம் (English)'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  {lang === 'en' ? 'Description (Tamil)' : 'விளக்கம் (தமிழ்)'}
                </label>
                <textarea
                  value={formData.descriptionTamil || ''}
                  onChange={(e) => setFormData({ ...formData, descriptionTamil: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                {lang === 'en' ? 'Banner Image' : 'பேனர் படம்'}
              </label>
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer block">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="max-h-40 mx-auto rounded" />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">{lang === 'en' ? 'Click to upload' : 'பதிவேற்ற கிளிக் செய்க'}</p>
                  </>
                )}
              </label>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                {lang === 'en' ? 'Link (Optional)' : 'இணைப்பு (விருப்பம்)'}
              </label>
              <input
                type="url"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://..."
              />
            </div>
          </div>
        </form>

        <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary">
            {lang === 'en' ? 'Cancel' : 'ரத்து'}
          </Button>
          <Button onClick={handleSubmit}>
            {lang === 'en' ? 'Save' : 'சேமி'}
          </Button>
        </div>
      </div>
    </div>
  );
}