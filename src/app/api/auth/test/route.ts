export async function POST(req: Request) {
  // Parsing form data from the request
  const form = await req.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();

  // Returning a response with status 200
  return new Response(
    JSON.stringify({
      status: 'berhasil',
      message: 'Data berhasil diterima',
      data: { email, password },
    }),
    { status: 200 },
  );
}
