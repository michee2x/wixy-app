import React, {useEffect} from 'react'
import { ContextAPI } from '../ContextApi'

export const SentAToken = () => {
    const {darkmode, setDarkMode} = ContextAPI()
    useEffect(() => {
            const doc = document.body
            if(darkmode){
                doc.classList.add("dark");
            }else{
                doc.classList.remove("dark")
            }
        }, [darkmode])

  // Function to open Gmail in web or mobile app
  const openGmail = () => {
    // Try opening the Gmail app (works on mobile devices if the app is installed)
    const mobileGmailLink = "googlegmail://";
    const webGmailLink = "https://mail.google.com";

    // Try to open Gmail app first (works on mobile)
    if (window.navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
      window.location.href = mobileGmailLink;
      
      // Fallback: If Gmail app isn't installed, open the web version after a short delay
      setTimeout(() => {
        window.location.href = webGmailLink;
      }, 2000);
    } else {
      // If it's not a mobile device, open the web Gmail
      window.location.href = webGmailLink;
    }
  };
  return (
    <div className='w-full pt-24 gap-5 text-gray-200 text-xl h-screen dark:bg-gray-950 flex justify-center'>

      
      <div className="h-auto w-full">
      <div className=" p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-semibold text-blue-400 mb-4">Verify Your Account!</h1>
        <p className="text-lg text-gray-400 mb-6">
          We’ve sent a confirmation email to your inbox. Please check your email and follow the instructions to verify your account.
        </p>
        <div className=" py-5">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-900 transition-colors"
            onClick={openGmail}
          >
            Go to Inbox
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}