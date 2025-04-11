import React from 'react'
import OnboardingForm from './components/OnboardingForm';
import { industries } from '../../data/industries'
import { getOnboardingStatus } from '../../actions/user';
import { redirect } from 'next/navigation';

export default async function OnboardPage() {
    //Check if user is already onboarded
    const {isOnboarded} = await getOnboardingStatus();
    
    if(isOnboarded) {
      redirect("/dashboard");
    }

    return (
      <main>
        <OnboardingForm industries={industries}/>
      </main>
    );
}
