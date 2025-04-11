import { SignUp } from '@clerk/nextjs'

const page = () => {
  return (
    <SignUp
      afterSignUpUrl="/onboard"
      redirectUrl="/onboard"
    />
  )
}

export default page
