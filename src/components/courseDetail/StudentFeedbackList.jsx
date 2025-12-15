import { Card, Rate } from "antd";

const feedbacks = [
  {
    name: "Alex Thompson",
    date: "2024-12-08",
    rating: 5,
    comment:
      "Excellent course! The instructor explains complex concepts clearly."
  },
  {
    name: "Maria Garcia",
    date: "2024-12-07",
    rating: 5,
    comment:
      "Best course I've taken. Practical examples and great support."
  }
];

export default function StudentFeedbackList() {
  return (
    <Card title="Recent Student Feedback">
      {feedbacks.map((f, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <strong>{f.name}</strong>
          <div style={{ fontSize: 12, color: "#888" }}>{f.date}</div>
          <Rate disabled value={f.rating} />
          <p>{f.comment}</p>
        </div>
      ))}
    </Card>
  );
}
