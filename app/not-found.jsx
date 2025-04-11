import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

import Link from "next/link";


export default function NotFoundPage() {


  return (
    <div className="flex items-center justify-center h-screen text-white">
      <Card className="p-8 text-center shadow-xl border border-gray-700">
        <h1 className="text-5xl font-bold text-red-500">404</h1>
        <p className="text-lg mt-2 text-gray-300">Oops! Page not found.</p>
        <CardContent className="mt-4">
            <Link href={"/"}>
                <Button className={"cursor-pointer"}>
                    Back to Home
                </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
