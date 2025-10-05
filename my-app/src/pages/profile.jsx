import ProfileCard from '@/components/ProfileCard';

export default function Main() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10%'}}>
      <ProfileCard
        name="Javi A. Torres"
        
        title="Software Engineer"
        handle="javicodes"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/path/to/avatar.jpg"
        showUserInfo={true}
        enableTilt={false}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
      />
    </div>
  );
}
