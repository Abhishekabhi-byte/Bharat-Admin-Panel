'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  AlertCircle,
  User,
  Phone,
  MapPin,
  FileText,
  MessageSquare,
  CheckCircle,
  Tag,
  XCircle,
  PlusCircle,
  List
} from 'lucide-react';

export default function ContactFormAdmin() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      fullName: 'Rajesh Kumar',
      phoneNo: '+91 98765 43210',
      emailAddress: 'rajesh.kumar@email.com',
      location: 'Mumbai, Maharashtra',
      ourWorks: ['Website Development', 'E-commerce Platform', 'Mobile App Development'],
      ourMessage: 'Interested in your web development services. We need a comprehensive e-commerce solution for our business.',
      createdAt: '2026-07-15'
    },
    {
      id: 2,
      fullName: 'Priya Sharma',
      phoneNo: '+91 87654 32109',
      emailAddress: 'priya.sharma@email.com',
      location: 'Delhi, India',
      ourWorks: ['Digital Marketing', 'SEO Services', 'Social Media Management'],
      ourMessage: 'Looking for a digital marketing agency to handle our online presence and SEO optimization.',
      createdAt: '2026-07-16'
    },
    {
      id: 3,
      fullName: 'Amit Patel',
      phoneNo: '+91 76543 21098',
      emailAddress: 'amit.patel@email.com',
      location: 'Ahmedabad, Gujarat',
      ourWorks: ['Branding', 'Logo Design', 'Corporate Identity'],
      ourMessage: 'Need a professional branding package for our new startup. Looking forward to discussing further.',
      createdAt: '2026-07-17'
    },
    {
      id: 4,
      fullName: 'Sneha Reddy',
      phoneNo: '+91 65432 10987',
      emailAddress: 'sneha.reddy@email.com',
      location: 'Hyderabad, Telangana',
      ourWorks: ['Interior Design', 'Architecture', 'Space Planning'],
      ourMessage: 'We are looking for interior design services for our new office space. Please share your portfolio.',
      createdAt: '2026-07-18'
    },
    {
      id: 5,
      fullName: 'Vikram Singh',
      phoneNo: '+91 54321 09876',
      emailAddress: 'vikram.singh@email.com',
      location: 'Jaipur, Rajasthan',
      ourWorks: ['Mobile App Development', 'UI/UX Design', 'Testing'],
      ourMessage: 'Interested in your app development services. We have a great idea for a fitness tracking app.',
      createdAt: '2026-07-19'
    },
    {
      id: 6,
      fullName: 'Ananya Gupta',
      phoneNo: '+91 43210 98765',
      emailAddress: 'ananya.gupta@email.com',
      location: 'Pune, Maharashtra',
      ourWorks: ['Content Writing', 'Blog Management', 'Copywriting'],
      ourMessage: 'We need content writers for our blog and website. Looking for creative and engaging content.',
      createdAt: '2026-07-20'
    },
    {
      id: 7,
      fullName: 'Deepak Verma',
      phoneNo: '+91 32109 87654',
      emailAddress: 'deepak.verma@email.com',
      location: 'Bangalore, Karnataka',
      ourWorks: ['Cloud Computing', 'DevOps', 'AWS Services'],
      ourMessage: 'Looking for cloud infrastructure experts to help us migrate our applications to AWS.',
      createdAt: '2026-07-21'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Form state
  const [fullName, setFullName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [location, setLocation] = useState('');
  const [ourWorks, setOurWorks] = useState([]);
  const [worksInput, setWorksInput] = useState('');
  const [showWorkInput, setShowWorkInput] = useState(false);
  const [ourMessage, setOurMessage] = useState('');
  const [formError, setFormError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact =>
    contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phoneNo.includes(searchTerm) ||
    contact.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Add work from input
  const handleAddWork = () => {
    const trimmedValue = worksInput.trim();
    if (trimmedValue && !ourWorks.includes(trimmedValue)) {
      setOurWorks([...ourWorks, trimmedValue]);
      setWorksInput('');
      setShowWorkInput(false);
    } else if (ourWorks.includes(trimmedValue)) {
      setFormError('This work already exists in the list.');
      setTimeout(() => setFormError(''), 3000);
    }
  };

  // Remove work from list by index
  const removeWork = (index) => {
    const updatedWorks = ourWorks.filter((_, i) => i !== index);
    setOurWorks(updatedWorks);
  };

  // Remove all works
  const removeAllWorks = () => {
    if (ourWorks.length === 0) return;
    if (window.confirm('Are you sure you want to remove all works?')) {
      setOurWorks([]);
    }
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      setFormError('Please enter the full name.');
      return false;
    }
    if (!phoneNo.trim()) {
      setFormError('Please enter the phone number.');
      return false;
    }
    if (!emailAddress.trim()) {
      setFormError('Please enter the email address.');
      return false;
    }
    if (!emailAddress.includes('@') || !emailAddress.includes('.')) {
      setFormError('Please enter a valid email address.');
      return false;
    }
    if (!location.trim()) {
      setFormError('Please enter the location.');
      return false;
    }
    if (ourWorks.length === 0) {
      setFormError('Please add at least one work.');
      return false;
    }
    if (!ourMessage.trim()) {
      setFormError('Please enter the message.');
      return false;
    }
    return true;
  };

  const handleCreateContact = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const newContact = {
      id: Date.now(),
      fullName: fullName.trim(),
      phoneNo: phoneNo.trim(),
      emailAddress: emailAddress.trim(),
      location: location.trim(),
      ourWorks: ourWorks,
      ourMessage: ourMessage.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setContacts([newContact, ...contacts]);
    setCurrentPage(1);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setFullName(contact.fullName);
    setPhoneNo(contact.phoneNo);
    setEmailAddress(contact.emailAddress);
    setLocation(contact.location);
    setOurWorks(contact.ourWorks || []);
    setOurMessage(contact.ourMessage);
    setFormError('');
    setShowWorkInput(false);
    setWorksInput('');
    setIsModalOpen(true);
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    const updatedContacts = contacts.map(contact =>
      contact.id === editingId
        ? {
            ...contact,
            fullName: fullName.trim(),
            phoneNo: phoneNo.trim(),
            emailAddress: emailAddress.trim(),
            location: location.trim(),
            ourWorks: ourWorks,
            ourMessage: ourMessage.trim()
          }
        : contact
    );

    setContacts(updatedContacts);
    resetForm();
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact entry? This action cannot be undone.')) {
      setIsDeleting(true);
      setTimeout(() => {
        const updatedContacts = contacts.filter(contact => contact.id !== id);
        setContacts(updatedContacts);
        const newTotalPages = Math.ceil(updatedContacts.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        setIsDeleting(false);
      }, 300);
    }
  };

  const handleView = (contact) => {
    setViewingContact(contact);
    setIsViewModalOpen(true);
  };

  const resetForm = () => {
    setFullName('');
    setPhoneNo('');
    setEmailAddress('');
    setLocation('');
    setOurWorks([]);
    setWorksInput('');
    setShowWorkInput(false);
    setOurMessage('');
    setEditingId(null);
    setFormError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Display works in table - only show first work
  const displayWorks = (works) => {
    if (!works || works.length === 0) return <span className="text-xs text-gray-400">No works</span>;
    
    const firstWork = works[0];
    const remaining = works.length - 1;
    
    return (
      <div className="flex flex-wrap gap-1.5">
        <span className="inline-flex items-center gap-1 bg-red-50/80 text-gray-700 px-2 py-0.5 rounded-full border border-red-200/50 text-[10px] font-medium">
          <span className="bg-red-200 text-red-700 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold">
            1
          </span>
          {firstWork.length > 15 ? firstWork.substring(0, 15) + '...' : firstWork}
        </span>
       
      </div>
    );
  };

  // Display works in view modal - only show first work
  const displayViewWorks = (works) => {
    if (!works || works.length === 0) return <p className="text-sm text-gray-400">No works</p>;
    
    const firstWork = works[0];
    const remaining = works.length - 1;
    
    return (
      <div>
        <div className="flex items-center gap-3 bg-white/50 px-3 py-1.5 rounded-lg border border-red-100/50">
          <span className="bg-red-100 text-red-700 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
          <span className="text-sm text-gray-700">{firstWork}</span>
        </div>
       
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl bg-slate-700 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20">
        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden flex flex-col justify-between">
          {/* Table Header with Search */}
          <div className="flex flex-wrap justify-between items-center p-5 border-b border-red-200/50 gap-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-gray-800 text-base">Contact Form</span>
              <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
                {filteredContacts.length}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-56 md:w-64 pl-9 pr-4 py-2.5 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <th className="px-5 py-4 min-w-[140px]">Full Name</th>
                  <th className="px-5 py-4 min-w-[130px]">Phone No.</th>
                  <th className="px-5 py-4 min-w-[180px]">Email Address</th>
                  <th className="px-5 py-4 min-w-[130px]">Location</th>
                  <th className="px-5 py-4 min-w-[200px]">Our Works</th>
                  <th className="px-5 py-4 w-[160px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100/50">
                {currentContacts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16">
                      <Mail className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="font-medium text-gray-500 text-base">No contacts found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or add a new contact</p>
                    </td>
                  </tr>
                ) : (
                  currentContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-red-50/30 transition-colors duration-150">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-800 text-sm">{contact.fullName}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{contact.phoneNo}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 truncate max-w-[150px]">{contact.emailAddress}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{contact.location}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {displayWorks(contact.ourWorks)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleView(contact)}
                            title="View" 
                            className="p-2 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(contact.id)}
                            disabled={isDeleting}
                            title="Delete" 
                            className="p-2 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
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
          {filteredContacts.length > 0 && (
            <div className="px-5 py-4 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 bg-red-50/30">
              <span className="font-medium text-gray-600 text-sm">
                Showing <span className="text-gray-800 font-bold">{indexOfFirstItem + 1}</span> to{' '}
                <span className="text-gray-800 font-bold">
                  {Math.min(indexOfLastItem, filteredContacts.length)}
                </span>{' '}
                of <span className="text-gray-800 font-bold">{filteredContacts.length}</span> contacts
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
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 className="w-5 h-5 text-red-600" />
                    Edit Contact
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-red-600" />
                    Add Contact
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

            <form onSubmit={editingId ? handleUpdateContact : handleCreateContact} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {fullName.length}/100
                    </div>
                  </div>

                  {/* Phone No. */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Phone No. *
                    </label>
                    <input 
                      type="text" 
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={20}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {phoneNo.length}/20
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="e.g. rajesh@email.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {emailAddress.length}/100
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Location *
                    </label>
                    <input 
                      type="text" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Mumbai, Maharashtra"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                      maxLength={100}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {location.length}/100
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Our Works - Tags Input with Add Button */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Our Works * 
                    </label>
                    
                    {/* Display Tags with Numbers - Only First Work */}
                    {ourWorks.length > 0 && (
                      <div className="space-y-2 mb-3">
                        {ourWorks.slice(0, 1).map((work, index) => (
                          <div key={index} className="flex items-center justify-between bg-red-50/80 border border-red-200/50 rounded-lg px-3 py-2">
                            <span className="flex items-center gap-3 text-sm text-gray-700">
                              <span className="bg-red-100 text-red-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </span>
                              {work}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeWork(index)}
                              className="text-red-400 hover:text-red-600 transition-colors p-1"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                        {ourWorks.length > 1 && (
                          <p className="text-xs text-gray-400 mt-1">
                            + {ourWorks.length - 1} more work{ourWorks.length - 1 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Add Work Button */}
                    {!showWorkInput ? (
                      <button
                        type="button"
                        onClick={() => setShowWorkInput(true)}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-red-300 rounded-lg text-red-600 font-medium hover:bg-red-50 transition-all duration-200 w-full justify-center"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Add Work
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={worksInput}
                          onChange={(e) => setWorksInput(e.target.value)}
                          placeholder="Enter work name..."
                          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddWork();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddWork}
                          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowWorkInput(false);
                            setWorksInput('');
                          }}
                          className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      {ourWorks.length} work{ourWorks.length !== 1 ? 's' : ''} added
                    </div>
                  </div>

                  {/* Our Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Our Message *
                    </label>
                    <textarea 
                      value={ourMessage}
                      onChange={(e) => setOurMessage(e.target.value)}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                      rows="4"
                      maxLength={1000}
                    />
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {ourMessage.length}/1000
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
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
                  {editingId ? 'Update Contact' : 'Save Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => {
          setIsViewModalOpen(false);
          setViewingContact(null);
        }}>
          <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl border border-red-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-600" />
                Contact Details
              </h3>
              <button 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingContact(null);
                }}
                className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Contact Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{viewingContact.fullName}</p>
                </div>

                <div className="bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Phone className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone No.</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{viewingContact.phoneNo}</p>
                </div>

                <div className="bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Mail className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{viewingContact.emailAddress}</p>
                </div>

                <div className="bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Location</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{viewingContact.location}</p>
                </div>
              </div>

              {/* Our Works with Numbers - Only First Work */}
              <div className="bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div className="flex items-center gap-2 mb-2">
                  <List className="w-4 h-4 text-red-600" />
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Our Works</p>
                  <span className="ml-auto text-xs text-gray-400">Total: {viewingContact.ourWorks?.length || 0}</span>
                </div>
                {displayViewWorks(viewingContact.ourWorks)}
              </div>

              {/* Our Message */}
              <div className="bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div className="flex items-center gap-2 mb-1.5">
                  <MessageSquare className="w-4 h-4 text-red-600" />
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Our Message</p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{viewingContact.ourMessage}</p>
              </div>

              {/* Created Date */}
              <div className="bg-red-50/50 p-4 rounded-lg border border-red-200/50">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Created Date</p>
                </div>
                <p className="text-sm font-semibold text-gray-800">{viewingContact.createdAt}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setViewingContact(null);
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