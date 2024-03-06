import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/tickets", {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tickets: ", error);
  }
};

const Dashboard = async () => {
  const tickets = await getTickets();
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
