const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tickets = [
  { id: 1, title: "Login issue", description: "User cannot login", status: "Open", comments: [] },
  { id: 2, title: "Page not loading", description: "Dashboard not opening", status: "In Progress", comments: [] }
];

// Get all tickets
app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

// Create a new ticket
app.post("/api/tickets", (req, res) => {
  const { title, description } = req.body;
  const newTicket = {
    id: tickets.length + 1,
    title,
    description,
    status: "Open",
    comments: []
  };
  tickets.push(newTicket);
  res.json(newTicket);
});

// Add comment to a ticket
app.post("/api/tickets/:id/comments", (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const ticket = tickets.find(t => t.id == id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  ticket.comments.push(comment);
  res.json(ticket);
});

// Update ticket status
app.put("/api/tickets/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = tickets.find(t => t.id == id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  ticket.status = status;
  res.json(ticket);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
