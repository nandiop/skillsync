import { getCoverLetters } from "../../actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import CoverLetterList from "./components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
    <div className="max-w-4xl w-full space-y-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold gradient-title">
        My Cover Letters
      </h1>
  
      <div className="flex justify-center">
        <Link href="/ai-cover-letter/new">
          <Button className="mb-10">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>
  
      <CoverLetterList coverLetters={coverLetters} className="mt-20" />
    </div>
  </div>
  );
}