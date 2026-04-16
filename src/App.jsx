import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import BottomNav from './components/BottomNav';
import FloatingAddButton from './components/FloatingAddButton';
import LogoHeader from './components/LogoHeader';
import LoginScreen from './components/LoginScreen';
import { ROLES } from './constants';
import AddParcelModal from './screens/AddParcelModal';
import MapTab from './screens/MapTab';
import ParcelDetailModal from './screens/ParcelDetailModal';
import ParcelsTab from './screens/ParcelsTab';
import ProfileTab from './screens/ProfileTab';
import SearchTab from './screens/SearchTab';
import SettingsModal from './screens/SettingsModal';
import {
  createParcel,
  deleteParcel,
  ensureLocationExists,
  fetchLocations,
  fetchParcels,
  updateLocationCoordinates,
  updateRole,
  uploadFiles,
} from './services/parcelService';
import { supabase } from './services/supabaseClient';
import { exportParcelsToExcel } from './utils/exportExcel';

export default function App() {
  const [tab, setTab] = useState('Map');
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profileRole, setProfileRole] = useState(ROLES.FIELD_TEAM);
  const [locations, setLocations] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [detailParcel, setDetailParcel] = useState(null);
  const [authError, setAuthError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saveWarning, setSaveWarning] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadAll() {
    const [locs, pars] = await Promise.all([fetchLocations(), fetchParcels()]);
    setLocations(locs);
    setParcels(pars);
    if (user?.id) {
      const { data } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
      if (data?.role) setProfileRole(data.role);
    }
  }

  useEffect(() => {
    if (!session) return;
    loadAll().catch((e) => setAuthError(e.message));
  }, [session, user?.id]);

  async function handleLogin(email, password) {
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  }

  async function handleSave(form, files, reset) {
    setSaveError('');
    setSaveWarning('');
    try {
      if (!form.parcel_name || !form.location_name) throw new Error('Parcel name and location are required.');
      const { location, warning } = await ensureLocationExists(form.location_name);
      if (warning) setSaveWarning(warning);

      const uploads = await uploadFiles(form.parcel_name, {
        photos: files.photos,
        survey: files.surveyFiles,
        extract712: files.extractFiles,
        contour: files.contourFiles,
      });

      await createParcel({
        ...form,
        location_name: location.name,
        photo_paths: uploads.photos || [],
        photo_count: uploads.photos?.length || 0,
        survey_plan_available: form.survey_plan_available || Boolean(uploads.survey?.length),
        extract_712_available: form.extract_712_available || Boolean(uploads.extract712?.length),
        contour_plan_available: form.contour_plan_available || Boolean(uploads.contour?.length),
      });

      await loadAll();
      reset();
      setAddOpen(false);
      setTab('Map');
      setToast('Parcel saved successfully.');
      setTimeout(() => setToast(''), 2200);
    } catch (err) {
      setSaveError(err.message || 'Failed to save parcel.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this parcel?\nThis action cannot be undone.')) return;
    try {
      await deleteParcel(id);
      setDetailParcel(null);
      await loadAll();
      setTab('Map');
    } catch (e) {
      alert(e.message);
    }
  }

  if (!session) return <LoginScreen onLogin={handleLogin} error={authError} />;

  return (
    <div className="app">
      <LogoHeader onOpenSettings={() => setSettingsOpen(true)} />
      {toast && <div className="toast">{toast}</div>}

      {tab === 'Map' && (
        <MapTab
          locations={locations}
          parcels={parcels}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          onCardClick={setDetailParcel}
        />
      )}
      {tab === 'Search' && <SearchTab parcels={parcels} locations={locations} onCardClick={setDetailParcel} />}
      {tab === 'Parcels' && <ParcelsTab parcels={parcels} onCardClick={setDetailParcel} />}
      {tab === 'Profile' && <ProfileTab user={user} role={profileRole} onLogout={() => supabase.auth.signOut()} />}

      {profileRole === ROLES.FIELD_TEAM && <FloatingAddButton onClick={() => setAddOpen(true)} />}
      <BottomNav active={tab} onChange={setTab} />

      <AddParcelModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        locations={locations}
        onSave={handleSave}
        error={saveError}
        warning={saveWarning}
      />

      <ParcelDetailModal
        parcel={detailParcel}
        onClose={() => setDetailParcel(null)}
        canDelete={profileRole === ROLES.FIELD_TEAM}
        onDelete={handleDelete}
      />

      <SettingsModal
        open={settingsOpen}
        role={profileRole}
        onRoleChange={async (role) => {
          setProfileRole(role);
          await updateRole(user.id, role);
        }}
        locations={locations}
        onUpdateCoordinates={async (id, lat, lon) => {
          await updateLocationCoordinates(id, lat, lon);
          await loadAll();
        }}
        parcels={parcels}
        onExport={exportParcelsToExcel}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
