import React, { useState } from 'react';
import { Lock, User, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (username: string) => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToPublic,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Allow demo credentials or any valid entry
      if (
        (username === 'admin' && password === 'vachira123') ||
        (username.trim() && password.trim().length >= 4)
      ) {
        onLoginSuccess(username);
      } else {
        setErrorMsg('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Public Portal Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับหน้าหลักประชาชน</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Card exact layout matching prompt #10 */}
        <div className="bg-white py-10 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-200 text-center relative">
          {/* Logo & Header */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl shadow-xs mb-4">
            💊
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            กลุ่มงานเภสัชกรรม
          </h2>
          <p className="text-sm font-semibold text-emerald-700 mt-0.5">
            โรงพยาบาลวชิระภูเก็ต
          </p>
          <p className="text-xs text-slate-400 mt-2 pb-6 border-b border-slate-100">
            ระบบจัดการสารสนเทศและฐานข้อมูลสำหรับเจ้าหน้าที่ (Admin Management)
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 text-left space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div>
              <label
                htmlFor="admin-username"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                ชื่อผู้ใช้ (Username)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold text-slate-700 mb-1.5"
              >
                รหัสผ่าน (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                id="admin-login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-900/20 active:scale-[0.99] transition-all disabled:opacity-70"
              >
                <Lock className="w-4 h-4" />
                <span>{isLoading ? 'กำลังตรวจสอบ...' : '[ 🔐 เข้าสู่ระบบ ]'}</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
            <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
