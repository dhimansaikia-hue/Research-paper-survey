import { supabase } from './supabaseClient';

const MUMBAI_FALLBACK = { lat: 19.076, lon: 72.8777 };

export async function fetchLocations() {
  const { data, error } = await supabase.from('locations').select('*').order('name');
  if (error) throw error;
  return data || [];
}

export async function fetchParcels() {
  const { data, error } = await supabase
    .from('parcels')
    .select('*')
    .order('visit_date', { ascending: false, nullsFirst: false });
  if (error) throw error;
  return data || [];
}

export async function ensureLocationExists(locationName) {
  const name = locationName.trim();
  const { data: existing, error: selectError } = await supabase
    .from('locations')
    .select('*')
    .ilike('name', name)
    .maybeSingle();

  if (selectError) throw selectError;
  if (existing) return { location: existing, warning: '' };

  const { data: inserted, error: insertError } = await supabase
    .from('locations')
    .insert({ name, latitude: MUMBAI_FALLBACK.lat, longitude: MUMBAI_FALLBACK.lon })
    .select('*')
    .single();
  if (insertError) throw insertError;

  let warning = '';
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${name} India`)}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const geocode = await res.json();
    const top = geocode?.[0];

    if (top) {
      const { data: updated, error: updateError } = await supabase
        .from('locations')
        .update({ latitude: Number(top.lat), longitude: Number(top.lon) })
        .eq('id', inserted.id)
        .select('*')
        .single();
      if (updateError) throw updateError;
      return { location: updated, warning };
    }

    warning = 'Location coordinates not found — defaulting to Mumbai region. You can update coordinates later in Settings.';
  } catch (err) {
    warning = 'Location coordinates not found — defaulting to Mumbai region. You can update coordinates later in Settings.';
  }

  return { location: inserted, warning };
}

export async function uploadFiles(parcelName, filesByType) {
  const uploads = {};
  for (const [kind, files] of Object.entries(filesByType)) {
    if (!files?.length) continue;
    uploads[kind] = [];
    for (const file of files) {
      const filePath = `${kind}/${Date.now()}-${parcelName.replace(/\s+/g, '-')}-${file.name}`;
      const { error } = await supabase.storage.from('parcel-assets').upload(filePath, file);
      if (error) throw error;
      uploads[kind].push(filePath);
    }
  }
  return uploads;
}

export async function createParcel(payload) {
  const { data, error } = await supabase.from('parcels').insert(payload).select('*').single();
  if (error) throw error;
  return data;
}

export async function deleteParcel(id) {
  const { error } = await supabase.from('parcels').delete().eq('id', id);
  if (error) throw error;
}

export async function updateRole(userId, role) {
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
  if (error) throw error;
}

export async function updateLocationCoordinates(id, latitude, longitude) {
  const { error } = await supabase.from('locations').update({ latitude, longitude }).eq('id', id);
  if (error) throw error;
}
