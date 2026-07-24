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
  AlertCircle,
  FileText,
  File,
  CheckCircle,
  Download,
  Maximize2
} from 'lucide-react';

export default function CertificateSection() {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      fileName: 'ISO_9001_Certificate.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '1.2 MB',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      fileName: 'ISO_14001_Certificate.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '2.4 MB',
      createdAt: '2026-07-05'
    },
    {
      id: 3,
      fileName: 'OHSAS_18001_Certificate.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '1.8 MB',
      createdAt: '2026-07-06'
    },
    {
      id: 4,
      fileName: 'CE_Certification.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '3.1 MB',
      createdAt: '2026-07-07'
    },
    {
      id: 5,
      fileName: 'Quality_Management_Certificate.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '1.5 MB',
      createdAt: '2026-07-08'
    },
    {
      id: 6,
      fileName: 'Safety_Compliance_Certificate.pdf',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: '2.0 MB',
      createdAt: '2026-07-09'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  // Form state
  const [pdfFile, setPdfFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingCertificate, setViewingCertificate] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef(null);

  // Filter certificates based on search
  const filteredCertificates = certificates.filter(cert =>
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

    if (file.type !== 'application/pdf') {
      setFormError('Please upload a valid PDF file.');
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

    setPdfFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
  };

  const validateForm = () => {
    if (!previewUrl) {
      setFormError('Please select a PDF file.');
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
      fileName: fileName,
      fileUrl: previewUrl,
      fileSize: fileSize,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCertificates([newCertificate, ...certificates]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (certificate) => {
    setEditingId(certificate.id);
    setPreviewUrl(certificate.fileUrl);
    setFileName(certificate.fileName);
    setFileSize(certificate.fileSize);
    setPdfFile(null);
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
            fileName: fileName,
            fileUrl: previewUrl,
            fileSize: fileSize
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
    setPdfFile(null);
    setPreviewUrl('');
    setFileName('');
    setFileSize('');
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

  // Get file icon
  const getFileIcon = () => {
    return <FileText className="w-12 h-12 text-red-500" />;
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-4 md:p-8 relative overflow-hidden">
    
      <div className="w-full max-w-7xl bg-slate-700 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20 relative z-10 min-h-[85vh] flex flex-col">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col flex-1">
          {/* Table Header with Search */}
          <div className="flex flex-wrap justify-between items-center p-5 border-b border-red-200/50 gap-3 bg-white/50">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800 text-base">Certificates</span>
              <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
                {filteredCertificates.length}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search certificates..."
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
                Add Certificate
              </button>
            </div>
          </div>

          {/* Certificate Grid View */}
          <div className="p-6 flex-1 bg-white/30">
            {currentCertificates.length === 0 ? (
              <div className="text-center py-20">
                <Award className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                <p className="font-medium text-gray-500 text-lg">No certificates found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new certificate</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {currentCertificates.map((cert) => (
                  <div key={cert.id} className="group relative">
                    {/* Certificate Card */}
                    <div className="bg-white rounded-xl overflow-hidden border border-red-200/30 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      {/* PDF Icon Container */}
                      <div className="relative p-8 bg-gradient-to-br from-red-50 to-red-100/30 flex flex-col items-center justify-center h-48">
                        <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-3">
                          <FileText className="w-10 h-10 text-red-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 text-center truncate w-full px-2">
                          {cert.fileName}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{cert.fileSize}</p>
                        
                        {/* ID Badge */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm font-medium">
                          #{cert.id}
                        </div>
                        
                        {/* Action Buttons - Appear on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button 
                            onClick={() => handleView(cert)}
                            title="View" 
                            className="p-2.5 bg-white hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(cert)}
                            title="Edit" 
                            className="p-2.5 bg-white hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(cert.id)}
                            disabled={isDeleting}
                            title="Delete" 
                            className="p-2.5 bg-white hover:bg-white text-gray-600 hover:text-red-600 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Card Footer */}
                      <div className="px-4 py-3 bg-white border-t border-red-200/30 flex justify-between items-center">
                        <span className="text-[11px] text-gray-500 font-medium">
                          PDF Document
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {formatDate(cert.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredCertificates.length > 0 && (
            <div className="px-5 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 bg-red-50/30">
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
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingId ? handleUpdateCertificate : handleCreateCertificate} className="space-y-4 text-sm">
              {/* File Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  PDF File *
                </label>
                {previewUrl ? (
                  <div className="relative w-full rounded-lg overflow-hidden border-2 border-red-200 shadow-sm bg-gray-50 flex flex-col items-center justify-center p-6 h-48">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-3">
                      <FileText className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 text-center">{fileName}</p>
                    <p className="text-xs text-gray-400 mt-1">{fileSize}</p>
                    <button
                      type="button"
                      onClick={() => {
                        if (previewUrl && previewUrl.startsWith('blob:')) {
                          URL.revokeObjectURL(previewUrl);
                        }
                        setPreviewUrl('');
                        setPdfFile(null);
                        setFileName('');
                        setFileSize('');
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
                  <label className="flex flex-col items-center justify-center w-full rounded-lg border-2 border-dashed border-red-300 cursor-pointer hover:bg-red-50 transition-all duration-200 hover:border-red-500 h-48 p-4">
                    <Upload className="w-12 h-12 text-red-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">Click to upload PDF</span>
                    <span className="text-xs text-gray-400 mt-1">PDF files up to 10MB</span>
                    <span className="text-xs text-red-400 mt-2">Only PDF format accepted</span>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".pdf,application/pdf" 
                      className="hidden" 
                      onChange={handleFileChange} 
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
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
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
              {/* PDF Preview */}
              <div className="w-full rounded-lg overflow-hidden border-2 border-red-200 shadow-md bg-gray-50 flex flex-col items-center justify-center p-8 h-80">
                <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mb-4">
                  <FileText className="w-12 h-12 text-red-600" />
                </div>
                <p className="text-base font-semibold text-gray-800 text-center">{viewingCertificate.fileName}</p>
                <p className="text-sm text-gray-500 mt-1">{viewingCertificate.fileSize}</p>
                <div className="flex gap-3 mt-4">
                  <a 
                    href={viewingCertificate.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                  <a 
                    href={viewingCertificate.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    View PDF
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Certificate ID</p>
                  <p className="text-base font-semibold text-gray-800 mt-1">#{viewingCertificate.id}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">File Name</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{viewingCertificate.fileName}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">File Size</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{viewingCertificate.fileSize}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Uploaded Date</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{formatDate(viewingCertificate.createdAt)}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingCertificate(null);
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