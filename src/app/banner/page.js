'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Image as ImageIcon, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  Upload, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  AlertCircle,
  Maximize2,
  LayoutGrid,
  List
} from 'lucide-react';

export default function BannerSection() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=400&fit=crop',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=400&fit=crop',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=400&fit=crop',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=400&fit=crop',
      createdAt: '2026-07-09'
    },
    {
      id: 7,
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop',
      createdAt: '2026-07-10'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 4;

  // Form state
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingBanner, setViewingBanner] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter banners based on search
  const filteredBanners = banners.filter(banner =>
    banner.id.toString().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBanners = filteredBanners.slice(indexOfFirstItem, indexOfLastItem);

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
    };
  }, [previewUrl]);

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
      setFormError('Please upload a valid image file (JPEG, PNG, GIF, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFormError('Image size must be less than 10MB.');
      return;
    }

    setFormError('');

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const validateForm = () => {
    if (!previewUrl) {
      setFormError('Please select an image.');
      return false;
    }
    return true;
  };

  const handleCreateBanner = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newBanner = {
      id: Date.now(),
      imageUrl: previewUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBanners([newBanner, ...banners]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (banner) => {
    setEditingId(banner.id);
    setPreviewUrl(banner.imageUrl);
    setImageFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateBanner = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedBanners = banners.map(banner =>
      banner.id === editingId
        ? {
            ...banner,
            imageUrl: previewUrl
          }
        : banner
    );

    setBanners(updatedBanners);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banner? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedBanners = banners.filter(banner => banner.id !== id);
        setBanners(updatedBanners);
        const newTotalPages = Math.ceil(updatedBanners.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (banner) => {
    setViewingBanner(banner);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setEditingId(null);
    setFormError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-4 md:p-8 relative overflow-hidden">
     
      <div className="w-full max-w-7xl bg-slate-700 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20 relative z-10">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex flex-wrap justify-between items-center p-5 border-b border-red-200/50 gap-3">
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800 text-base">Banners</span>
              <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
                {filteredBanners.length}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search banners..."
                  className="w-56 md:w-64 pl-9 pr-4 py-2.5 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Banner
              </button>
            </div>
          </div>

          {/* Banner Grid View */}
          <div className="p-5">
            {currentBanners.length === 0 ? (
              <div className="text-center py-16">
                <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="font-medium text-gray-500 text-lg">No banners found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new banner</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentBanners.map((banner) => (
                  <div key={banner.id} className="group relative bg-white rounded-xl overflow-hidden border border-red-200/50 shadow-md hover:shadow-xl transition-all duration-300">
                    {/* Banner Image */}
                    <div className="relative w-full aspect-[3/1] overflow-hidden bg-gray-100">
                      <img 
                        src={banner.imageUrl} 
                        alt={`Banner ${banner.id}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/1200x400/FF6B6B/FFFFFF?text=No+Image';
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Image ID Badge */}
                      <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        #{banner.id}
                      </div>
                      
                      {/* Date Badge */}
                      <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        {formatDate(banner.createdAt)}
                      </div>
                      
                      {/* Action Buttons - Appear on Hover */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => handleView(banner)}
                          title="View" 
                          className="p-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 backdrop-blur-sm"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(banner)}
                          title="Edit" 
                          className="p-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 backdrop-blur-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(banner.id)}
                          disabled={isDeleting}
                          title="Delete" 
                          className="p-2 bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 backdrop-blur-sm disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Card Footer */}
                    <div className="px-4 py-3 bg-white flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Banner #{banner.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{formatDate(banner.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredBanners.length > 0 && (
            <div className="px-5 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredBanners.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredBanners.length}</span> banners
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
                          : 'bg-white border border-red-200/50 text-gray-600 hover:bg-red-50 hover:border-red-300'
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
                  className="p-2 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
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
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Banner
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Upload Banner
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
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateBanner : handleCreateBanner} className="space-y-4 text-sm">
              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Banner Image * <span className="font-normal text-gray-400">(Recommended: 1200×400px)</span>
                </label>
                {previewUrl ? (
                  <div className="relative w-full rounded-lg overflow-hidden border-2 border-red-200 shadow-sm aspect-[3/1]">
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
                  <label className="flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-red-300 cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 aspect-[3/1]">
                    <Upload className="w-12 h-12 text-red-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Click to upload banner image</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, WEBP up to 10MB</span>
                    <span className="text-xs text-gray-400">Recommended: 1200 × 400 pixels</span>
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

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 border border-gray-200 rounded-lg font-semibold text-gray-600 text-sm hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
                >
                  {editingId ? 'Update Banner' : 'Save Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingBanner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingBanner(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-red-600" />
                Banner Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingBanner(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Banner Image */}
              <div className="w-full rounded-lg overflow-hidden border-2 border-red-200 shadow-md aspect-[3/1]">
                <img 
                  src={viewingBanner.imageUrl} 
                  alt={`Banner ${viewingBanner.id}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/1200x400/FF6B6B/FFFFFF?text=No+Image';
                  }}
                />
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Banner ID</p>
                  <p className="text-base font-semibold text-gray-800 mt-1">#{viewingBanner.id}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Created Date</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{formatDate(viewingBanner.createdAt)}</p>
                </div>

                <div className="col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Dimensions</p>
                  <p className="text-sm font-medium text-gray-700 mt-1 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-gray-400" />
                    Recommended: 1200 × 400 pixels
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingBanner(null);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
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