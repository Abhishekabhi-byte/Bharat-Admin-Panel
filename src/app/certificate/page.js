'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
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
  FileText,
  AlertCircle,
  File,
  FileImage,
  FileArchive
} from 'lucide-react';

export default function CertificatePage() {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: 'ISO 9001:2015 Quality Management',
      fileUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=250',
      fileType: 'image',
      fileName: 'iso-certificate.jpg',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      title: '',
      fileUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250',
      fileType: 'image',
      fileName: 'certificate-2.jpg',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      title: 'ISO 14001:2015 Environmental Management',
      fileUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=250',
      fileType: 'image',
      fileName: 'environment-cert.jpg',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      title: 'OHSAS 18001 Occupational Health & Safety',
      fileUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=250',
      fileType: 'image',
      fileName: 'safety-cert.jpg',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      title: '',
      fileUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=250',
      fileType: 'image',
      fileName: 'certificate-5.jpg',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      title: 'CE Certification - Product Compliance',
      fileUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=250',
      fileType: 'image',
      fileName: 'ce-cert.jpg',
      createdAt: '2026-07-09'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingCertificate, setViewingCertificate] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter certificates based on search
  const filteredCertificates = certificates.filter(cert =>
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCertificates = filteredCertificates.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    e.target.value = '';

    if (!file) return;

    // Check file type
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';
    const isDocument = file.type === 'application/msword' || 
                       file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                       file.type === 'application/vnd.ms-excel' ||
                       file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (!isImage && !isPDF && !isDocument) {
      setFormError('Please upload a valid file (Images, PDF, DOC, DOCX, XLS, XLSX).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFormError('File size must be less than 10MB.');
      return;
    }

    setFormError('');

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(file);
    setFileName(file.name);
    setFileType(isImage ? 'image' : (isPDF ? 'pdf' : 'document'));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const validateForm = () => {
    if (!previewUrl) {
      setFormError('Please select a file.');
      return false;
    }
    return true;
  };

  const handleCreateCertificate = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newCertificate = {
      id: Date.now(),
      title: title.trim(),
      fileUrl: previewUrl,
      fileType: fileType,
      fileName: fileName,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCertificates([newCertificate, ...certificates]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (certificate) => {
    setEditingId(certificate.id);
    setTitle(certificate.title);
    setPreviewUrl(certificate.fileUrl);
    setFileName(certificate.fileName);
    setFileType(certificate.fileType);
    setFile(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleUpdateCertificate = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedCertificates = certificates.map(cert =>
      cert.id === editingId
        ? { 
            ...cert, 
            title: title.trim(), 
            fileUrl: previewUrl,
            fileType: fileType,
            fileName: fileName
          }
        : cert
    );

    setCertificates(updatedCertificates);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedCertificates = certificates.filter(cert => cert.id !== id);
        setCertificates(updatedCertificates);
        const newTotalPages = Math.ceil(updatedCertificates.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (certificate) => {
    setViewingCertificate(certificate);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl('');
    setTitle('');
    setFileName('');
    setFileType('');
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

  // Get file icon based on type
  const getFileIcon = (type) => {
    switch(type) {
      case 'image':
        return <FileImage className="w-5 h-5" />;
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'document':
        return <FileArchive className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  // Get file type label
  const getFileTypeLabel = (type) => {
    switch(type) {
      case 'image':
        return 'Image';
      case 'pdf':
        return 'PDF';
      case 'document':
        return 'Document';
      default:
        return 'File';
    }
  };

  // Render file preview
  const renderFilePreview = (certificate) => {
    if (certificate.fileType === 'image') {
      return (
        <img 
          src={certificate.fileUrl} 
          alt={certificate.title || 'Certificate'} 
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=No+Image';
          }}
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50">
          {getFileIcon(certificate.fileType)}
          <p className="text-xs text-gray-500 mt-2 text-center px-2 truncate max-w-full">
            {certificate.fileName}
          </p>
          <span className="text-[10px] text-gray-400 mt-1 px-2 py-0.5 bg-gray-200 rounded-full">
            {getFileTypeLabel(certificate.fileType)}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-start justify-center p-3 md:p-6 relative overflow-hidden">

      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20 relative z-10">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          
          {/* Table Header with Search */}
          <div className="p-4 border-b border-red-200/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-800">Certificates</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                  {filteredCertificates.length}
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
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
                  Add Certificate
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-6 py-4 w-[120px]">File</th>
                  <th className="px-6 py-4 min-w-[150px]">Title</th>
                  <th className="px-6 py-4 w-[120px] text-center">Type</th>
                  <th className="px-6 py-4 w-[160px] text-center">Created Date</th>
                  <th className="px-6 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentCertificates.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16">
                      <Award className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No certificates found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new certificate</p>
                    </td>
                  </tr>
                ) : (
                  currentCertificates.map((certificate) => (
                    <tr key={certificate.id} className="hover:bg-red-50/30 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-red-200 shadow-sm bg-white flex items-center justify-center p-1.5">
                          {renderFilePreview(certificate)}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        {certificate.title ? (
                          <span className="font-semibold text-gray-800 block text-base">{certificate.title}</span>
                        ) : (
                          <span className="text-xs italic text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                            Untitled Certificate
                          </span>
                        )}
                        <p className="text-[10px] text-gray-400 truncate max-w-[150px]">{certificate.fileName}</p>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${
                          certificate.fileType === 'image' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          certificate.fileType === 'pdf' ? 'bg-red-100 text-red-700 border-red-200' :
                          'bg-purple-100 text-purple-700 border-purple-200'
                        }`}>
                          {getFileIcon(certificate.fileType)}
                          {getFileTypeLabel(certificate.fileType)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600 font-medium text-center text-sm">
                        {certificate.createdAt}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(certificate)}
                            title="View" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleEdit(certificate)}
                            title="Edit" 
                            className="p-2 text-gray-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Edit2 className="w-4.5 h-4.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(certificate.id)}
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
          {filteredCertificates.length > 0 && (
            <div className="px-6 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredCertificates.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredCertificates.length}</span> certificates
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
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Certificate
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Upload Certificate
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

            <form onSubmit={editingId ? handleUpdateCertificate : handleCreateCertificate} className="space-y-4 text-sm">
              {/* File Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Certificate File * <span className="font-normal text-gray-400">(Image, PDF, DOC, DOCX, XLS, XLSX)</span>
                </label>
                {previewUrl ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-red-200 shadow-sm bg-white flex items-center justify-center p-4">
                    {fileType === 'image' ? (
                      <img 
                        key={previewUrl}
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-contain" 
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        {getFileIcon(fileType)}
                        <p className="text-sm font-medium text-gray-700 mt-2">{fileName}</p>
                        <span className="text-xs text-gray-400 mt-1 px-2 py-0.5 bg-gray-100 rounded-full">
                          {getFileTypeLabel(fileType)}
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (previewUrl && previewUrl.startsWith('blob:')) {
                          URL.revokeObjectURL(previewUrl);
                        }
                        setPreviewUrl('');
                        setFile(null);
                        setFileName('');
                        setFileType('');
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
                    <span className="text-sm font-medium text-gray-700">Click to upload file</span>
                    <span className="text-xs text-gray-400 mt-1">Images, PDF, DOC, DOCX, XLS, XLSX</span>
                    <span className="text-xs text-gray-400">Max size: 10MB</span>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                  </label>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Certificate Title <span className="font-normal text-gray-400">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. ISO 9001:2015 Quality Management"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  maxLength={100}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {title.length}/100
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
                  {editingId ? 'Update Certificate' : 'Save Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingCertificate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingCertificate(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-red-600" />
                Certificate Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingCertificate(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* File Preview */}
              <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-red-200 shadow-md bg-white flex items-center justify-center p-6">
                {viewingCertificate.fileType === 'image' ? (
                  <img 
                    src={viewingCertificate.fileUrl} 
                    alt={viewingCertificate.title || 'Certificate'} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    {getFileIcon(viewingCertificate.fileType)}
                    <p className="text-sm font-medium text-gray-700 mt-3">{viewingCertificate.fileName}</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium mt-2 ${
                      viewingCertificate.fileType === 'pdf' ? 'bg-red-100 text-red-700 border-red-200' :
                      'bg-purple-100 text-purple-700 border-purple-200'
                    }`}>
                      {getFileTypeLabel(viewingCertificate.fileType)}
                    </span>
                    <a 
                      href={viewingCertificate.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium underline"
                    >
                      Download File
                    </a>
                  </div>
                )}
              </div>
              
              {/* Details */}
              <div className="space-y-4 bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Title</p>
                  <p className="text-base font-semibold text-gray-800 mt-1">
                    {viewingCertificate.title || <span className="text-gray-400 italic">Untitled Certificate</span>}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">File Name</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{viewingCertificate.fileName}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">File Type</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium mt-1 ${
                    viewingCertificate.fileType === 'image' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    viewingCertificate.fileType === 'pdf' ? 'bg-red-100 text-red-700 border-red-200' :
                    'bg-purple-100 text-purple-700 border-purple-200'
                  }`}>
                    {getFileIcon(viewingCertificate.fileType)}
                    {getFileTypeLabel(viewingCertificate.fileType)}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Created Date</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{viewingCertificate.createdAt}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Certificate ID</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">#CERT-{String(viewingCertificate.id).padStart(4, '0')}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingCertificate(null);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300"
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