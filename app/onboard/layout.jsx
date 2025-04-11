export default function OnboardLayout({ children }) {

    //redirect user after onboarding
  return (
    <div className="min-h-screen  relative overflow-hidden mt-24">
        
      <div className="grid-background" />
      {children}
    </div>
  );
} 