import postgres from 'postgres';

// Connexion PostgreSQL
const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: process.env.NODE_ENV === 'production' ? 'require' : undefined,
});

// Fonction pour lister les factures
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

// Handler API GET
export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (error) {
    console.error('Erreur lors de la récupération des factures :', error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
