insert into locations (name, latitude, longitude) values
('Mumbai', 19.0760, 72.8777),
('Pune', 18.5204, 73.8567),
('Lonavala', 18.7481, 73.4072),
('Alibaug', 18.6414, 72.8722)
on conflict (name) do nothing;

insert into parcels (
  parcel_name, location_name, village_survey_no, visit_date, status, number_of_owners, owner_names,
  land_area_guntha, price_per_guntha, price_per_sqft, total_ask_price_cr, access_to_land, land_type, dp_zone,
  distance_station_km, distance_highway_km, water_availability, survey_plan_available, extract_712_available,
  contour_plan_available, broker_name, broker_contact, has_nearby_projects, nearby_project_name,
  nearby_project_type, nearby_project_cost_cr, nearby_project_observations, field_observations, photo_count
) values
('Virar Ridge Parcel A', 'Mumbai', 'Virar East S.No. 113/2', '2026-03-15', 'Under Review', 2, '{Mahesh Patil, Kavita Patil}', 65, 19500000, 32000, 12.8, 'Direct Road', 'Residential Plot', 'R2', 3.2, 1.4, 'Municipal', true, true, false, 'Pravin Naik', '9820012345', true, 'Virar Metro Habitat', 'Affordable Housing', 220, 'Large township with club + retail', 'Clear title pending final legal packet.', 4),
('Vasai Creekside Parcel', 'Mumbai', 'Vasai West S.No. 44/7', '2026-02-21', 'Shortlisted', 1, '{Ramesh Dsouza}', 102, 20500000, 35000, 29.5, 'Shared Access', 'Mixed Use', 'Commercial Corridor', 5.1, 2.8, 'Borewell', false, true, true, 'Sajid Merchant', '9819988776', false, null, null, null, null, 'High FSI potential near arterial road.', 6),
('Wagholi North Block', 'Pune', 'Wagholi S.No. 77/1', '2026-03-29', 'Proposed to Investor', 3, '{Ajinkya Kale, Sonali Kale, Meena Kale}', 48, 7600000, 9800, 6.1, 'Direct Road', 'NA', 'Residential Expansion', 8.4, 2.2, 'Municipal', true, true, false, 'Ruturaj Bendre', '9867001122', true, 'Wagholi Greens', 'Residential Township', 140, 'Strong absorption from IT corridor spillover', 'Excellent frontage and clean approach road.', 5),
('Talegaon Plateau Plot', 'Pune', 'Talegaon Dabhade S.No. 201/3', '2026-01-18', 'Rejected', 2, '{Nitin Jadhav, Shruti Jadhav}', 26, 5400000, 11500, 3.2, 'Via Private Land', 'Agricultural', 'Green Buffer', 10.7, 4.6, 'Seasonal', false, false, false, 'Amol Khot', '9890123098', false, null, null, null, null, 'Access challenge due to private strip ownership.', 2),
('Tungarli View Estate', 'Lonavala', 'Tungarli S.No. 58/9', '2026-03-05', 'Shortlisted', 2, '{Sunil Mhatre, Vandana Mhatre}', 74, 4300000, 6800, 5.8, 'Direct Road', 'Residential Plot', 'Hill Residential', 4.9, 1.8, 'Borewell', true, true, true, 'Nilesh Shinde', '9922331144', true, 'Lonavala Crest Villas', 'Luxury Villas', 310, 'Premium villa launch with lake-facing amenities', 'Terrain requires moderate retaining wall work.', 7),
('Della Valley Parcel', 'Lonavala', 'Kune S.No. 14/2', '2026-02-03', 'Under Review', 1, '{Hemant Shah}', 36, 2900000, 5400, 2.9, 'Shared Access', 'Forest Land', 'Eco Sensitive', 7.6, 3.4, 'Seasonal', false, false, false, 'Kiran Sutar', '9765432200', false, null, null, null, null, 'Beautiful contour, entitlement diligence needed.', 3),
('Nagaon Beachside Plot', 'Alibaug', 'Nagaon S.No. 92/5', '2026-03-12', 'Proposed to Investor', 4, '{Nadkarni Family, Prabhu Family, Khot Family, Sane Family}', 88, 7100000, 8600, 7.9, 'Direct Road', 'Mixed Use', 'Tourism Overlay', 12.8, 5.2, 'Borewell', true, false, false, 'Farhan Khan', '9892990011', true, 'Nagaon Coast Residences', 'Hospitality', 180, 'Resort-led demand expected over next 24 months', 'Prime coastal plot with strong boutique resort potential.', 8),
('Revdanda Fort Corridor Land', 'Alibaug', 'Revdanda S.No. 121/4', '2026-01-30', 'Under Review', 2, '{Rohit Patankar, Leena Patankar}', 32, 4800000, 6200, 2.3, 'No Road Access', 'Agricultural', 'Rural Residential', 16.2, 6.9, 'None', false, true, false, 'Mangesh Bhave', '9833556677', false, null, null, null, null, 'Potential value unlock if connector road is sanctioned.', 1)
on conflict do nothing;
