
import React from 'react';
import ProfileHeader from './ProfileHeader';
import StatsGrid from './StatsGrid';
import BadgesSection from './BadgesSection';
import ReferralCard from './ReferralCard';
import MenuSection from './MenuSection';
import LogoutButton from './LogoutButton';

interface ProfileContentProps {
  onNotificationsClick: () => void;
  onSettingsClick: () => void;
  onFaqClick: () => void;
  onInviteClick: () => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  onNotificationsClick,
  onSettingsClick,
  onFaqClick,
  onInviteClick
}) => {
  return (
    <>
      <ProfileHeader />
      
      <div className="bg-white rounded-t-3xl -mt-5 p-6 relative z-10">
        <StatsGrid />
        <BadgesSection />
        <ReferralCard onInviteClick={onInviteClick} />
        <MenuSection 
          onNotificationsClick={onNotificationsClick}
          onSettingsClick={onSettingsClick}
          onFaqClick={onFaqClick}
        />
        <LogoutButton />
      </div>
    </>
  );
};

export default ProfileContent;
