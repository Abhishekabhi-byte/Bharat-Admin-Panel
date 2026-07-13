// app/festival/page.js
'use client';

import React, { useState } from 'react';
import { 
  PartyPopper, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Calendar,
  Image,
  Images,
  CheckCircle
} from 'lucide-react';

export default function FestivalPage() {
  const [festivals, setFestivals] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      title: 'Diwali Celebration 2025',
      description: 'Celebrated the festival of lights with team members and their families. Organized cultural events, traditional food, and a spectacular fireworks show.',
      galleryImages: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250'
      ],
      date: '2025-10-31',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      title: 'Holi Fest 2025',
      description: 'Colorful celebration of Holi with organic colors, music, dance, and traditional sweets. Team bonding activities and cultural performances.',
      galleryImages: [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250'
      ],
      date: '2025-03-14',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      title: 'Christmas Gala 2024',
      description: 'Annual Christmas celebration with gift exchange, carol singing, and a special dinner for all employees and their families.',
      galleryImages: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250'
      ],
      date: '2024-12-25',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      title: 'Eid Celebration 2025',
      description: 'Celebrated Eid with traditional food, cultural activities, and festive decorations. Employees shared their cultural traditions and enjoyed together.',
      galleryImages: [
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250'
      ],
      date: '2025-06-20',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      title: 'Pongal Celebration 2026',
      description: 'Traditional Pongal celebration with cultural programs, traditional attire, and festive feast for all employees.',
      galleryImages: [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250'
      ],
      date: '2026-01-15',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      title: 'New Year Celebration 2026',
      description: 'Rang in the new year with a grand party, entertainment, and team celebrations. Fun activities and memories created.',
      galleryImages: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
        'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250'
      ],
      date: '2026-01-01',
      createdAt: '2026-07-09'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [date, setDate] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingFestival, setViewingFestival] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter festivals based on search
  const filteredFestivals = festivals.filter(festival =>
    festival.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    festival.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFestivals.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFestivals = filteredFestivals.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    e.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB.');
      return;
    }

    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';

    if (!files.length) return;

    // Validate each file
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not a valid image file.`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB.`);
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setGalleryImages([...galleryImages, ...validFiles]);
    setGalleryPreviews([...galleryPreviews, ...newPreviews]);
  };

  const removeGalleryImage = (index) => {
    if (galleryPreviews[index] && !galleryPreviews[index].startsWith('http')) {
      URL.revokeObjectURL(galleryPreviews[index]);
    }
    const newImages = [...galleryImages];
    const newPreviews = [...galleryPreviews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setGalleryImages(newImages);
    setGalleryPreviews(newPreviews);
  };

  const handleCreateFestival = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select a main image.');
    if (!title.trim()) return alert('Please enter a title.');
    if (!description.trim()) return alert('Please enter a description.');
    if (!date) return alert('Please select a date.');
    if (!galleryPreviews.length) return alert('Please add at least one gallery image.');

    const newFestival = {
      id: Date.now(),
      imageUrl: previewUrl,
      title: title.trim(),
      description: description.trim(),
      galleryImages: galleryPreviews,
      date: date,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setFestivals([newFestival, ...festivals]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (festival) => {
    setEditingId(festival.id);
    setPreviewUrl(festival.imageUrl);
    setTitle(festival.title);
    setDescription(festival.description);
    setGalleryPreviews([...festival.galleryImages]);
    setGalleryImages([]); // Reset files as we're editing
    setDate(festival.date);
    setIsModalOpen(true);
  };

  const handleUpdateFestival = (e) => {
    e.preventDefault();
    if (!previewUrl) return alert('Please select a main image.');
    if (!title.trim()) return alert('Please enter a title.');
    if (!description.trim()) return alert('Please enter a description.');
    if (!date) return alert('Please select a date.');
    if (!galleryPreviews.length) return alert('Please add at least one gallery image.');

    const updatedFestivals = festivals.map(festival =>
      festival.id === editingId
        ? {
            ...festival,
            imageUrl: previewUrl,
            title: title.trim(),
            description: description.trim(),
            galleryImages: galleryPreviews,
            date: date
          }
        : festival
    );

    setFestivals(updatedFestivals);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this festival entry?')) {
      // Clean up gallery preview URLs
      const festival = festivals.find(f => f.id === id);
      if (festival) {
        festival.galleryImages.forEach(url => {
          if (!url.startsWith('http')) URL.revokeObjectURL(url);
        });
      }
      
      const updatedFestivals = festivals.filter(festival => festival.id !== id);
      setFestivals(updatedFestivals);
      const newTotalPages = Math.ceil(updatedFestivals.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  };

  const handleView = (festival) => {
    setViewingFestival(festival);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }
    galleryPreviews.forEach(url => {
      if (!url.startsWith('http')) URL.revokeObjectURL(url);
    });
    setImage(null);
    setPreviewUrl('');
    setTitle('');
    setDescription('');
    setGalleryImages([]);
    setGalleryPreviews([]);
    setDate('');
    setEditingId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Truncate helper
  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto px-1">
      
  
      {/* Table */}
      <div className="bg-white rounded-xl mt-4 border border-red-200/50 shadow-sm overflow-hidden flex flex-col justify-between">
        {/* Table Header with Search */}
             <div className="flex justify-end w-full">
             <div className="flex flex-col sm:flex-row p-4 items-stretch sm:items-center gap-3 max-w-xl w-full sm:w-auto">
               <div className="relative sm:w-80">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                 <input
                   type="text"
                   placeholder="Search festivals..."
                   className="w-full pl-10 pr-4 py-2 text-black border  border-red-200 rounded-lg"
                 />
               </div>
           
               <button
                 onClick={() => setIsModalOpen(true)}
                 className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl whitespace-nowrap"
               >
                 <Plus className="w-4 h-4" />
                 Add New Festival
               </button>
             </div>
           </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-[#7d3431]/5 to-[#cb8c89]/5 border-b border-red-200 text-black font-bold uppercase text-xs tracking-wider">
                <th className="px-6 py-3.5 w-[120px]">Image</th>
                <th className="px-6 py-3.5">Title</th>
                <th className="px-6 py-3.5">Description</th>
                <th className="px-6 py-3.5 w-[140px]">Date</th>
                <th className="px-6 py-3.5 w-[180px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {currentFestivals.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-16 text-black/40">
                    <PartyPopper className="w-10 h-10 mx-auto opacity-20 mb-2" />
                    <p className="font-medium text-sm">No festivals found</p>
                  </td>
                </tr>
              ) : (
                currentFestivals.map((festival) => (
                  <tr key={festival.id} className="hover:bg-[#7d3431]/5 transition-colors">
                    <td className="px-6 py-3">
                      <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden border border-red-200 shadow-sm">
                        <img src={festival.imageUrl} alt={festival.title} className="w-full h-full object-cover" />
                      </div>
                    </td>

                    <td className="px-6 py-3">
                      <span className="font-semibold text-black block max-w-xs truncate">{festival.title}</span>
                    </td>

                    <td className="px-6 py-3">
                      <span className="text-black/70 block max-w-sm">
                        {truncateText(festival.description, 40)}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-black/70 font-medium whitespace-nowrap text-xs">
                      {formatDate(festival.date)}
                    </td>

                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleView(festival)}
                          title="View" 
                          className="p-2 text-black/50 rounded-lg hover:text-[#7d3431] hover:bg-[#7d3431]/10 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(festival)}
                          title="Edit" 
                          className="p-2 text-black/50 rounded-lg hover:text-[#a55d5b] hover:bg-[#a55d5b]/10 transition-all duration-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(festival.id)}
                          title="Delete" 
                          className="p-2 text-black/50 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredFestivals.length > 0 && (
          <div className="px-6 py-3.5 border-t border-red-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#7d3431]/5">
            <span className="font-medium text-black/70 text-sm">
              Showing <span className="text-black font-semibold">{indexOfFirstItem + 1}</span> to{' '}
              <span className="text-black font-semibold">
                {Math.min(indexOfLastItem, filteredFestivals.length)}
              </span>{' '}
              of <span className="text-black font-semibold">{filteredFestivals.length}</span> entries
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-red-200 bg-white text-black/60 hover:bg-[#7d3431]/10 hover:border-[#7d3431] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNum = index + 1;
                const isSelected = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white shadow-md shadow-[#7d3431]/20'
                        : 'bg-white border border-red-200 text-black hover:bg-[#7d3431]/10 hover:border-[#7d3431]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-red-200 bg-white text-black/60 hover:bg-[#7d3431]/10 hover:border-[#7d3431] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">
                {editingId ? 'Edit Festival' : 'Add New Festival'}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingId ? handleUpdateFestival : handleCreateFestival} className="space-y-4 text-sm">
              {/* Main Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Main Image *
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-[#7d3431]/20">
                    <img 
                      key={previewUrl} 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (previewUrl && !previewUrl.startsWith('http')) {
                          URL.revokeObjectURL(previewUrl);
                        }
                        setPreviewUrl('');
                        setImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-full shadow-lg hover:shadow-[#7d3431]/30 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#7d3431]/30 rounded-lg cursor-pointer hover:bg-[#7d3431]/5 transition-all duration-200 hover:border-[#7d3431]">
                    <Upload className="w-8 h-8 text-[#7d3431]/50 mb-2" />
                    <span className="text-sm font-medium text-black">Upload main image</span>
                    <span className="text-xs text-black/50 mt-1">PNG, JPG, GIF up to 5MB</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange} 
                    />
                  </label>
                )}
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Gallery Images * (Min 1)
                </label>
                {galleryPreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {galleryPreviews.map((url, index) => (
                      <div key={index} className="relative w-full h-20 rounded-lg overflow-hidden border border-[#7d3431]/20">
                        <img 
                          src={url} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#7d3431]/30 rounded-lg cursor-pointer hover:bg-[#7d3431]/5 transition-all duration-200 hover:border-[#7d3431]">
                  <Images className="w-6 h-6 text-[#7d3431]/50 mb-1" />
                  <span className="text-xs font-medium text-black">Upload gallery images</span>
                  <span className="text-[10px] text-black/50 mt-0.5">PNG, JPG, GIF up to 5MB each</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    className="hidden" 
                    onChange={handleGalleryChange} 
                  />
                </label>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Title *
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Diwali Celebration 2025"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Description *
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the festival celebration..."
                  rows="3"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all resize-none"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1.5">
                  Date *
                </label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#7d3431]/20 text-sm text-black focus:outline-none focus:border-[#7d3431] focus:ring-2 focus:ring-[#7d3431]/20 transition-all"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-[#7d3431]/20 rounded-lg font-semibold text-black/70 hover:bg-[#7d3431]/5 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7d3431]/20 transition-all duration-300"
                >
                  {editingId ? 'Update' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingFestival && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingFestival(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">Festival Details</h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingFestival(null);
                }}
                className="p-2 rounded-lg text-black/40 hover:bg-[#7d3431]/10 hover:text-[#7d3431] transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Main Image */}
              <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-[#7d3431]/20">
                <img 
                  src={viewingFestival.imageUrl} 
                  alt={viewingFestival.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Gallery Images */}
              {viewingFestival.galleryImages && viewingFestival.galleryImages.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Images className="w-3.5 h-3.5 text-[#7d3431]/60" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">Gallery</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {viewingFestival.galleryImages.map((url, index) => (
                      <div key={index} className="w-full h-20 rounded-lg overflow-hidden border border-[#7d3431]/20">
                        <img 
                          src={url} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Title - Full width */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <PartyPopper className="w-3.5 h-3.5 text-[#7d3431]/60" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">Title</p>
                  </div>
                  <p className="text-sm font-semibold text-black bg-[#7d3431]/5 px-3 py-2 rounded-lg border border-red-200/50">
                    {viewingFestival.title}
                  </p>
                </div>

                {/* Description - Full width */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Image className="w-3.5 h-3.5 text-[#7d3431]/60" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">Description</p>
                  </div>
                  <p className="text-sm text-black/70 bg-[#7d3431]/5 px-3 py-2 rounded-lg border border-red-200/50 min-h-[60px]">
                    {viewingFestival.description}
                  </p>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#7d3431]/60" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-black/50">Date</p>
                  </div>
                  <p className="text-sm font-medium text-black/80 bg-[#7d3431]/5 px-3 py-2 rounded-lg border border-red-200/50">
                    {formatDate(viewingFestival.date)}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingFestival(null);
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#7d3431] to-[#cb8c89] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#7d3431]/20 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}