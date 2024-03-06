import { prisma } from "../config/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  // Create a new ticket
  const body = await req.json();

  const data = {
    title: body.title,
    description: body.description,
    category: body.category,
    priority: body.priority,
    progress: body.progress,
    status: body.status,
    active: true,
  };

  try {
    const newTicket = await prisma.ticket.create({
      data,
    });
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}

export async function GET(req, res) {
  // Get all tickets
  try {
    const tickets = await prisma.ticket.findMany();
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}
