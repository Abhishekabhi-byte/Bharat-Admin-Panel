'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Eye, 
  Edit2, 
  Trash2, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Search,
  AlertCircle,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  List,
  CheckCircle,
  Award,
  BadgeCheck,
  Users,
  User,
  Mail,
  Phone,
  GraduationCap,
  Download,
  XCircle,
  Clock as ClockIcon,
  UserCheck
} from 'lucide-react';

export default function JobManagement() {
  // ===================== JOB POSTS STATE =====================
  const [jobs, setJobs] = useState([
    {
      id: 1,
      jobTitle: 'Electrical Engineer',
      location: 'Patna, Bihar',
      experience: '3-5 Years',
      salary: 'Competitive',
      jobType: 'Full Time',
      roleOverview: 'Responsible for executing power substation and distribution network projects, leading engineering teams and ensuring safety compliance.',
      keyResponsibilities: '• Design, layout, and install electrical control panels and substation structures.\n• Coordinate with clients, electricity boards, and project heads to resolve technical discrepancies.\n• Conduct electrical load flow studies and circuit layout calculations.\n• Supervise on-site electrical installations and ensure strictly 100% safety standards.',
      requirements: '• B.Tech / B.E. in Electrical Engineering from a recognized institution.\n• 3+ years of experience in high-tension (HT) switchyard or grid erection.\n• Knowledge of electrical safety standards and regulations.',
      status: 'Active',
      createdAt: '2026-07-01'
    },
    {
      id: 2,
      jobTitle: 'Senior Electrical Engineer',
      location: 'Delhi, India',
      experience: '5-8 Years',
      salary: '₹12-18 LPA',
      jobType: 'Full Time',
      roleOverview: 'Lead electrical engineering projects and mentor junior engineers.',
      keyResponsibilities: '• Lead project teams and ensure timely delivery.\n• Review technical designs and specifications.\n• Coordinate with clients and stakeholders.',
      requirements: '• B.Tech in Electrical Engineering.\n• 5+ years of experience.\n• Strong leadership skills.',
      status: 'Active',
      createdAt: '2026-07-05'
    },
  ]);

  // ===================== JOB APPLICATIONS STATE =====================
  const [applications, setApplications] = useState([
    {
      id: 1,
      fullName: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      position: 'Electrical Engineer',
      experience: '5 Years',
      qualification: 'B.Tech Electrical',
      resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: 'Pending',
      viewed: false,
      appliedDate: '2026-07-20'
    },
    {
      id: 2,
      fullName: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      position: 'Senior Electrical Engineer',
      experience: '8 Years',
      qualification: 'M.Tech Electrical',
      resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: 'Shortlisted',
      viewed: true,
      appliedDate: '2026-07-19'
    },
    {
      id: 3,
      fullName: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      position: 'Junior Electrical Engineer',
      experience: '2 Years',
      qualification: 'B.Tech Electrical',
      resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: 'Rejected',
      viewed: true,
      appliedDate: '2026-07-18'
    },
    {
      id: 4,
      fullName: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 65432 10987',
      position: 'Electrical Engineer',
      experience: '4 Years',
      qualification: 'B.E. Electrical',
      resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: 'Hired',
      viewed: true,
      appliedDate: '2026-07-17'
    },
    {
      id: 5,
      fullName: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 54321 09876',
      position: 'Site Electrical Engineer',
      experience: '3 Years',
      qualification: 'Diploma Electrical',
      resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      status: 'Pending',
      viewed: false,
      appliedDate: '2026-07-16'
    },
  ]);

  // ===================== JOB POSTS PAGINATION =====================
  const [jobCurrentPage, setJobCurrentPage] = useState(1);
  const [jobSearchTerm, setJobSearchTerm] = useState('');
  const itemsPerPage = 5;

  // ===================== APPLICATIONS PAGINATION =====================
  const [appCurrentPage, setAppCurrentPage] = useState(1);
  const [appSearchTerm, setAppSearchTerm] = useState('');

  // ===================== JOB POSTS FORM STATE =====================
  const [jobFormData, setJobFormData] = useState({
    jobTitle: '',
    location: '',
    experience: '',
    salary: '',
    jobType: '',
    roleOverview: '',
    keyResponsibilities: '',
    requirements: '',
    status: 'Active'
  });
  const [jobFormError, setJobFormError] = useState('');
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  const [isJobViewModalOpen, setIsJobViewModalOpen] = useState(false);
  const [isDeletingJob, setIsDeletingJob] = useState(false);

  // ===================== APPLICATIONS FORM STATE =====================
  const [appFormData, setAppFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    qualification: '',
    status: 'Pending'
  });
  const [appFormError, setAppFormError] = useState('');
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingAppId, setEditingAppId] = useState(null);
  const [viewingApplication, setViewingApplication] = useState(null);
  const [isAppViewModalOpen, setIsAppViewModalOpen] = useState(false);
  const [isDeletingApp, setIsDeletingApp] = useState(false);

  // ===================== OPTIONS =====================
  const jobTypeOptions = ['Full Time', 'Part Time', 'Internship', 'Contract'];
  const statusOptions = ['Pending', 'Shortlisted', 'Rejected', 'Hired'];
  const jobStatusOptions = ['Active', 'Inactive'];

  // ===================== JOB POSTS FILTER =====================
  const filteredJobs = jobs.filter(job =>
    job.jobTitle.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
    job.jobType.toLowerCase().includes(jobSearchTerm.toLowerCase())
  );

  const jobTotalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const jobIndexOfLastItem = jobCurrentPage * itemsPerPage;
  const jobIndexOfFirstItem = jobIndexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(jobIndexOfFirstItem, jobIndexOfLastItem);

  useEffect(() => {
    setJobCurrentPage(1);
  }, [jobSearchTerm]);

  // ===================== APPLICATIONS FILTER =====================
  const filteredApplications = applications.filter(app =>
    app.fullName.toLowerCase().includes(appSearchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(appSearchTerm.toLowerCase()) ||
    app.position.toLowerCase().includes(appSearchTerm.toLowerCase()) ||
    app.status.toLowerCase().includes(appSearchTerm.toLowerCase())
  );

  const appTotalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const appIndexOfLastItem = appCurrentPage * itemsPerPage;
  const appIndexOfFirstItem = appIndexOfLastItem - itemsPerPage;
  const currentApplications = filteredApplications.slice(appIndexOfFirstItem, appIndexOfLastItem);

  useEffect(() => {
    setAppCurrentPage(1);
  }, [appSearchTerm]);

  // ===================== JOB POSTS CRUD =====================
  const validateJobForm = () => {
    const { jobTitle, location, experience, salary, jobType, roleOverview, keyResponsibilities, requirements } = jobFormData;
    if (!jobTitle.trim()) { setJobFormError('Please enter the job title.'); return false; }
    if (!location.trim()) { setJobFormError('Please enter the location.'); return false; }
    if (!experience.trim()) { setJobFormError('Please enter the experience.'); return false; }
    if (!salary.trim()) { setJobFormError('Please enter the salary.'); return false; }
    if (!jobType) { setJobFormError('Please select the job type.'); return false; }
    if (!roleOverview.trim()) { setJobFormError('Please enter the role overview.'); return false; }
    if (!keyResponsibilities.trim()) { setJobFormError('Please enter the key responsibilities.'); return false; }
    if (!requirements.trim()) { setJobFormError('Please enter the requirements.'); return false; }
    return true;
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    setJobFormError('');
    if (!validateJobForm()) return;

    const newJob = {
      id: Date.now(),
      ...jobFormData,
      jobTitle: jobFormData.jobTitle.trim(),
      location: jobFormData.location.trim(),
      experience: jobFormData.experience.trim(),
      salary: jobFormData.salary.trim(),
      roleOverview: jobFormData.roleOverview.trim(),
      keyResponsibilities: jobFormData.keyResponsibilities.trim(),
      requirements: jobFormData.requirements.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    setJobs([newJob, ...jobs]);
    setJobCurrentPage(1);
    resetJobForm();
    setIsJobModalOpen(false);
  };

  const handleEditJob = (job) => {
    setEditingJobId(job.id);
    setJobFormData({
      jobTitle: job.jobTitle,
      location: job.location,
      experience: job.experience,
      salary: job.salary,
      jobType: job.jobType,
      roleOverview: job.roleOverview,
      keyResponsibilities: job.keyResponsibilities,
      requirements: job.requirements,
      status: job.status
    });
    setJobFormError('');
    setIsJobModalOpen(true);
  };

  const handleUpdateJob = (e) => {
    e.preventDefault();
    setJobFormError('');
    if (!validateJobForm()) return;

    const updatedJobs = jobs.map(job =>
      job.id === editingJobId
        ? {
            ...job,
            ...jobFormData,
            jobTitle: jobFormData.jobTitle.trim(),
            location: jobFormData.location.trim(),
            experience: jobFormData.experience.trim(),
            salary: jobFormData.salary.trim(),
            roleOverview: jobFormData.roleOverview.trim(),
            keyResponsibilities: jobFormData.keyResponsibilities.trim(),
            requirements: jobFormData.requirements.trim()
          }
        : job
    );

    setJobs(updatedJobs);
    resetJobForm();
    setIsJobModalOpen(false);
    setEditingJobId(null);
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job post?')) {
      setIsDeletingJob(true);
      setTimeout(() => {
        const updatedJobs = jobs.filter(job => job.id !== id);
        setJobs(updatedJobs);
        const newTotalPages = Math.ceil(updatedJobs.length / itemsPerPage);
        if (jobCurrentPage > newTotalPages && newTotalPages > 0) {
          setJobCurrentPage(newTotalPages);
        }
        setIsDeletingJob(false);
      }, 300);
    }
  };

  const handleViewJob = (job) => {
    setViewingJob(job);
    setIsJobViewModalOpen(true);
  };

  const resetJobForm = () => {
    setJobFormData({
      jobTitle: '',
      location: '',
      experience: '',
      salary: '',
      jobType: '',
      roleOverview: '',
      keyResponsibilities: '',
      requirements: '',
      status: 'Active'
    });
    setEditingJobId(null);
    setJobFormError('');
  };

  const closeJobModal = () => {
    setIsJobModalOpen(false);
    resetJobForm();
  };

  // ===================== APPLICATIONS CRUD =====================
  const validateAppForm = () => {
    const { fullName, email, phone, position, experience, qualification } = appFormData;
    if (!fullName.trim()) { setAppFormError('Please enter the full name.'); return false; }
    if (!email.trim()) { setAppFormError('Please enter the email address.'); return false; }
    if (!email.includes('@') || !email.includes('.')) { setAppFormError('Please enter a valid email address.'); return false; }
    if (!phone.trim()) { setAppFormError('Please enter the phone number.'); return false; }
    if (!position.trim()) { setAppFormError('Please enter the position.'); return false; }
    if (!experience.trim()) { setAppFormError('Please enter the experience.'); return false; }
    if (!qualification.trim()) { setAppFormError('Please enter the qualification.'); return false; }
    return true;
  };

  const handleEditApplication = (app) => {
    setEditingAppId(app.id);
    setAppFormData({
      fullName: app.fullName,
      email: app.email,
      phone: app.phone,
      position: app.position,
      experience: app.experience,
      qualification: app.qualification,
      status: app.status
    });
    setAppFormError('');
    setIsAppModalOpen(true);
  };

  const handleUpdateApplication = (e) => {
    e.preventDefault();
    setAppFormError('');
    if (!validateAppForm()) return;

    const updatedApplications = applications.map(app =>
      app.id === editingAppId
        ? {
            ...app,
            ...appFormData,
            fullName: appFormData.fullName.trim(),
            email: appFormData.email.trim(),
            phone: appFormData.phone.trim(),
            position: appFormData.position.trim(),
            experience: appFormData.experience.trim(),
            qualification: appFormData.qualification.trim()
          }
        : app
    );

    setApplications(updatedApplications);
    resetAppForm();
    setIsAppModalOpen(false);
    setEditingAppId(null);
  };

  const handleDeleteApplication = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setIsDeletingApp(true);
      setTimeout(() => {
        const updatedApplications = applications.filter(app => app.id !== id);
        setApplications(updatedApplications);
        const newTotalPages = Math.ceil(updatedApplications.length / itemsPerPage);
        if (appCurrentPage > newTotalPages && newTotalPages > 0) {
          setAppCurrentPage(newTotalPages);
        }
        setIsDeletingApp(false);
      }, 300);
    }
  };

  const handleViewApplication = (app) => {
    if (!app.viewed) {
      const updatedApplications = applications.map(a =>
        a.id === app.id ? { ...a, viewed: true } : a
      );
      setApplications(updatedApplications);
    }
    setViewingApplication(app);
    setIsAppViewModalOpen(true);
  };

  const resetAppForm = () => {
    setAppFormData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      qualification: '',
      status: 'Pending'
    });
    setEditingAppId(null);
    setAppFormError('');
  };

  const closeAppModal = () => {
    setIsAppModalOpen(false);
    resetAppForm();
  };

  // ===================== HELPER FUNCTIONS =====================
  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-700 border-green-200',
      'Inactive': 'bg-red-100 text-red-700 border-red-200',
      'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Shortlisted': 'bg-blue-100 text-blue-700 border-blue-200',
      'Rejected': 'bg-red-100 text-red-700 border-red-200',
      'Hired': 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': <ClockIcon className="w-3 h-3" />,
      'Shortlisted': <UserCheck className="w-3 h-3" />,
      'Rejected': <XCircle className="w-3 h-3" />,
      'Hired': <CheckCircle className="w-3 h-3" />
    };
    return icons[status] || null;
  };

  const getJobTypeColor = (type) => {
    const colors = {
      'Full Time': 'bg-blue-100 text-blue-700 border-blue-200',
      'Part Time': 'bg-purple-100 text-purple-700 border-purple-200',
      'Internship': 'bg-orange-100 text-orange-700 border-orange-200',
      'Contract': 'bg-teal-100 text-teal-700 border-teal-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatBulletPoints = (text) => {
    if (!text) return [];
    return text.split('\n').filter(item => item.trim());
  };

  const truncateText = (text, maxLength = 40) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '…';
  };

  // ===================== PAGINATION COMPONENT =====================
  const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems, startIndex }) => {
    if (totalItems === 0) return null;

    return (
      <div className="px-4 py-3 border-t border-red-200/50 flex flex-col sm:flex-row justify-between items-center gap-2 bg-red-50/30">
        <span className="font-medium text-gray-500 text-xs">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
            let pageNum;
            if (totalPages <= 5) pageNum = index + 1;
            else if (currentPage <= 3) pageNum = index + 1;
            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + index;
            else pageNum = currentPage - 2 + index;
            const isSelected = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${isSelected ? 'bg-red-600 text-white shadow-md' : 'bg-white border border-red-200/50 text-gray-600 hover:bg-red-50'}`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-red-200/50 bg-white text-gray-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full  flex items-start justify-center p-4 md:p-6 relative overflow-hidden">
    
      <div className="w-full max-w-7xl bg-slate-700 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border border-white/20 relative z-10 space-y-8">
        
        {/* ==================== SECTION 1: JOB POSTS ==================== */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-1 bg-red-600 rounded"></div>
            <h2 className="text-xl font-bold text-white">📋 Job Posts</h2>
            <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
              {filteredJobs.length}
            </span>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden">
            <div className="flex flex-wrap justify-between items-center p-4 border-b border-red-200/50 gap-3 bg-white/50">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-800 text-sm">Manage Job Posts</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-48 md:w-56 pl-9 pr-3.5 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                    value={jobSearchTerm}
                    onChange={(e) => setJobSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    resetJobForm();
                    setIsJobModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Job
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-red-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="px-4 py-3 min-w-[120px]">Job Title</th>
                    <th className="px-4 py-3 min-w-[100px]">Location</th>
                    <th className="px-4 py-3 w-[100px]">Experience</th>
                    <th className="px-4 py-3 w-[100px]">Job Type</th>
                    <th className="px-4 py-3 w-[90px] text-center">Status</th>
                    <th className="px-4 py-3 w-[140px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-100/50">
                  {currentJobs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-12">
                        <Briefcase className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                        <p className="font-medium text-gray-500 text-sm">No job posts found</p>
                      </td>
                    </tr>
                  ) : (
                    currentJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-red-50/30 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-semibold text-gray-800 text-sm">{job.jobTitle}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1.5 text-sm text-gray-600">
                            <MapPin className="w-3.5 h-3.5 text-red-600" /> {job.location}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Clock className="w-3.5 h-3.5 text-red-600" /> {job.experience}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-1 py-0.5 rounded-full border text-[10px] font-medium ${getJobTypeColor(job.jobType)}`}>
                            <BadgeCheck className="w-3 h-3" /> {job.jobType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${getStatusColor(job.status)}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button onClick={() => handleViewJob(job)} className="p-1.5 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleEditJob(job)} className="p-1.5 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeleteJob(job.id)} disabled={isDeletingJob} className="p-1.5 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50">
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

            <Pagination
              currentPage={jobCurrentPage}
              totalPages={jobTotalPages}
              onPageChange={setJobCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredJobs.length}
              startIndex={jobIndexOfFirstItem}
            />
          </div>
        </div>

        {/* ==================== SECTION 2: JOB APPLICATIONS ==================== */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-1 bg-blue-600 rounded"></div>
            <h2 className="text-xl font-bold text-white">📩 Candidate Responses</h2>
            <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
              {filteredApplications.length}
            </span>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl overflow-hidden">
            <div className="flex flex-wrap justify-between items-center p-4 border-b border-red-200/50 gap-3 bg-white/50">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-800 text-sm">Manage Applications</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="w-48 md:w-56 pl-9 pr-3.5 py-2 text-sm text-gray-800 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 bg-white/80"
                  value={appSearchTerm}
                  onChange={(e) => setAppSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50/50 border-b border-red-200/50 text-gray-700 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="px-4 py-3 w-[50px]">#</th>
                    <th className="px-4 py-3 min-w-[120px]">Full Name</th>
                    <th className="px-4 py-3 min-w-[140px]">Email</th>
                    <th className="px-4 py-3 min-w-[100px]">Phone</th>
                    <th className="px-4 py-3 min-w-[120px]">Position</th>
                    <th className="px-4 py-3 w-[90px] text-center">Status</th>
                    <th className="px-4 py-3 w-[140px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-100/50">
                  {currentApplications.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-12">
                        <Users className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                        <p className="font-medium text-gray-500 text-sm">No applications found</p>
                      </td>
                    </tr>
                  ) : (
                    currentApplications.map((app, index) => (
                      <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-4 py-3 text-center text-sm text-gray-500">
                          {appIndexOfFirstItem + index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            <span className="font-semibold text-gray-800 text-sm">{app.fullName}</span>
                            {!app.viewed && <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Unread" />}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm text-gray-600 truncate max-w-[120px]">{app.email}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm text-gray-600">{app.phone}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-sm text-gray-600">{app.position}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${getStatusColor(app.status)}`}>
                            {getStatusIcon(app.status)}
                            {app.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button onClick={() => handleViewApplication(app)} className="p-1.5 text-gray-400 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleEditApplication(app)} className="p-1.5 text-gray-400 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeleteApplication(app.id)} disabled={isDeletingApp} className="p-1.5 text-gray-400 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50">
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

            <Pagination
              currentPage={appCurrentPage}
              totalPages={appTotalPages}
              onPageChange={setAppCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredApplications.length}
              startIndex={appIndexOfFirstItem}
            />
          </div>
        </div>
      </div>

      {/* ==================== JOB POST MODAL ==================== */}
      {isJobModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeJobModal}>
          <div className="bg-white rounded-xl w-full max-w-2xl p-5 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                {editingJobId ? <><Edit2 className="w-4 h-4 text-red-600" /> Edit Job</> : <><Plus className="w-4 h-4 text-red-600" /> Add New Job</>}
              </h3>
              <button onClick={closeJobModal} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
            {jobFormError && (
              <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-xs">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5" />
                <span>{jobFormError}</span>
              </div>
            )}
            <form onSubmit={editingJobId ? handleUpdateJob : handleCreateJob} className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Job Title *</label>
                    <input type="text" value={jobFormData.jobTitle} onChange={(e) => setJobFormData({...jobFormData, jobTitle: e.target.value})} placeholder="e.g. Electrical Engineer" className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500" maxLength={200} />
                    <div className="text-[10px] text-gray-400 mt-0.5 text-right">{jobFormData.jobTitle.length}/200</div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Location *</label>
                    <input type="text" value={jobFormData.location} onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})} placeholder="e.g. Patna, Bihar" className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500" maxLength={200} />
                    <div className="text-[10px] text-gray-400 mt-0.5 text-right">{jobFormData.location.length}/200</div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Experience *</label>
                    <input type="text" value={jobFormData.experience} onChange={(e) => setJobFormData({...jobFormData, experience: e.target.value})} placeholder="e.g. 3-5 Years" className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500" maxLength={100} />
                    <div className="text-[10px] text-gray-400 mt-0.5 text-right">{jobFormData.experience.length}/100</div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Salary/Compensation *</label>
                    <input type="text" value={jobFormData.salary} onChange={(e) => setJobFormData({...jobFormData, salary: e.target.value})} placeholder="e.g. Competitive" className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500" maxLength={100} />
                    <div className="text-[10px] text-gray-400 mt-0.5 text-right">{jobFormData.salary.length}/100</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Job Type *</label>
                    <select value={jobFormData.jobType} onChange={(e) => setJobFormData({...jobFormData, jobType: e.target.value})} className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 bg-white">
                      <option value="">Select Job Type</option>
                      {jobTypeOptions.map((type) => (<option key={type} value={type}>{type}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Role Overview *</label>
                    <textarea value={jobFormData.roleOverview} onChange={(e) => setJobFormData({...jobFormData, roleOverview: e.target.value})} placeholder="Brief description of the role..." className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 resize-none" rows="2" maxLength={500} />
                    <div className="text-[10px] text-gray-400 mt-0.5 text-right">{jobFormData.roleOverview.length}/500</div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Status</label>
                    <select value={jobFormData.status} onChange={(e) => setJobFormData({...jobFormData, status: e.target.value})} className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 bg-white">
                      {jobStatusOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Key Responsibilities *</label>
                <textarea value={jobFormData.keyResponsibilities} onChange={(e) => setJobFormData({...jobFormData, keyResponsibilities: e.target.value})} placeholder="• Responsibility 1\n• Responsibility 2" className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 resize-none" rows="3" maxLength={1000} />
                <div className="text-[10px] text-gray-400 mt-0.5 text-right">{jobFormData.keyResponsibilities.length}/1000</div>
                <p className="text-[10px] text-gray-400 mt-0.5">Use • or - for bullet points</p>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Requirements & Qualifications *</label>
                <textarea value={jobFormData.requirements} onChange={(e) => setJobFormData({...jobFormData, requirements: e.target.value})} placeholder="• B.Tech / B.E. in Electrical Engineering" className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-red-500 resize-none" rows="3" maxLength={1000} />
                <div className="text-[10px] text-gray-400 mt-0.5 text-right">{jobFormData.requirements.length}/1000</div>
                <p className="text-[10px] text-gray-400 mt-0.5">Use • or - for bullet points</p>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={closeJobModal} className="flex-1 py-2 border border-gray-200 rounded-lg font-semibold text-gray-600 text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all">{editingJobId ? 'Update Job' : 'Save Job'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== JOB VIEW MODAL ==================== */}
      {isJobViewModalOpen && viewingJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => { setIsJobViewModalOpen(false); setViewingJob(null); }}>
          <div className="bg-white rounded-xl w-full max-w-2xl p-5 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2"><Briefcase className="w-4 h-4 text-red-600" /> Job Details</h3>
              <button onClick={() => { setIsJobViewModalOpen(false); setViewingJob(null); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-50 to-red-50/30 p-4 rounded-lg border border-red-200/50">
                <h4 className="text-lg font-bold text-gray-800">{viewingJob.jobTitle}</h4>
                <div className="flex flex-wrap gap-3 mt-2">
                  <span className="flex items-center gap-1.5 text-sm text-gray-600"><MapPin className="w-4 h-4 text-red-600" /> {viewingJob.location}</span>
                  <span className="flex items-center gap-1.5 text-sm text-gray-600"><Clock className="w-4 h-4 text-red-600" /> {viewingJob.experience}</span>
                  <span className="flex items-center gap-1.5 text-sm text-gray-600"><DollarSign className="w-4 h-4 text-red-600" /> {viewingJob.salary}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${getJobTypeColor(viewingJob.jobType)}`}><BadgeCheck className="w-3 h-3" /> {viewingJob.jobType}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor(viewingJob.status)}`}><span className={`w-1.5 h-1.5 rounded-full ${viewingJob.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} /> {viewingJob.status}</span>
                </div>
              </div>
              <div className="bg-red-50/50 p-3 rounded-lg border border-red-200/50">
                <div className="flex items-center gap-2 mb-1.5"><FileText className="w-4 h-4 text-red-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Role Overview</p></div>
                <p className="text-sm text-gray-700">{viewingJob.roleOverview}</p>
              </div>
              <div className="bg-red-50/50 p-3 rounded-lg border border-red-200/50">
                <div className="flex items-center gap-2 mb-1.5"><List className="w-4 h-4 text-red-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Key Responsibilities</p></div>
                <ul className="space-y-1">{formatBulletPoints(viewingJob.keyResponsibilities).map((item, idx) => (<li key={idx} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-red-600 mt-0.5">•</span>{item.replace(/^[•\-]\s*/, '')}</li>))}</ul>
              </div>
              <div className="bg-red-50/50 p-3 rounded-lg border border-red-200/50">
                <div className="flex items-center gap-2 mb-1.5"><Award className="w-4 h-4 text-red-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Requirements</p></div>
                <ul className="space-y-1">{formatBulletPoints(viewingJob.requirements).map((item, idx) => (<li key={idx} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-red-600 mt-0.5">•</span>{item.replace(/^[•\-]\s*/, '')}</li>))}</ul>
              </div>
              <button onClick={() => { setIsJobViewModalOpen(false); setViewingJob(null); }} className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== APPLICATION MODAL ==================== */}
      {isAppModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeAppModal}>
          <div className="bg-white rounded-xl w-full max-w-2xl p-5 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2"><Edit2 className="w-4 h-4 text-blue-600" /> Edit Application</h3>
              <button onClick={closeAppModal} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600"><X className="w-4 h-4" /></button>
            </div>
            {appFormError && (
              <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-600 text-xs">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5" /><span>{appFormError}</span>
              </div>
            )}
            <form onSubmit={handleUpdateApplication} className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Full Name *</label><input type="text" value={appFormData.fullName} onChange={(e) => setAppFormData({...appFormData, fullName: e.target.value})} className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500" maxLength={100} /></div>
                <div><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Email Address *</label><input type="email" value={appFormData.email} onChange={(e) => setAppFormData({...appFormData, email: e.target.value})} className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500" maxLength={100} /></div>
                <div><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Phone Number *</label><input type="text" value={appFormData.phone} onChange={(e) => setAppFormData({...appFormData, phone: e.target.value})} className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500" maxLength={20} /></div>
                <div><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Position *</label><input type="text" value={appFormData.position} onChange={(e) => setAppFormData({...appFormData, position: e.target.value})} className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500" maxLength={100} /></div>
                <div><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Experience *</label><input type="text" value={appFormData.experience} onChange={(e) => setAppFormData({...appFormData, experience: e.target.value})} placeholder="e.g. 5 Years" className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500" maxLength={50} /></div>
                <div><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Qualification *</label><input type="text" value={appFormData.qualification} onChange={(e) => setAppFormData({...appFormData, qualification: e.target.value})} placeholder="e.g. B.Tech Electrical" className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500" maxLength={100} /></div>
                <div className="col-span-2"><label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">Status *</label><select value={appFormData.status} onChange={(e) => setAppFormData({...appFormData, status: e.target.value})} className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-blue-500 bg-white">{statusOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}</select></div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={closeAppModal} className="flex-1 py-2 border border-gray-200 rounded-lg font-semibold text-gray-600 text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm">Update Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== APPLICATION VIEW MODAL ==================== */}
      {isAppViewModalOpen && viewingApplication && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => { setIsAppViewModalOpen(false); setViewingApplication(null); }}>
          <div className="bg-white rounded-xl w-full max-w-2xl p-5 shadow-xl border border-red-200 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-800 flex items-center gap-2"><Users className="w-4 h-4 text-blue-600" /> Application Details</h3>
              <button onClick={() => { setIsAppViewModalOpen(false); setViewingApplication(null); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-50/30 p-4 rounded-lg border border-blue-200/50">
                <h4 className="text-lg font-bold text-gray-800">{viewingApplication.fullName}</h4>
                <p className="text-gray-600 text-sm mt-1">Applied for: {viewingApplication.position}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2 mb-1"><User className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Full Name</p></div><p className="text-sm font-semibold text-gray-800">{viewingApplication.fullName}</p></div>
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2 mb-1"><Mail className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email</p></div><p className="text-sm font-semibold text-gray-800">{viewingApplication.email}</p></div>
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2 mb-1"><Phone className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Phone</p></div><p className="text-sm font-semibold text-gray-800">{viewingApplication.phone}</p></div>
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2 mb-1"><Briefcase className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Position</p></div><p className="text-sm font-semibold text-gray-800">{viewingApplication.position}</p></div>
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2 mb-1"><Clock className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Experience</p></div><p className="text-sm font-semibold text-gray-800">{viewingApplication.experience}</p></div>
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2 mb-1"><GraduationCap className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Qualification</p></div><p className="text-sm font-semibold text-gray-800">{viewingApplication.qualification}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2 mb-1"><FileText className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</p></div><span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${getStatusColor(viewingApplication.status)}`}>{getStatusIcon(viewingApplication.status)}{viewingApplication.status}</span></div>
                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2 mb-1"><Download className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Resume</p></div><a href={viewingApplication.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg"><FileText className="w-3.5 h-3.5" /> Download PDF</a></div>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50"><div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600" /><p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Applied Date</p><span className="ml-auto text-sm font-medium text-gray-700">{viewingApplication.appliedDate}</span></div></div>
              <button onClick={() => { setIsAppViewModalOpen(false); setViewingApplication(null); }} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}