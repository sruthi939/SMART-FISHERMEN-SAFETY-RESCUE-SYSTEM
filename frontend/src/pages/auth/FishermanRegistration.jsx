import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Anchor, User, Calendar, Phone, Mail, CreditCard,
  Droplet, Heart, MapPin, Home, Flag, BookOpen, Briefcase, Lock, Eye, EyeOff, CheckCircle2,
  ShieldCheck, ArrowRight, ArrowLeft, Upload, Ship, LifeBuoy, CloudSun, Users, PhoneCall, UserPlus
} from 'lucide-react';
import { authService } from '../../services/authService';
import { useNotification } from '../../hooks/useNotification';

export default function FishermanRegistration() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState({ pass: false, confirmPass: false });

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal & Security
    name: '',
    dob: '',
    phone: '',
    email: '',
    aadhaar: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    state: '',
    pincode: '',
    experience: '',
    primaryFishingArea: '',
    typesOfFishing: [],
    password: '',
    confirmPassword: '',

    // Step 2: Boat Details
    boatName: '',
    boatRegNumber: '',
    engineHp: '',
    vesselType: 'Motorized',
    crewCapacity: '4',

    // Step 3: Documents
    boatRegCopy: null,
    fishingLicenseCopy: null,
    aadhaarCopy: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const current = prev.typesOfFishing || [];
      if (checked) return { ...prev, typesOfFishing: [...current, value] };
      return { ...prev, typesOfFishing: current.filter(item => item !== value) };
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const cleanAadhaar = (formData.aadhaar || '').replace(/\D/g, '');
      if (cleanAadhaar.length !== 12) {
        addNotification('Aadhaar Number must contain exactly 12 numeric digits (e.g. 987654321012)!', 'error');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanAadhaar = (formData.aadhaar || '').replace(/\D/g, '');
    if (cleanAadhaar.length !== 12) {
      addNotification('Aadhaar Number must contain exactly 12 numeric digits!', 'error');
      setCurrentStep(1);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addNotification('Passwords do not match!', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        aadhaar: cleanAadhaar,
        role: 'fisherman'
      };

      const res = await authService.register(payload);
      addNotification(
        'Registration Submitted! Your account is pending Government Admin verification & approval. Please sign in after Admin approval.',
        'warning'
      );
      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
    } catch (err) {
      console.error('Registration failed:', err);
      addNotification(err.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4fa] text-slate-800 p-4 sm:p-6 lg:p-8 font-sans selection:bg-blue-600 selection:text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT HERO SIDEBAR (Matching Mockup Image) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/30 shrink-0">
              <Anchor size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-xs tracking-tight uppercase leading-tight">SMART FISHERMEN</h2>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wider">SAFETY & RESCUE SYSTEM</p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">Fishermen Registration</h1>
            <p className="text-xs text-slate-500 mt-1">
              Create your account to access safety features, live tracking, weather updates, and emergency support.
            </p>
          </div>

          {/* Ocean Boat Hero Graphic */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-blue-600/10 p-4 flex flex-col items-center text-center space-y-2">
            <div className="w-full h-36 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-4xl shadow-inner">
              🚢
            </div>
          </div>

          {/* 4 Feature Badges */}
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Anchor size={16} />
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Live Boat Tracking</strong>
                <span className="text-[11px] text-slate-500">Share your location in real-time</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <LifeBuoy size={16} />
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">SOS Emergency</strong>
                <span className="text-[11px] text-slate-500">Instant alert to rescue teams and family</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <CloudSun size={16} />
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Weather Updates</strong>
                <span className="text-[11px] text-slate-500">Get alerts for severe weather conditions</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Users size={16} />
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Family Connection</strong>
                <span className="text-[11px] text-slate-500">Keep your family updated about your safety</span>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl text-xs space-y-1">
            <strong className="text-slate-900 font-bold block">Need Help?</strong>
            <p className="text-[11px] text-slate-500">Contact your local fisheries office or call our helpline.</p>
            <a href="tel:18001234567" className="font-extrabold text-blue-600 flex items-center gap-1.5 pt-1 text-xs">
              <PhoneCall size={14} /> 1800 123 4567
            </a>
          </div>
        </div>

        {/* RIGHT FORM CONTAINER (Matching Mockup Wizard) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md space-y-8">

          {/* Form Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Create Fisherman Account</h2>
              <p className="text-xs text-slate-500 mt-0.5">Please fill in the details below to register</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 hidden sm:inline">Already have an account?</span>
              <Link to="/auth/login" className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition">
                Login
              </Link>
            </div>
          </div>

          {/* 4 Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs border-b border-slate-100 pb-6 relative">
            <div className="flex flex-col items-center gap-1 z-10">
              <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center transition ${currentStep >= 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-400'
                }`}>1</div>
              <span className={`font-bold text-[11px] ${currentStep >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>Personal Info</span>
            </div>

            <div className="flex flex-col items-center gap-1 z-10">
              <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center transition ${currentStep >= 2 ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-400'
                }`}>2</div>
              <span className={`font-bold text-[11px] ${currentStep >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>Boat Details</span>
            </div>

            <div className="flex flex-col items-center gap-1 z-10">
              <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center transition ${currentStep >= 3 ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-400'
                }`}>3</div>
              <span className={`font-bold text-[11px] ${currentStep >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>Documents</span>
            </div>

            <div className="flex flex-col items-center gap-1 z-10">
              <div className={`w-8 h-8 rounded-full font-black flex items-center justify-center transition ${currentStep >= 4 ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'bg-slate-100 text-slate-400'
                }`}>4</div>
              <span className={`font-bold text-[11px] ${currentStep >= 4 ? 'text-blue-600' : 'text-slate-400'}`}>Admin Approval</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* STEP 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6 text-xs">
                {/* 1. Personal Information Section */}
                <div className="space-y-3">
                  <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm text-blue-600">
                    <User size={16} /> 1. Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          name="name"
                          type="text"
                          placeholder="Enter full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Date of Birth *</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          name="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                      <div className="relative flex">
                        <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl px-3 py-2 text-slate-600 font-bold flex items-center gap-1">
                          <Phone size={14} /> +91
                        </span>
                        <input
                          name="phone"
                          type="tel"
                          placeholder="Enter mobile number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-r-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          name="email"
                          type="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Aadhaar Number * <span className="text-[10px] text-slate-400 font-normal">(12 Digits)</span></label>
                      <div className="relative">
                        <CreditCard size={16} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          name="aadhaar"
                          type="text"
                          maxLength={12}
                          placeholder="Enter 12 digit Aadhaar number"
                          value={formData.aadhaar}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 12);
                            setFormData(prev => ({ ...prev, aadhaar: val }));
                          }}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Blood Group</label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select blood group</option>
                        <option value="O+">O positive (O+)</option>
                        <option value="A+">A positive (A+)</option>
                        <option value="B+">B positive (B+)</option>
                        <option value="AB+">AB positive (AB+)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Marital Status</label>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select marital status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Emergency Contact Name *</label>
                      <input
                        name="emergencyContactName"
                        type="text"
                        placeholder="Enter contact person name"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Emergency Contact Number *</label>
                      <input
                        name="emergencyContactPhone"
                        type="tel"
                        placeholder="Enter contact number"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Address Information */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm text-blue-600">
                    <MapPin size={16} /> 2. Address Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Address Line 1 *</label>
                      <input
                        name="addressLine1"
                        type="text"
                        placeholder="House / Street / Area"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Address Line 2</label>
                      <input
                        name="addressLine2"
                        type="text"
                        placeholder="Landmark (Optional)"
                        value={formData.addressLine2}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">District *</label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select district</option>
                        <option value="Rameswaram">Rameswaram</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Alappuzha">Alappuzha</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select state</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Goa">Goa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Pincode *</label>
                      <input
                        name="pincode"
                        type="text"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Fishing Experience */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm text-blue-600">
                    <Anchor size={16} /> 3. Fishing Experience
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Years of Experience *</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select experience</option>
                        <option value="1-3 Years">1 - 3 Years</option>
                        <option value="4-8 Years">4 - 8 Years</option>
                        <option value="9+ Years">9+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Primary Fishing Area *</label>
                      <select
                        name="primaryFishingArea"
                        value={formData.primaryFishingArea}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select fishing area</option>
                        <option value="Palk Bay">Palk Bay</option>
                        <option value="Gulf of Mannar">Gulf of Mannar</option>
                        <option value="Arabian Sea">Arabian Sea</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Types of Fishing</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Deep Sea Fishing', 'Coastal Fishing', 'Inland Fishing', 'Other'].map((type) => (
                        <label key={type} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer text-slate-700">
                          <input
                            type="checkbox"
                            value={type}
                            checked={(formData.typesOfFishing || []).includes(type)}
                            onChange={handleCheckboxChange}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. Account Security */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm text-blue-600">
                    <ShieldCheck size={16} /> 4. Account Security
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Password *</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          name="password"
                          type={showPass.pass ? 'text' : 'password'}
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                        <button type="button" onClick={() => setShowPass(prev => ({ ...prev, pass: !prev.pass }))} className="absolute right-3 top-2.5 text-slate-400">
                          {showPass.pass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Confirm Password *</label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3 top-2.5 text-slate-400" />
                        <input
                          name="confirmPassword"
                          type={showPass.confirmPass ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                        />
                        <button type="button" onClick={() => setShowPass(prev => ({ ...prev, confirmPass: !prev.confirmPass }))} className="absolute right-3 top-2.5 text-slate-400">
                          {showPass.confirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Requirements Box */}
                  <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl space-y-1 text-[11px] text-blue-900">
                    <strong className="block font-bold">Password Requirements:</strong>
                    <div className="grid grid-cols-2 gap-1 text-slate-600">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold"><CheckCircle2 size={12} /> At least 8 characters long</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold"><CheckCircle2 size={12} /> Include at least one number</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold"><CheckCircle2 size={12} /> Include uppercase & lowercase</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold"><CheckCircle2 size={12} /> Include one special character</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Boat Details */}
            {currentStep === 2 && (
              <div className="space-y-4 text-xs">
                <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm text-blue-600">
                  <Ship size={16} /> Vessel & Boat Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Boat Name *</label>
                    <input
                      name="boatName"
                      type="text"
                      placeholder="e.g. Sea Queen"
                      value={formData.boatName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Vessel Registration Number *</label>
                    <input
                      name="boatRegNumber"
                      type="text"
                      placeholder="e.g. TN 07 MF 4587"
                      value={formData.boatRegNumber}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Engine Horsepower (HP)</label>
                    <input
                      name="engineHp"
                      type="text"
                      placeholder="e.g. 120 HP"
                      value={formData.engineHp}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Vessel Type</label>
                    <select
                      name="vesselType"
                      value={formData.vesselType}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Motorized">Motorized Trawler</option>
                      <option value="Mechanized">Mechanized Vessel</option>
                      <option value="Traditional">Traditional Canoe</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-4 text-xs">
                <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm text-blue-600">
                  <Upload size={16} /> Attach Registration Documents
                </h3>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <label className="block text-slate-900 font-bold mb-1">Boat Registration Copy (PDF / Image)</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="w-full text-slate-500 text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-bold" />
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <label className="block text-slate-900 font-bold mb-1">Fishing License Copy (PDF / Image)</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="w-full text-slate-500 text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-bold" />
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <label className="block text-slate-900 font-bold mb-1">Aadhaar Card Copy (PDF / Image)</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="w-full text-slate-500 text-xs file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-bold" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Admin Approval & Review */}
            {currentStep === 4 && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-900 text-sm text-blue-600 flex items-center gap-2">
                    <ShieldCheck size={18} /> 4. Government Admin Approval & Review
                  </h3>
                  <span className="px-2.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-extrabold rounded-full border border-amber-300 uppercase">
                    ⏳ Pending Admin Approval
                  </span>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1">Application Details Summary</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div><span className="text-slate-400">Applicant:</span> <strong className="text-slate-900">{formData.name || 'Arun Kumar'}</strong></div>
                    <div><span className="text-slate-400">Phone & Email:</span> <strong className="text-slate-900">{formData.phone} | {formData.email}</strong></div>
                    <div><span className="text-slate-400">Aadhaar:</span> <strong className="text-slate-900">{formData.aadhaar}</strong></div>
                    <div><span className="text-slate-400">District & State:</span> <strong className="text-slate-900">{formData.district || 'Rameswaram'}, {formData.state || 'Tamil Nadu'}</strong></div>
                    <div><span className="text-slate-400">Boat Name & Reg:</span> <strong className="text-slate-900">{formData.boatName || 'Sea Queen'} ({formData.boatRegNumber || 'TN 07 MF 4587'})</strong></div>
                    <div><span className="text-slate-400">Experience:</span> <strong className="text-slate-900">{formData.experience || '12 Years'} ({formData.primaryFishingArea || 'Palk Bay'})</strong></div>
                  </div>
                </div>

                {/* Admin Approval Notice Banner */}
                <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-xl text-amber-950 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                    <ShieldCheck size={18} className="text-amber-600 shrink-0" />
                    <span>Government Admin Verification Required</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Submitting this form routes your registration directly to the <strong>Government Fisheries Administrator Approval Queue</strong>. Once the Admin reviews and approves your maritime credentials in the Admin Portal, you can log in to access your Fisherman Portal Dashboard.
                  </p>
                </div>

                {/* Declaration Checkbox */}
                <label className="flex items-start gap-2.5 p-3 bg-blue-50/60 border border-blue-100 rounded-xl cursor-pointer text-[11px] text-slate-700">
                  <input
                    type="checkbox"
                    required
                    defaultChecked
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I declare that all provided personal, vessel, and license details are accurate and understand that portal access is subject to official Government Admin approval.
                  </span>
                </label>
              </div>
            )}

            {/* Stepper Control Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/auth/login')}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-600/30 transition flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 transition flex items-center gap-1.5"
                >
                  <UserPlus size={16} />
                  <span>{loading ? 'Submitting Application...' : 'Submit Registration'}</span>
                </button>
              )}
            </div>

            <div className="text-center pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Your information is secure and encrypted</span>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
