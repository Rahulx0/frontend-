import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [headline, setHeadline] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [experienceCompany, setExperienceCompany] = React.useState('');
  const [experienceJoining, setExperienceJoining] = React.useState('');
  const [experienceLast, setExperienceLast] = React.useState('');
  const [experienceDescription, setExperienceDescription] = React.useState('');
  const [skills, setSkills] = React.useState('');
  const [educationSchool, setEducationSchool] = React.useState('');
  const [educationSession, setEducationSession] = React.useState('');
  const [lastLogin, setLastLogin] = React.useState('');

  React.useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser?._id) return;
      try {
        const response = await fetch(`https://backend-hcxk.vercel.app/api/profile/${currentUser._id}`);
        const data = await response.json();
        if (data?.profile) {
          const profile = data.profile;
          setHeadline(profile.headline || '');
          setSummary(profile.summary || '');
          const firstExp = profile.experiences?.[0] || {};
          setExperienceCompany(firstExp.companyName || '');
          setExperienceJoining(firstExp.joiningDate || '');
          setExperienceLast(firstExp.lastDate || '');
          setExperienceDescription(firstExp.description || '');
          setSkills((profile.skills || []).join(', '));
          setEducationSchool(profile.education?.schoolName || '');
          setEducationSession(profile.education?.session || '');
          setLastLogin(profile.lastLogin || '');
        }
      } catch (err) {
        console.log('Error fetching profile:', err.message);
      }
    };
    fetchProfile();
  }, [currentUser?._id]);

  const handleSave = async () => {
    if (!currentUser?._id) {
      alert('Please sign in to save your profile.');
      return;
    }
    try {
      const payload = {
        userId: currentUser._id,
        headline,
        summary,
        experiences: [
          {
            companyName: experienceCompany,
            joiningDate: experienceJoining,
            lastDate: experienceLast,
            description: experienceDescription,
          },
        ],
        skills,
        education: {
          schoolName: educationSchool,
          session: educationSession,
        },
        lastLogin,
      };

      const response = await fetch('https://backend-hcxk.vercel.app/api/profile/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data?.profile) {
        alert('Profile saved to MongoDB.');
        setHeadline('');
        setSummary('');
        setExperienceCompany('');
        setExperienceJoining('');
        setExperienceLast('');
        setExperienceDescription('');
        setSkills('');
        setEducationSchool('');
        setEducationSession('');
        setLastLogin('');
      } else {
        alert(data?.error || 'Failed to save profile.');
      }
    } catch (err) {
      console.log('Error saving profile:', err.message);
    }
  };
  return (
    <div className='min-h-screen bg-white'>
      <div className='mx-auto max-w-3xl px-4 py-8'>
        <div className='border-b pb-6'>
          <div className='flex items-center gap-4'>
            <img
              className='h-14 w-14 rounded-full border border-gray-200'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWp1VH0chk5el7ykIOMp7p-7LdMJ1u3mBQOA&s' width='72' height='72' viewBox='0 0 72 72'><rect width='72' height='72' rx='36' fill='%23244f7a'/><circle cx='36' cy='28' r='14' fill='%23b9d4f1'/><path d='M12 66c4-14 20-18 24-18s20 4 24 18' fill='%23b9d4f1'/></svg>"
              alt='user profile'
            />
            <div className='flex flex-col'>
              <h1 className='text-xl font-semibold text-gray-900'>
                {currentUser?.username || 'Guest'}
              </h1>
              <input
                name='headline'
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder='Headline (e.g., Full Stack Developer)'
                className='mt-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200'
              />
              <p className='text-xs text-gray-400'>ID: {currentUser?._id || '—'}</p>
            </div>
          </div>
        </div>

        <div className='mt-6 space-y-6'>
          <section>
            <h2 className='text-sm font-semibold text-gray-900 mb-2'>Summary</h2>
            <textarea
              name='summary'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder='Write a short summary about yourself.'
              className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200'
              rows={4}
            />
          </section>

          <section>
            <h2 className='text-sm font-semibold text-gray-900 mb-2'>Experience</h2>
            <div className='grid gap-3 text-sm text-gray-700 md:grid-cols-2'>
              <input
                name='experienceCompany'
                value={experienceCompany}
                onChange={(e) => setExperienceCompany(e.target.value)}
                placeholder='Company Name'
                className='rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200'
              />
              <input
                name='experienceJoining'
                value={experienceJoining}
                onChange={(e) => setExperienceJoining(e.target.value)}
                placeholder='Joining Date'
                className='rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200'
              />
              <input
                name='experienceLast'
                value={experienceLast}
                onChange={(e) => setExperienceLast(e.target.value)}
                placeholder='Last Date'
                className='rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200'
              />
              <input
                name='experienceDescription'
                value={experienceDescription}
                onChange={(e) => setExperienceDescription(e.target.value)}
                placeholder='Role description'
                className='rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200 md:col-span-2'
              />
            </div>
          </section>

          <section>
            <h2 className='text-sm font-semibold text-gray-900 mb-2'>Skills</h2>
            <input
              name='skills'
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder='Add your skills (e.g., React, Node.js, MongoDB)'
              className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200'
            />
          </section>

          <section>
            <h2 className='text-sm font-semibold text-gray-900 mb-2'>Education</h2>
            <div className='grid gap-3 text-sm text-gray-700 md:grid-cols-2'>
              <input
                name='educationSchool'
                value={educationSchool}
                onChange={(e) => setEducationSchool(e.target.value)}
                placeholder='School Name'
                className='rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200'
              />
              <input
                name='educationSession'
                value={educationSession}
                onChange={(e) => setEducationSession(e.target.value)}
                placeholder='Session (e.g., 2018–2022)'
                className='rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200'
              />
            </div>
          </section>

          <section>
            <h2 className='text-sm font-semibold text-gray-900 mb-2'>Last Login</h2>
            <input
              name='lastLogin'
              value={lastLogin}
              onChange={(e) => setLastLogin(e.target.value)}
              placeholder='Date and time of last login'
              className='w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200'
            />
          </section>

          <div>
            <button
              className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'
              onClick={handleSave}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile