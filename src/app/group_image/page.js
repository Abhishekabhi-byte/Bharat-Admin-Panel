'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Images, 
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
  Image as ImageIcon
} from 'lucide-react';

export default function GroupImagePage() {
  const [groupImages, setGroupImages] = useState([
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=700&h=450&fit=crop',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&h=450&fit=crop',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=700&h=450&fit=crop',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=700&h=450&fit=crop',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&h=450&fit=crop',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&h=450&fit=crop',
      createdAt: '2026-07-09'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter images based on search
  const filteredImages = groupImages.filter(image =>
    image.id.toString().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = filteredImages.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleCreateImage = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newImage = {
      id: Date.now(),
      imageUrl: previewUrl,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGroupImages([newImage, ...groupImages]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (image) => {
    setEditingId(image.id);
    setPreviewUrl(image.imageUrl);
    setImageFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateImage = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedImages = groupImages.map(image =>
      image.id === editingId
        ? {
            ...image,
            imageUrl: previewUrl
          }
        : image
    );

    setGroupImages(updatedImages);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedImages = groupImages.filter(image => image.id !== id);
        setGroupImages(updatedImages);
        const newTotalPages = Math.ceil(updatedImages.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (image) => {
    setViewingImage(image);
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

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-start justify-center p-3 md:p-6 relative overflow-hidden">
      {/* Side Blur Effect - Left */}
    
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20 relative z-10">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex flex-wrap justify-between items-center p-4 border-b border-red-200/50 gap-3">
            <div className="flex items-center gap-3">
              <Images className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800">Group Images</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                {filteredImages.length}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search images..."
                  className="w-40 md:w-52 pl-9 pr-4 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-4 py-3 w-[140px]">Image</th>
                  <th className="px-4 py-3 w-[140px] text-center">Created Date</th>
                  <th className="px-4 py-3 w-[140px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentImages.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-12">
                      <Images className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                      <p className="font-medium text-gray-500 text-sm">No images found</p>
                      <p className="text-xs text-gray-400 mt-1">Try adjusting your search or add a new image</p>
                    </td>
                  </tr>
                ) : (
                  currentImages.map((image) => (
                    <tr key={image.id} className="hover:bg-red-50/30 transition-colors duration-150">
                      <td className="px-4 py-3">
                        <div className="relative w-[130px] h-[84px] rounded-lg overflow-hidden border border-red-200 shadow-sm" style={{ aspectRatio: '700/450' }}>
                          <img 
                            src={image.imageUrl} 
                            alt={`Group Image ${image.id}`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/700x450/FF6B6B/FFFFFF?text=No+Image';
                            }}
                          />
                          <div className="absolute bottom-0.5 right-0.5 bg-black/60 text-white text-[8px] px-1 py-0.5 rounded">
                            700×450
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-500 font-medium text-center text-xs">
                        {image.createdAt}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button 
                            onClick={() => handleView(image)}
                            title="View" 
                            className="p-1.5 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(image)}
                            title="Edit" 
                            className="p-1.5 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(image.id)}
                            disabled={isDeleting}
                            title="Delete" 
                            className="p-1.5 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
          {filteredImages.length > 0 && (
            <div className="px-4 py-3 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 bg-red-50/30">
              <span className="font-medium text-gray-500 text-xs">
                Showing <span className="text-gray-700 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-700 font-bold">
                  {Math.min(indexOfLastItem, filteredImages.length)}
                </span>{' '}
                of <span className="text-gray-700 font-bold">{filteredImages.length}</span> images
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
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
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all duration-200 ${
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
                  className="p-1.5 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 hover:border-red-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl w-full max-w-md p-5 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-4 h-4 text-red-600" />
                    Edit Image
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-red-600" />
                    Upload Image
                  </>
                )}
              </h3>
              <button 
                onClick={closeModal} 
                className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-xs">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateImage : handleCreateImage} className="space-y-3 text-sm">
              {/* Image Upload with Fixed Dimensions */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Image * <span className="font-normal text-gray-400">(700×450px recommended)</span>
                </label>
                {previewUrl ? (
                  <div className="relative w-full rounded-lg overflow-hidden border-2 border-red-200 shadow-sm" style={{ aspectRatio: '700/450' }}>
                    <img 
                      key={previewUrl}
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                      700 × 450
                    </div>
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
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-red-300 cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500" style={{ aspectRatio: '700/450' }}>
                    <Upload className="w-10 h-10 text-red-400 mb-1.5" />
                    <span className="text-sm font-medium text-gray-700">Click to upload image</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF, WEBP up to 10MB</span>
                    <span className="text-[10px] text-gray-400">Recommended: 700×450 pixels</span>
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

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 border border-gray-200 rounded-lg font-semibold text-gray-600 text-sm hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
                >
                  {editingId ? 'Update Image' : 'Save Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingImage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingImage(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-xl p-5 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <Images className="w-4 h-4 text-red-600" />
                Image Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingImage(null);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image with Fixed Dimensions */}
              <div className="w-full rounded-lg overflow-hidden border-2 border-red-200 shadow-md" style={{ aspectRatio: '700/450' }}>
                <img 
                  src={viewingImage.imageUrl} 
                  alt={`Group Image ${viewingImage.id}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/700x450/FF6B6B/FFFFFF?text=No+Image';
                  }}
                />
              </div>
              
              {/* Dimensions Info */}
              <div className="flex items-center gap-2 justify-center text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>700 × 450 pixels</span>
              </div>

              {/* Details */}
              <div className="space-y-3 bg-red-50/50 p-3 rounded-lg border border-red-200/50">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Image ID</p>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">#{viewingImage.id}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Created Date</p>
                  <p className="text-sm font-medium text-gray-600 mt-0.5">{viewingImage.createdAt}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingImage(null);
                }}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all duration-300"
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