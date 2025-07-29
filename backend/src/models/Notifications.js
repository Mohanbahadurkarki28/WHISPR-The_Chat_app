import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["info", "warning", "alert", "system"],
      default: "info",
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ recipient: 1, viewed: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
