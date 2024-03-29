require("dotenv").config();
import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  let url =
    process.env.NODE_ENV === "development"
      ? `${process.env.DEVELOPMENT_URL}/api/tickets`
      : `${process.env.PRODUCTION_URL}/api/tickets`;

  if (process.env.NODE_ENV === "production") {
    if (!url) {
      console.error("PRODUCTION_URL is not defined");
      throw new Error("PRODUCTION_URL is not defined");
    }
  }

  try {
    const response = await fetch(url, {
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

  const uniqueCategories = [
    ...new Set(tickets?.map((ticket) => ticket.category)),
  ];

  return (
    <div>
      <h1 className="mt-4 ml-4">Dashboard</h1>
      <div>
        {uniqueCategories?.map((category, index) => (
          <div key={index}>
            <h2 className="mt-4 ml-4">{category}</h2>
            <div className="lg:grid grid-cols-3 gap-4">
              {tickets
                .filter((ticket) => ticket.category === category)
                .map((ticket, index) => (
                  <TicketCard key={index} ticket={ticket} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
