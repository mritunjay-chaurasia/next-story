"use client";

import { changePassword } from "@/services/user-service";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";

export default function ChangePasswordModal({ isOpen, onClose }: any) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);

      const payload = {
        newPassword,
        confirmPassword,
      };

      const res = await changePassword(payload);

      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        {/* BACKDROP */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-90'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-90'
            >
              <Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-3xl bg-white p-8 text-center align-middle shadow-xl transition-all relative'>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl'
                >
                  ✕
                </button>

                {/* Title */}
                <Dialog.Title className='text-xl font-semibold mb-6'>
                  Reset Password
                </Dialog.Title>

                {/* New Password */}
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full px-4 py-3 mb-4 rounded-full bg-gray-100 text-sm focus:outline-none'
                  placeholder='New Password'
                />

                {/* Confirm Password */}
                <input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full px-4 py-3 mb-2 rounded-full bg-gray-100 text-sm focus:outline-none'
                  placeholder='Re-Type Password'
                />

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className='w-full bg-[#C4CD24] text-black py-3 rounded-full font-semibold transition cursor-pointer'
                >
                  {loading ? "Resetting..." : "Reset"}
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
