import { getCoverLetters } from "../../actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import CoverLetterList from "./components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="container">
      <div className="container mx-auto space-y-4 py-30">
        <h1 className="text-6xl font-bold gradient-title">My Cover Letters</h1>
        <Link href="/ai-cover-letter/new">
          <Button className="mb-10">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
     

      <CoverLetterList coverLetters={coverLetters} className="mt-20" />
    </div>
    </div>
  );
}