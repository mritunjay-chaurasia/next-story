"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import ChangePasswordModal from "./ChangePasswordModal";
import { uploadMedia, updateProfile } from "@/services/user-service";
import toast from "react-hot-toast";

export default function ProfileModal({ isOpen, onClose }: any) {

  const { user, fetchUserProfile } = useUser();
  const [name, setName] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setName(user.name || "Ashley Brown");
    }
  }, [isOpen, user]);

  const uploadImage = async (file: File) => {
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const response: any = await uploadMedia(formData);

      if (response && response?.data && response?.data?.url) {
        setPreviewUrl(response?.data.url);
      } else {
        console.error(
          "Failed to upload image:",
          response?.message || "Unknown error"
        );
      }
      toast.success("Image uploaded successfully!");
      setUploadingImage(false);
    } catch (err) {
      setUploadingImage(false);
      console.error("Error uploading image:", err);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const payload: any = {
        name,
      };

      if (previewUrl) {
        payload.profileImage = previewUrl;
      }

      const response: any = await updateProfile(payload);
      console.log(response, "---updated user---");

      await fetchUserProfile();
      toast.success("Profile updated successfully");

      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <>
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
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-xl transition-all relative'>
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl'
                  >
                    ✕
                  </button>

                  {/* Profile Image */}
                  <div className='flex justify-center mb-6'>
                    <div className='relative'>
                      <div className='w-24 h-24 rounded-full bg-purple-200 flex items-center justify-center overflow-hidden'>
                        {previewUrl || user?.profileImage ? (
                          <Image
                            src={previewUrl || user?.profileImage}
                            alt='Profile'
                            width={96}
                            height={96}
                            className='object-cover w-full h-full'
                          />
                        ) : (
                          <div className='w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='32'
                              height='32'
                              fill='none'
                              stroke='#6B46C1'
                              strokeWidth='2'
                            >
                              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                              <circle cx='12' cy='7' r='4' />
                            </svg>
                          </div>
                        )}
                      </div>
                      <label className='absolute bottom-0 right-0 bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer'>
                        +
                        <input
                          type='file'
                          accept='image/*'
                          className='hidden'
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            console.log(file, '---file---');
                            if (file) {
                              setSelectedImage(file);
                              setPreviewUrl(URL.createObjectURL(file));
                              await uploadImage(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className='mb-4'>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='w-full px-4 py-3 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-purple-500'
                      placeholder='Ashley Brown'
                    />
                  </div>

                  {/* Password Input (Always Visible Now) */}
                  <div className='relative mb-6'>
                    <input
                      type='password'
                      className='w-full px-4 py-3 pr-36 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-purple-500'
                      placeholder='••••••••'
                    />
                    <button
                      type='button'
                      onClick={() => {
                        onClose();
                        setIsChangePasswordOpen(true);
                      }}
                      className='absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-purple-700 underline font-medium cursor-pointer'
                    >
                      Change Password?
                    </button>
                  </div>

                  {/* Save Button */}
                  <button
                    disabled={uploadingImage}
                    onClick={handleSaveChanges}
                    className='flex align-center justify-center w-full bg-[#C4CD24] text-black py-4 rounded-full font-medium text-center cursor-pointer'
                  >
                    {
                      uploadingImage ? <>
                        <Image
                          src="/assets/images/regenrate-simple.svg"
                          width={24}
                          height={24}
                          alt="icon"
                          className={`animate-spin blackimg w-[24px] h-[24px] object-cover me-2`}
                        />
                        <span>Uploading Image...</span>
                      </> : <>
                        <span>Save Changes</span>
                      </>
                    }
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </>
  );
}
