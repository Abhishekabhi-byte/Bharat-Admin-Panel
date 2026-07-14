'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Image as ImageIcon,
  Images,
  AlertCircle
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
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingFestival, setViewingFestival] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

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
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      galleryPreviews.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrl, galleryPreviews]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      e.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      setFormError('Please upload a valid image file (JPEG, PNG, GIF, WEBP).');
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image size must be less than 5MB.');
      e.target.value = '';
      return;
    }

    setFormError('');

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = '';
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) {
      e.target.value = '';
      return;
    }

    const validFiles = [];
    const invalidFiles = [];

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        invalidFiles.push(file.name);
      } else if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} (size > 5MB)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setFormError(`Invalid files: ${invalidFiles.join(', ')}`);
      e.target.value = '';
      return;
    }

    setFormError('');

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setGalleryFiles([...galleryFiles, ...validFiles]);
    setGalleryPreviews([...galleryPreviews, ...newPreviews]);
    e.target.value = '';
  };

  const removeGalleryImage = (index) => {
    if (galleryPreviews[index] && galleryPreviews[index].startsWith('blob:')) {
      URL.revokeObjectURL(galleryPreviews[index]);
    }
    const newFiles = [...galleryFiles];
    const newPreviews = [...galleryPreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setGalleryFiles(newFiles);
    setGalleryPreviews(newPreviews);
  };

  const validateForm = () => {
    if (!previewUrl) {
      setFormError('Please select a main image.');
      return false;
    }
    if (!title.trim()) {
      setFormError('Please enter a title.');
      return false;
    }
    if (!description.trim()) {
      setFormError('Please enter a description.');
      return false;
    }
    if (!date) {
      setFormError('Please select a date.');
      return false;
    }
    if (galleryPreviews.length === 0) {
      setFormError('Please add at least one gallery image.');
      return false;
    }
    return true;
  };

  const handleCreateFestival = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

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
    resetForm(true); // pass true to bypass URL revocation of newly active images
    setIsModalOpen(false);
  };

  const handleEdit = (festival) => {
    setEditingId(festival.id);
    setPreviewUrl(festival.imageUrl);
    setTitle(festival.title);
    setDescription(festival.description);
    setGalleryPreviews([...festival.galleryImages]);
    setGalleryFiles([]);
    setDate(festival.date);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateFestival = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

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
    resetForm(true); // pass true to bypass URL revocation of newly active images
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this festival entry?')) {
      setIsDeleting(true);
      setTimeout(() => {
        const festival = festivals.find(f => f.id === id);
        if (festival) {
          festival.galleryImages.forEach(url => {
            if (url.startsWith('blob:')) URL.revokeObjectURL(url);
          });
        }
        
        const updatedFestivals = festivals.filter(festival => festival.id !== id);
        setFestivals(updatedFestivals);
        const newTotalPages = Math.ceil(updatedFestivals.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (festival) => {
    setViewingFestival(festival);
    setIsViewModalOpen(true);
  };

  const resetForm = (isSubmitting = false) => {
    // If we're submitting, we do NOT want to revoke object URLs 
    // because those URLs are now assigned to active state items rendering in the list!
    if (!isSubmitting) {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      galleryPreviews.forEach(url => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
    }

    setImageFile(null);
    setPreviewUrl('');
    setTitle('');
    setDescription('');
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setDate('');
    setEditingId(null);
    setFormError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm(false);
  };

  const truncateText = (text, maxLength = 40) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center p-3 md:p-6">
      <div className="w-full max-w-7xl bg-slate-900 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex justify-between items-center p-4 border-b border-red-200/50">
            <div className="flex items-center gap-3">
              <PartyPopper className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Festivals</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredFestivals.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search festivals..."
                  className="w-48 md:w-64 pl-9 pr-4 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  resetForm(false);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Festival
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[100px]">Image</th>
                  <th className="px-6 py-4 min-w-[150px]">Title</th>
                  <th className="px-6 py-4 min-w-[200px]">Description</th>
                  <th className="px-6 py-4 w-[140px] text-center">Date</th>
                  <th className="px-6 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentFestivals.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <PartyPopper className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No festivals found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new festival</p>
                    </td>
                  </tr>
                ) : (
                  currentFestivals.map((festival) => (
                    <tr key={festival.id} className="hover:bg-red-50/30 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-red-200 shadow-sm">
                          <img 
                            src={festival.imageUrl} 
                            alt={festival.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=No+Image';
                            }}
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800 block text-base">{festival.title}</span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 block max-w-xs" title={festival.description}>
                          {truncateText(festival.description, 40)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-gray-700 bg-red-50/80 px-3 py-1.5 rounded-full border border-red-200/50 text-sm font-medium">
                          <Calendar className="w-3.5 h-3.5 text-red-600" />
                          {formatDate(festival.date)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(festival)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(festival)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(festival.id)}
                            disabled={isDeleting}
                            title="Delete" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
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
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredFestivals.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredFestivals.length}</span> festivals
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = index + 1;
                  } else if (currentPage <= 3) {
                    pageNum = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + index;
                  } else {
                    pageNum = currentPage - 2 + index;
                  }
                  
                  const isSelected = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200 ${
                        isSelected
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-white border border-red-200/50 text-gray-700 hover:bg-red-50 hover:border-red-300'
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Festival
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add New Festival
                  </>
                )}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateFestival : handleCreateFestival} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Main Image */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Main Image *
                    </label>
                    {previewUrl ? (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm group">
                        <img 
                          key={previewUrl}
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (previewUrl && previewUrl.startsWith('blob:')) {
                              URL.revokeObjectURL(previewUrl);
                            }
                            setPreviewUrl('');
                            setImageFile(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                        <Upload className="w-10 h-10 text-red-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700">Upload main image</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
                        <input 
                          ref={fileInputRef}
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Gallery Images * (Min 1)
                    </label>
                    {galleryPreviews.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {galleryPreviews.map((url, index) => (
                          <div key={index} className="relative w-full h-20 rounded-lg overflow-hidden border border-red-200">
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
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-red-300 rounded-lg cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500">
                      <Images className="w-6 h-6 text-red-400 mb-1" />
                      <span className="text-xs font-medium text-gray-700">Upload gallery images</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, GIF up to 5MB each</span>
                      <input 
                        ref={galleryInputRef}
                        type="file" 
                        accept="image/*" 
                        multiple
                        className="hidden" 
                        onChange={handleGalleryChange} 
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-1">
                      {galleryPreviews.length} image{galleryPreviews.length !== 1 ? 's' : ''} uploaded
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Title *
                    </label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Diwali Celebration 2025"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {title.length}/100
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Description *
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the festival celebration..."
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Date *
                    </label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300"
                >
                  {editingId ? 'Update Festival' : 'Save Festival'}
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
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-red-600" />
                Festival Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingFestival(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-red-100 shadow-md">
                <img 
                  src={viewingFestival.imageUrl} 
                  alt={viewingFestival.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-red-600 font-medium bg-red-50 w-fit px-3 py-1 rounded-full border border-red-100">
                  <Calendar className="w-4 h-4" />
                  {formatDate(viewingFestival.date)}
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{viewingFestival.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{viewingFestival.description}</p>
              </div>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
                  <Images className="w-4 h-4 text-red-500" />
                  Event Gallery
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {viewingFestival.galleryImages.map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:scale-[1.02] transition-transform duration-200">
                      <img 
                        src={image} 
                        alt={`${viewingFestival.title} Gallery ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}