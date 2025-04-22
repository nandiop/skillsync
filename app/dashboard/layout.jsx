import React, { Suspense } from 'react'
import { ClipLoader } from 'react-spinners'

export default function DashboardLayout({ children }) {
  return (
    <div className='w-full flex flex-col items-center align-middle'>
      <div className='flex items-center justify-between mb-5'>
        {/* Optional heading logic here, or just remove this block */}
      </div>
      <Suspense
        fallback={
          <div className="flex flex-wrap align-middle items-center justify-center min-h-[600px] space-y-4">
            <div className="animate-spin">
              <ClipLoader
                color="#888888"
                size={15}
                speedMultiplier={1}
                margin={4}
                aria-label="Loading Spinner"
              />
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  )
}
