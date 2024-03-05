"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = () => {
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTicketData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      console.log("Error creating ticket");
      return;
    }

    console.log("Ticket created");

    router.refresh();
    router.push("/");
  };

  const startingTicketData = {
    title: "",
    description: "",
    category: "bug",
    priority: 1,
    progress: 0,
    status: "non started",
    active: true,
  };

  const [ticketData, setTicketData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        action=""
        className="flex flex-col w-1/2 gap-3"
        onSubmit={handleSubmit}
        method="post"
      >
        <h3>Create a new ticket</h3>
        <label>Title </label>
        <input
          type="text"
          id="title"
          name="title"
          required={true}
          value={ticketData.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          id="description"
          name="description"
          required={true}
          value={ticketData.description}
          onChange={handleChange}
          rows={5}
        />

        <label>Category</label>
        <select
          name="category"
          id="category"
          value={ticketData.category}
          onChange={handleChange}
        >
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
          <option value="enhancement">Enhancement</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            type="radio"
            name="priority"
            value={1}
            checked={ticketData.priority == 1}
            onChange={handleChange}
          />
          <label>Low</label>

          <input
            id="priority-2"
            type="radio"
            name="priority"
            value={2}
            checked={ticketData.priority == 2}
            onChange={handleChange}
          />
          <label>Medium</label>

          <input
            id="priority-3"
            type="radio"
            name="priority"
            value={3}
            checked={ticketData.priority == 3}
            onChange={handleChange}
          />

          <label>High</label>

          <input
            id="priority-4"
            type="radio"
            name="priority"
            value={4}
            checked={ticketData.priority == 4}
            onChange={handleChange}
          />
          <label>Critical</label>

          <input
            id="priority-5"
            type="radio"
            name="priority"
            value={5}
            checked={ticketData.priority == 5}
            onChange={handleChange}
          />
          <label>Blocker</label>
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          min="0"
          max="100"
          value={ticketData.progress}
          onChange={handleChange}
        />

        <label>Status</label>
        <select
          name="status"
          id="status"
          value={ticketData.status}
          onChange={handleChange}
        >
          <option value="non started">Non started</option>
          <option value="in progress">In progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          className="btn bg-blue-500 text-white p-2 rounded"
        >
          Create ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
