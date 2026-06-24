"use client";

import { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";

import {
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export default function BookRoomModal({ room }) {
  const { data: session } = authClient.useSession();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");

  const endTimeOptions = startTime
    ? HOURS.filter((hour) => hour > startTime)
    : [];

  const totalCost =
    startTime && endTime
      ? (parseInt(endTime) - parseInt(startTime)) *
        room.hourlyRate
      : 0;

  const handleBooking = async (closeModal) => {
    if (!date || !startTime || !endTime) {
      toast.error("Please fill all required fields");
      return;
    }

    const bookingData = {
      roomId: room._id,
      roomName: room.roomName,

      userId: session?.user?.id,
      userName: session?.user?.name,
      userEmail: session?.user?.email,

      date,
      startTime,
      endTime,
      totalCost,
      specialNote,
    };

    try {
      const res = await fetch(
        "http://localhost:5000/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Room booked successfully!");

        setDate("");
        setStartTime("");
        setEndTime("");
        setSpecialNote("");

        closeModal();
      } else {
        toast.error(
          data.message || "Booking failed"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
    }
  };

  return (
    <Modal>
      <Button
        color="primary"
        className="rounded-xl"
      >
        Book Now
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header>
              <Modal.Icon className="bg-primary/10 text-primary">
                <FaBookOpen />
              </Modal.Icon>

              <Modal.Heading>
                Book Study Room
              </Modal.Heading>

              <p className="text-sm text-gray-500 mt-1">
                {room.roomName}
              </p>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="px-6 pb-4">
              <Surface
                variant="default"
                className="p-4 rounded-2xl"
              >
                <div className="space-y-4">
                  {/* Date */}
                  <TextField variant="secondary">
                    <Label>
                      <span className="flex items-center gap-2">
                        <FaCalendarAlt />
                        Booking Date
                      </span>
                    </Label>

                    <Input
                      type="date"
                      value={date}
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) =>
                        setDate(e.target.value)
                      }
                    />
                  </TextField>

                  {/* Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Start Time
                      </label>

                      <select
                        value={startTime}
                        onChange={(e) =>
                          setStartTime(
                            e.target.value
                          )
                        }
                        className="w-full border rounded-xl px-3 py-2.5 text-sm bg-white"
                      >
                        <option value="">
                          Select
                        </option>

                        {HOURS.map((hour) => (
                          <option
                            key={hour}
                            value={hour}
                          >
                            {hour}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        End Time
                      </label>

                      <select
                        value={endTime}
                        onChange={(e) =>
                          setEndTime(
                            e.target.value
                          )
                        }
                        className="w-full border rounded-xl px-3 py-2.5 text-sm bg-white"
                      >
                        <option value="">
                          Select
                        </option>

                        {endTimeOptions.map(
                          (hour) => (
                            <option
                              key={hour}
                              value={hour}
                            >
                              {hour}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Special Note
                    </label>

                    <textarea
                      rows="3"
                      value={specialNote}
                      onChange={(e) =>
                        setSpecialNote(
                          e.target.value
                        )
                      }
                      placeholder="Optional note..."
                      className="w-full border rounded-xl p-3 text-sm resize-none"
                    />
                  </div>

                  {/* Cost Card */}
                  <div className="flex items-center justify-between rounded-xl border bg-primary/5 px-4 py-3">
                    <div>
                      <p className="text-xs text-gray-500">
                        Total Cost
                      </p>

                      <h3 className="text-xl font-bold">
                        ${totalCost}
                      </h3>
                    </div>

                    <FaMoneyBillWave className="text-2xl text-primary" />
                  </div>
                </div>
              </Surface>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer>
              <Button
                slot="close"
                variant="secondary"
              >
                Cancel
              </Button>

              <Button
                color="primary"
                onPress={(e) => {
                  const closeModal =
                    () =>
                      e.currentTarget
                        ?.closest(
                          "[role='dialog']"
                        )
                        ?.querySelector(
                          "[data-slot='close-trigger']"
                        )
                        ?.click();

                  handleBooking(
                    closeModal
                  );
                }}
              >
                Confirm Booking
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}