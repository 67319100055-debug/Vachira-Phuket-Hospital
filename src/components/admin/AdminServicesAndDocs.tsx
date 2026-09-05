import React, { useState } from 'react';
import { DocumentDownload, AdminUser, AdminSection } from '../../types';
import { FileText, Users, BarChart3, Settings, Plus, Trash2, Check, Download, ShieldCheck, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../../data/initialData';

interface AdminServicesAndDocsProps {
  section: AdminSection;
  documents: DocumentDownload[];
  users: AdminUser[];
  onUpdateDocuments: (docs: DocumentDownload[]) => void;
  onUpdateUsers: (users: AdminUser[]) => void;
}

export const AdminServicesAndDocs: React.FC<AdminServicesAndDocsProps> = ({
  section,
  documents,
  users,
  onUpdateDocuments,
  onUpdateUsers,
}) => {
  const [docList, setDocList] = useState<DocumentDownload[]>(documents);
  const [userList, setUserList] = useState<AdminUser[]>(users);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('บริการผู้ป่วย');
  const [newDocSize, setNewDocSize] = useState('1.2 MB');

  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'pharmacist' | 'staff'>('pharmacist');
  const [newUserUsername, setNewUserUsername] = useState('');

  const [settingsSaved, setSettingsSaved] = useState(false);

  // Add Doc
  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) return;
    const newDoc: DocumentDownload = {
      id: `doc_${Date.now()}`,
      title: newDocTitle,
      category: newDocCategory,
      fileSize: newDocSize,
      fileType: 'PDF',
      downloads: 0,
      date: 'วันนี้',
      url: '#',
    };
    const updated = [newDoc, ...docList];
    setDocList(updated);
    onUpdateDocuments(updated);
    setNewDocTitle('');
  };

  const handleDeleteDoc = (id: string) => {
    const updated = docList.filter((d) => d.id !== id);
    setDocList(updated);
    onUpdateDocuments(updated);
  };

  // Add User
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserUsername) return;
    const newUser: AdminUser = {
      id: `u_${Date.now()}`,
      name: newUserName,
      username: newUserUsername,
      role: newUserRole,
      department: 'กลุ่มงานเภสัชกรรม รพ.วชิระภูเก็ต',
      email: `${newUserUsername}@vachiraphuket.go.th`,
      lastLogin: 'เพิ่งสร้าง',
    };
    const updated = [newUser, ...userList];
    setUserList(updated);
    onUpdateUsers(updated);
    setNewUserName('');
    setNewUserUsername('');
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('ต้องการลบผู้ใช้นี้ออกจากระบบ?')) {
      const updated = userList.filter((u) => u.id !== id);
      setUserList(updated);
      onUpdateUsers(updated);
    }
  };

  if (section === 'documents') {
    return (
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>จัดการเอกสารดาวน์โหลด & แบบฟอร์ม</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              เพิ่มและจัดการแบบฟอร์มขอรับบริการ คู่มือยา และเอกสาร PDF
            </p>
          </div>
        </div>

        {/* Add Form */}
        <form onSubmit={handleAddDoc} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs space-y-3">
          <div className="font-bold text-slate-800">เพิ่มเอกสารดาวน์โหลดใหม่:</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <input
                type="text"
                placeholder="ชื่อเอกสารหรือแบบฟอร์ม *"
                required
                value={newDocTitle}
                onChange={(e) => setNewDocTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-slate-300"
              />
            </div>
            <div>
              <select
                value={newDocCategory}
                onChange={(e) => setNewDocCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-slate-300 bg-white"
              >
                <option value="บริการผู้ป่วย">บริการผู้ป่วย</option>
                <option value="คู่มือการใช้ยา">คู่มือการใช้ยา</option>
                <option value="โครงการลดความแออัด">โครงการลดความแออัด</option>
                <option value="สำหรับบุคลากรทางการแพทย์">สำหรับบุคลากรทางการแพทย์</option>
              </select>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ขนาดไฟล์ เช่น 1.5 MB"
                value={newDocSize}
                onChange={(e) => setNewDocSize(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-slate-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shrink-0 shadow-xs"
              >
                + เพิ่มไฟล์
              </button>
            </div>
          </div>
        </form>

        {/* List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ชื่อเอกสาร</th>
                <th className="py-3 px-4">หมวดหมู่</th>
                <th className="py-3 px-4">ขนาด</th>
                <th className="py-3 px-4">ดาวน์โหลด</th>
                <th className="py-3 px-4 text-center">ลบ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {docList.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{d.title}</td>
                  <td className="py-3 px-4">{d.category}</td>
                  <td className="py-3 px-4 text-slate-500">{d.fileSize}</td>
                  <td className="py-3 px-4 text-slate-500">{d.downloads} ครั้ง</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDeleteDoc(d.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (section === 'users') {
    return (
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>จัดการผู้ใช้งาน & เภสัชกร (Users Management)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              กำหนดสิทธิ์การเข้าใช้งานระบบสำหรับเภสัชกรและเจ้าหน้าที่
            </p>
          </div>
        </div>

        {/* Add User */}
        <form onSubmit={handleAddUser} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs space-y-3">
          <div className="font-bold text-slate-800">เพิ่มผู้ใช้ใหม่ในระบบ:</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <input
                type="text"
                placeholder="ชื่อ-สกุล (เช่น ภก.สมชาย)"
                required
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-slate-300"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username (เช่น somchai.s)"
                required
                value={newUserUsername}
                onChange={(e) => setNewUserUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-slate-300"
              />
            </div>
            <div>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as any)}
                className="w-full px-3 py-2 border rounded-xl border-slate-300 bg-white"
              >
                <option value="pharmacist">เภสัชกร (Pharmacist)</option>
                <option value="admin">ผู้ดูแลระบบ (Admin)</option>
                <option value="staff">เจ้าหน้าที่สนับสนุน (Staff)</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-xs"
              >
                + เพิ่มผู้ใช้
              </button>
            </div>
          </div>
        </form>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ชื่อ - นามสกุล</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">ตำแหน่ง / สิทธิ์</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">เข้าสู่ระบบล่าสุด</th>
                <th className="py-3 px-4 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userList.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                  <td className="py-3 px-4 text-slate-600">{u.username}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'admin' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {u.role === 'admin' ? 'ผู้ดูแลระบบ' : u.role === 'pharmacist' ? 'เภสัชกร' : 'เจ้าหน้าที่'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{u.email}</td>
                  <td className="py-3 px-4 text-slate-400">{u.lastLogin}</td>
                  <td className="py-3 px-4 text-center">
                    {u.username !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (section === 'stats') {
    return (
      <div className="space-y-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <span>สถิติการให้บริการ & การสืบค้นข้อมูลยา</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            รายงานตัวเลขการจ่ายยา คิวเฉลี่ย และยาที่มีการสืบค้นมากที่สุด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-800 mb-3">ระยะเวลารอรับยาเฉลี่ย (นาที)</h4>
            <div className="text-3xl font-black text-emerald-700 mb-1">14.5 นาที</div>
            <p className="text-slate-500">เป้าหมายมาตรฐานโรงพยาบาล &lt; 25 นาที (ผ่านเกณฑ์ 98%)</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-800 mb-3">จำนวนใบสั่งยาวันนี้</h4>
            <div className="text-3xl font-black text-teal-700 mb-1">842 ใบ</div>
            <p className="text-slate-500">ส่งยาทางไปรษณีย์ 45 รายการ</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h4 className="font-bold text-slate-800 mb-3">ความพึงพอใจของผู้รับบริการ</h4>
            <div className="text-3xl font-black text-blue-700 mb-1">94.8%</div>
            <p className="text-slate-500">ผลสำรวจดิจิทัล ณ จุดรับยา</p>
          </div>
        </div>
      </div>
    );
  }

  // Settings
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-600" />
            <span>ตั้งค่าระบบ & ข้อมูลหน่วยงาน</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ข้อมูลโรงพยาบาล ที่ตั้ง หมายเลขโทรศัพท์ และเวลาเปิดทำการ
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">ชื่อหน่วยงาน</label>
          <input
            type="text"
            defaultValue={CONTACT_INFO.name}
            className="w-full px-3 py-2 border rounded-xl border-slate-300"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">ที่ตั้ง</label>
          <input
            type="text"
            defaultValue={CONTACT_INFO.address}
            className="w-full px-3 py-2 border rounded-xl border-slate-300"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">โทรศัพท์สายตรงห้องยา</label>
            <input
              type="text"
              defaultValue="076-361234 ต่อ 1234"
              className="w-full px-3 py-2 border rounded-xl border-slate-300"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email หน่วยงาน</label>
            <input
              type="email"
              defaultValue={CONTACT_INFO.email}
              className="w-full px-3 py-2 border rounded-xl border-slate-300"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              setSettingsSaved(true);
              setTimeout(() => setSettingsSaved(false), 2000);
            }}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            {settingsSaved ? <Check className="w-4 h-4" /> : null}
            <span>{settingsSaved ? 'บันทึกเรียบร้อย!' : 'บันทึกการตั้งค่า'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
