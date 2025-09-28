import { data } from "react-router";
import type { VideoHomework, Word } from "../Model";
import { supabase } from "../supabaseClient";

//export const HOMEWORK_DATE = "2025-08-28";
export const DUE_DATE = "2025-08-30";

export const targetWords: Word[] = [
  { theme: "vegetable", text: "cabbage", image_url: "../images/cabbage.png" },
  { theme: "vegetable", text: "carrot", image_url: "../images/carrot.png" },
  { theme: "vegetable", text: "corn", image_url: "../images/corn.png" },
  { theme: "vegetable", text: "lettuce", image_url: "../images/lettuce.png" },
  { theme: "vegetable", text: "onion", image_url: "../images/onion.png" },
  { theme: "vegetable", text: "potato", image_url: "../images/potato.png" },
  { theme: "vegetable", text: "pumpkin", image_url: "../images/pumpkin.png" },
  { theme: "vegetable", text: "radish", image_url: "../images/radish.png" },
];

const getEmbedUrl = (url: string) => {
  const match = url.match(/v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export async function fetchHomework(
  studentId: string
): Promise<VideoHomework[]> {
  const { data, error } = await supabase
    .from("student_homework")
    .select(
      `
        id,
        completed,
        teacher_comment,
        due_date,
        homework (
          id,
          title,
          video_url
        )
      `
    )
    .eq("student_id", studentId)
    .order("assigned_at", { ascending: false });

  //console.log("Homework rows:", data, "Error:", error);

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }

  // Map database rows to your existing VideoHomework interface
  return (data as any[]).map((item) => ({
    assignmentId: item.id as string,
    id: item.homework.id as string,
    title: item.homework.title as string,
    url: getEmbedUrl(item.homework.video_url as string),
    isWatched: item.completed as boolean,
    assignedDate: item.assigned_at as string,
    dueDate: item.due_date as string,
    teacherComment: item.teacher_comment ?? undefined,
  }));
}

const now = new Date().toISOString(); // simple timestamp for the first item

export const defaultHomework: VideoHomework[] = [
  {
    id: now,
    title: "Hello How are you",
    url: getEmbedUrl("https://www.youtube.com/watch?v=tVlcKp3bWH8"),
    isWatched: false,
    assignedDate: now,
    dueDate: DUE_DATE,
  },
  {
    id: `${now}1`,
    title: "What's your name",
    url: getEmbedUrl(
      "https://www.youtube.com/watch?v=Uv1JkBL5728&list=RDUv1JkBL5728&start_radio=1"
    ),
    isWatched: false,
    assignedDate: now,
    dueDate: DUE_DATE,
  },
  {
    id: `${now}2`,
    title: "How old are you?",
    url: getEmbedUrl("https://www.youtube.com/watch?v=1OON8dkC_AM"),
    isWatched: false,
    assignedDate: now,
    dueDate: DUE_DATE,
  },
  {
    id: `${now}3`,
    title: "Move! song",
    url: getEmbedUrl("https://www.youtube.com/watch?v=VsgpUHUYuJI"),
    isWatched: false,
    assignedDate: now,
    dueDate: DUE_DATE,
  },
  {
    id: `${now}4`,
    title: "Weather song",
    url: getEmbedUrl("https://www.youtube.com/watch?v=D1qV5PsDoQw"),
    isWatched: false,
    assignedDate: now,
    dueDate: DUE_DATE,
  },
  {
    id: `${now}5`,
    title: "Do you like lasagna milkshake",
    url: getEmbedUrl(
      "https://www.youtube.com/watch?v=13mftBvRmvM&list=RD13mftBvRmvM&start_radio=1"
    ),
    isWatched: false,
    assignedDate: now,
    dueDate: DUE_DATE,
  },
  {
    id: `${now}6`,
    title: "This is my happy face",
    url: getEmbedUrl(
      "https://www.youtube.com/watch?v=lQZX1IIAnLw&list=RDlQZX1IIAnLw&start_radio=1"
    ),
    isWatched: false,
    assignedDate: now,
    dueDate: DUE_DATE,
  },
];
