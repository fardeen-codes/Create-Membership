const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { textQuery } = await req.json();
    if (!textQuery || textQuery.trim().length < 3) {
      return new Response(JSON.stringify({ places: [] }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': 'AIzaSyCjWqqKJ5CF3PuTDq6uaG8TDZvdl-Z9EuM',
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location',
        'Origin': 'https://dev.reelo.io',
        'Referer': 'https://dev.reelo.io/',
      },
      body: JSON.stringify({ textQuery: textQuery.trim() }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
