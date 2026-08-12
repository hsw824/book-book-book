'use client';

import { SolidBook } from '@/components/icons/Book';
import { GoogleLogo } from '@/components/icons/GoogleLogo';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-stone-200 px-4 py-8">
      <div className="w-max-[100%] flex h-160 max-h-[100vh-64px] w-97 flex-col items-center rounded-4xl bg-[#f2f1ee] px-8 pt-0 pb-9">
        <header className="flex h-[90%] w-full flex-col items-center justify-center">
          <div className="my-10 flex h-15 w-15 items-center justify-center rounded-2xl bg-blue-800">
            <SolidBook width="26" height="26" stroke="#ffffff" strokeWidth="1.8" />
          </div>
          <h1 className="text-[22px] font-bold">Book-Book-Book</h1>
        </header>
        <main className="mb-2 w-full">
          <button
            type="button"
            className="flex h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-zinc-300 bg-white text-[15px] font-medium shadow-sm transition-all duration-200 ease-in hover:shadow-lg"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <span data-dc-tpl="14" data-om-id="2e59b66b:19" className="flex">
              <GoogleLogo width="19" height="19" />
            </span>
            Google로 계속하기
          </button>
        </main>
        <footer>
          <p className="text-[13px] text-zinc-400">가입 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.</p>
        </footer>
      </div>
    </div>
  );
}
