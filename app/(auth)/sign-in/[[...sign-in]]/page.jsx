import { SignIn } from '@clerk/nextjs'

function page() {
  return (
    <SignIn
      afterSignInUrl="/onboard"
      redirectUrl="/onboard"
    />
  )
}

export default page
