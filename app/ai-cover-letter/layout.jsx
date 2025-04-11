export default function CoverletterLayout({ children }) {

    //redirect user after cover letter
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="grid-background" />
      <div className="container mx-auto px-4 pt-40 pb-20">
        {children}
      </div>
    </div>
  );
} 