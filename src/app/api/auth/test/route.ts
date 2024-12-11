export async function POST(req: Request, res: Response) {
  const form = await req.formData();
  const email = form.get('email')?.toString();
  const password = form.get('password')?.toString();

  return new Response(
    JSON.stringify({
      status: 'berhasil',
      message: 'Data berhasil diterima',
      data: { email, password },
    }),
    { status: 200 },
  );
}
