export async function GET() {
  return Response.json({ data: 'hello' });
}

export async function POST() {
  return Response.json({ hello: 'POST' });
}
