import { getOnboardingStatus } from "../../actions/user";
import { redirect } from "next/navigation";
import  Layout  from "./layout";
import { getIndustryInsights } from "../../actions/dashboard";
import Dashboardview from "./components/dashboard.view";

export default async function DashboardPage() {
  try {
    const { isOnboarded } = await getOnboardingStatus();
    const insights = await getIndustryInsights();

    if (!isOnboarded) {
      redirect("/onboard");
    }

    return (
      <div className=" container py-30 ">  
                  <h1 className='text-6xl font-bold gradient-title'>
                Industry Insights
            </h1>
        <p className="text-xl font-normal mb-6 pt-5 text-gray-300">Dashboard View</p>
        <div className="container mx-auto">
          {/* Add your dashboard content here */}
          <Dashboardview insights = {insights}/>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in dashboard:", error);
    redirect("/onboard");
  }
}
