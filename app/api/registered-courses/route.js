export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const studentId = String(body?.studentId || '').trim();
    const token = String(body?.token || '').trim();

    if (!studentId || !token) {
      return Response.json({ message: 'Missing studentId or token' }, { status: 400 });
    }

    const remoteUrl = `https://iras.iub.edu.bd:8079//api/v1/registration/student-registered-courses/${encodeURIComponent(studentId)}/all`;
    const upstream = await fetch(remoteUrl, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Origin: 'https://irasv1.iub.edu.bd',
        Referer: 'https://irasv1.iub.edu.bd/'
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
      { message: 'Registered-courses proxy failed', error: String(error?.message || error) },
      { status: 500 }
    );
  }
}