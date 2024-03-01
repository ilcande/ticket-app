import prisma from "./config/db";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Get all tickets
    const tickets = await prisma.ticket.findMany();
    return res.json(tickets);
  }
  if (req.method === "POST") {
    // Create a new ticket
    const { title, description, category, priority, progress, status, active } =
      req.body;
    try {
      const newTicket = await prisma.ticket.create({
        data: {
          title,
          description,
          category,
          priority,
          progress,
          status,
          active,
        },
      });
      return NextResponse.json(newTicket, { status: 201 });
    } catch (error) {
      return NextResponse.json({ Error: error.message }, { status: 500 });
    }
  }
  return NextResponse.next();
}
