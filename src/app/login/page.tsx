'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-stone-200 px-4 py-8">
      <div className="w-max-[100%] flex h-160 max-h-[100vh-64px] w-97 flex-col items-center rounded-4xl bg-[#f2f1ee] px-8 pt-0 pb-9">
        <header className="flex w-full flex-col items-center">
          <div className="my-10 flex h-15 w-15 items-center justify-center rounded-2xl bg-blue-800">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"></path>
            </svg>
          </div>
          <h1 className="text-[22px] font-bold">Book-Book-Book</h1>
          <p className="text-[13px] text-zinc-400">나만의 독서 기록장</p>
          <span className="my-35 text-[15px] text-gray-600">당신의 독서 기록을 한눈에</span>
        </header>
        <main className="mb-2 w-full">
          <button
            type="button"
            className="flex h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-zinc-300 bg-white text-[15px] font-medium shadow-sm transition-all duration-200 ease-in hover:shadow-lg"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <span data-dc-tpl="14" data-om-id="2e59b66b:19" className="flex">
              <svg width="19" height="19" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.4 0 6.4 1.2 8.8 3.5l6.6-6.6C35.3 2.5 30 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.7 6C12.1 13 17.5 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7C43.7 37.5 46.5 31.5 46.5 24.5z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.3 19.2c-.5 1.5-.8 3.1-.8 4.8s.3 3.3.8 4.8l-7.7 6C1 31 0 27.6 0 24s1-7 2.6-10l7.7 6.2z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6 0 11.3-2 15-5.4l-7.3-5.7c-2 1.4-4.6 2.2-7.7 2.2-6.5 0-11.9-3.5-13.8-8.7l-7.7 6C6.5 42.6 14.6 48 24 48z"
                ></path>
              </svg>
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
