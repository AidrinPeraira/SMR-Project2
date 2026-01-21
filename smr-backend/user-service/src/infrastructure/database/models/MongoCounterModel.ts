import { Document, model, Schema } from "mongoose";

export interface CounterDoc extends Omit<Document, "_id"> {
  _id: string; // Now you can safely define it as a string
  seq: number;
}

/**
 * This schema is for keeping track of the number of
 * users that has registered
 * for keeping track of userId
 */
const CounterSchema = new Schema<CounterDoc>(
  {
    _id: { type: String, required: true },
    seq: { type: Number, required: true, default: 0 },
  },
  {
    _id: false,
  },
);

export const CounterModel = model<CounterDoc>("Counter", CounterSchema);
