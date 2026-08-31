export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const studentId = String(body?.studentId || '').trim();
    const token = String(body?.token || '').trim();

    if (!studentId || !token) {
      return Response.json({ message: 'Missing studentId or token' }, { status: 400 });
    }

    const baseUrl = process.env.IRAS_API_BASE_URL;
    const remoteUrl = `${baseUrl}/${encodeURIComponent(studentId)}/pre-requisite-courses`;
    
    const upstream = await fetch(remoteUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Origin: process.env.IRAS_ORIGIN_URL || '',
        Referer: (process.env.IRAS_ORIGIN_URL || '') + '/'
      }
    });

    const text = await upstream.text();
    const contentType = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
    return new Response(text, {
      status: upstream.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return Response.json(
      { message: 'Prerequisite proxy failed', error: String(error?.message || error) },
      { status: 500 }
    );
  }
}
