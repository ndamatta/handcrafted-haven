import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require', 
  idle_timeout: 5,
  connect_timeout: 10,
});

export default sql;